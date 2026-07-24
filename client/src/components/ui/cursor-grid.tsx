import { useEffect, useRef, type HTMLAttributes } from "react";

type Falloff = "linear" | "smooth" | "sharp";

interface CursorGridProps extends HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: Falloff;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  ambient?: boolean;
  ambientIdleDelay?: number;
  ambientInterval?: [number, number];
}

interface Pulse {
  x: number;
  y: number;
  startedAt: number;
}

const FALLOFF_CURVES: Record<Falloff, (value: number) => number> = {
  linear: value => value,
  smooth: value => value * value * (3 - 2 * value),
  sharp: value => value * value * value,
};

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map(character => character + character)
          .join("")
      : normalized;
  const number = Number.parseInt(value, 16);

  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

export function CursorGrid({
  cellSize = 70,
  color = "#7a2948",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  ambient = false,
  ambientIdleDelay = 500,
  ambientInterval = [500, 4500],
  className,
  ...rest
}: CursorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const propsRef = useRef({
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    ambient,
    ambientIdleDelay,
    ambientInterval,
  });

  useEffect(() => {
    propsRef.current = {
      cellSize,
      color,
      radius,
      falloff,
      holdTime,
      fadeDuration,
      lineWidth,
      maxOpacity,
      fillOpacity,
      gridOpacity,
      cellRadius,
      clickPulse,
      pulseSpeed,
      ambient,
      ambientIdleDelay,
      ambientInterval,
    };
    wakeRef.current?.();
  }, [
    ambient,
    ambientIdleDelay,
    ambientInterval,
    cellRadius,
    cellSize,
    clickPulse,
    color,
    fadeDuration,
    falloff,
    fillOpacity,
    gridOpacity,
    holdTime,
    lineWidth,
    maxOpacity,
    pulseSpeed,
    radius,
  ]);

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d")!;
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pulses: Pulse[] = [];
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let running = false;
    let lastFrame = 0;
    let ambientTimer = 0;
    let ambientIdleTimer = 0;
    let isVisible = true;
    let ambientJourney: {
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      controlX: number;
      controlY: number;
      startedAt: number;
      duration: number;
    } | null = null;

    function cellCenter(index: number): [number, number] {
      const current = propsRef.current;
      return [
        offsetX + (index % columns) * current.cellSize + current.cellSize / 2,
        offsetY +
          Math.floor(index / columns) * current.cellSize +
          current.cellSize / 2,
      ];
    }

    function drawStaticGrid() {
      const current = propsRef.current;
      if (current.gridOpacity <= 0) return;

      const [red, green, blue] = hexToRgb(current.color);
      context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${current.gridOpacity})`;
      context.lineWidth = 1;
      context.beginPath();

      for (let column = 0; column <= columns; column += 1) {
        const x = Math.round(offsetX + column * current.cellSize) + 0.5;
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }

      for (let row = 0; row <= rows; row += 1) {
        const y = Math.round(offsetY + row * current.cellSize) + 0.5;
        context.moveTo(0, y);
        context.lineTo(width, y);
      }

      context.stroke();
    }

    function rebuild() {
      const current = propsRef.current;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / current.cellSize) + 1;
      rows = Math.ceil(height / current.cellSize) + 1;
      offsetX = (width - columns * current.cellSize) / 2;
      offsetY = (height - rows * current.cellSize) / 2;
      alphas = new Float32Array(columns * rows);
      touched = new Float64Array(columns * rows);
      context.clearRect(0, 0, width, height);
      drawStaticGrid();
    }

    function energize(x: number, y: number, boost = 1, radiusScale = 1) {
      const current = propsRef.current;
      const interactionRadius = Math.max(current.radius * radiusScale, 1);
      const ease = FALLOFF_CURVES[current.falloff];
      const now = performance.now();
      const minimumColumn = Math.max(
        0,
        Math.floor((x - interactionRadius - offsetX) / current.cellSize)
      );
      const maximumColumn = Math.min(
        columns - 1,
        Math.floor((x + interactionRadius - offsetX) / current.cellSize)
      );
      const minimumRow = Math.max(
        0,
        Math.floor((y - interactionRadius - offsetY) / current.cellSize)
      );
      const maximumRow = Math.min(
        rows - 1,
        Math.floor((y + interactionRadius - offsetY) / current.cellSize)
      );

      for (let row = minimumRow; row <= maximumRow; row += 1) {
        for (let column = minimumColumn; column <= maximumColumn; column += 1) {
          const index = row * columns + column;
          const [centerX, centerY] = cellCenter(index);
          const distance = Math.hypot(centerX - x, centerY - y);
          if (distance > interactionRadius) continue;

          const level =
            ease(1 - distance / interactionRadius) * current.maxOpacity * boost;
          if (level > alphas[index]) alphas[index] = level;
          if (level > 0) touched[index] = now;
        }
      }
    }

    function draw(now: number) {
      const current = propsRef.current;
      const elapsed = Math.min(now - lastFrame, 50);
      const [red, green, blue] = hexToRgb(current.color);
      lastFrame = now;
      context.clearRect(0, 0, width, height);
      drawStaticGrid();

      if (ambientJourney) {
        const progress = Math.min(
          1,
          (now - ambientJourney.startedAt) / ambientJourney.duration
        );
        const eased = progress * progress * (3 - 2 * progress);
        const inverse = 1 - eased;
        const fadeInProgress = Math.min(1, progress / 0.22);
        const fadeIn =
          fadeInProgress * fadeInProgress * (3 - 2 * fadeInProgress);
        energize(
          inverse * inverse * ambientJourney.fromX +
            2 * inverse * eased * ambientJourney.controlX +
            eased * eased * ambientJourney.toX,
          inverse * inverse * ambientJourney.fromY +
            2 * inverse * eased * ambientJourney.controlY +
            eased * eased * ambientJourney.toY,
          1.15 * fadeIn,
          1.4
        );
        if (progress >= 1) ambientJourney = null;
      }

      for (
        let pulseIndex = pulses.length - 1;
        pulseIndex >= 0;
        pulseIndex -= 1
      ) {
        const pulse = pulses[pulseIndex];
        const ringRadius =
          ((now - pulse.startedAt) / 1000) * current.pulseSpeed;
        if (ringRadius > Math.hypot(width, height)) {
          pulses.splice(pulseIndex, 1);
          continue;
        }

        const band = current.cellSize;
        for (let index = 0; index < alphas.length; index += 1) {
          const [centerX, centerY] = cellCenter(index);
          const distance = Math.hypot(centerX - pulse.x, centerY - pulse.y);
          if (
            Math.abs(distance - ringRadius) < band / 2 &&
            current.maxOpacity > alphas[index]
          ) {
            alphas[index] = current.maxOpacity;
            touched[index] = now;
          }
        }
      }

      let anyVisible = pulses.length > 0;
      const fadeStep = elapsed / Math.max(current.fadeDuration, 16);
      const halfCell = current.cellSize / 2;

      for (let index = 0; index < alphas.length; index += 1) {
        let alpha = alphas[index];
        if (alpha <= 0) continue;

        if (now - touched[index] > current.holdTime) {
          alpha = Math.max(0, alpha - fadeStep);
          alphas[index] = alpha;
          if (alpha <= 0) continue;
        }

        anyVisible = true;
        const [centerX, centerY] = cellCenter(index);
        const gradient = context.createRadialGradient(
          centerX,
          centerY,
          halfCell * 0.1,
          centerX,
          centerY,
          current.cellSize
        );
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

        const x = centerX - halfCell + 0.5;
        const y = centerY - halfCell + 0.5;
        const size = current.cellSize - 1;
        context.beginPath();
        if (current.cellRadius > 0) {
          context.roundRect(x, y, size, size, current.cellRadius);
        } else {
          context.rect(x, y, size, size);
        }

        if (current.fillOpacity > 0) {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${
            alpha * current.fillOpacity
          })`;
          context.fill();
        }
        context.strokeStyle = gradient;
        context.lineWidth = current.lineWidth;
        context.stroke();
      }

      if (anyVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        running = false;
      }
    }

    function wake() {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    }

    function toLocal(event: PointerEvent): [number, number] | null {
      const rect = container.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return null;
      }

      return [event.clientX - rect.left, event.clientY - rect.top];
    }

    function scheduleAmbientPulse() {
      window.clearTimeout(ambientTimer);
      const current = propsRef.current;
      if (!current.ambient || reduceMotion) return;

      const [rawMinimum, rawMaximum] = current.ambientInterval;
      const minimum = Math.max(250, Math.min(rawMinimum, rawMaximum));
      const maximum = Math.max(minimum, Math.max(rawMinimum, rawMaximum));
      const randomGap = minimum + Math.random() * (maximum - minimum);
      const journeyRemaining = ambientJourney
        ? Math.max(
            0,
            ambientJourney.startedAt +
              ambientJourney.duration -
              performance.now()
          )
        : 0;

      ambientTimer = window.setTimeout(() => {
        triggerAmbient();
        scheduleAmbientPulse();
      }, journeyRemaining + randomGap);
    }

    function triggerAmbient() {
      const current = propsRef.current;
      if (!document.hidden && isVisible) {
        const randomPoint = (): [number, number] => {
          const mode = Math.random();
          if (mode < 0.12) {
            return [
              Math.random() < 0.5 ? 0 : width,
              Math.random() < 0.5 ? 0 : height,
            ];
          }
          if (mode < 0.38) {
            return Math.random() < 0.5
              ? [Math.random() < 0.5 ? 0 : width, Math.random() * height]
              : [Math.random() * width, Math.random() < 0.5 ? 0 : height];
          }
          return [Math.random() * width, Math.random() * height];
        };

        const [fromX, fromY] = randomPoint();
        let [toX, toY] = randomPoint();
        const minimumDistance = Math.min(
          Math.hypot(width, height) * 0.45,
          current.radius * 2.5
        );

        for (
          let attempt = 0;
          attempt < 8 && Math.hypot(toX - fromX, toY - fromY) < minimumDistance;
          attempt += 1
        ) {
          [toX, toY] = randomPoint();
        }

        ambientJourney = {
          fromX,
          fromY,
          toX,
          toY,
          controlX: Math.random() * width,
          controlY: Math.random() * height,
          startedAt: performance.now(),
          duration:
            Math.random() < 0.35
              ? 3200 + Math.random() * 1800
              : 1900 + Math.random() * 1100,
        };
        wake();
      }
    }

    function scheduleAmbientStart() {
      window.clearTimeout(ambientIdleTimer);
      window.clearTimeout(ambientTimer);
      const current = propsRef.current;
      if (!current.ambient || reduceMotion) return;

      ambientIdleTimer = window.setTimeout(() => {
        triggerAmbient();
        scheduleAmbientPulse();
      }, current.ambientIdleDelay);
    }

    function onPointerMove(event: PointerEvent) {
      if (reduceMotion) return;
      ambientJourney = null;
      scheduleAmbientStart();
      const point = toLocal(event);
      if (!point) return;
      energize(...point);
      wake();
    }

    function onPointerDown(event: PointerEvent) {
      if (reduceMotion || !propsRef.current.clickPulse) return;
      const point = toLocal(event);
      if (!point) return;
      pulses.push({
        x: point[0],
        y: point[1],
        startedAt: performance.now(),
      });
      wake();
    }

    const resizeObserver = new ResizeObserver(() => {
      rebuild();
      if (!reduceMotion) wake();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    rebuild();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    wakeRef.current = wake;
    scheduleAmbientStart();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(ambientTimer);
      window.clearTimeout(ambientIdleTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className ?? ""}`}
      {...rest}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
