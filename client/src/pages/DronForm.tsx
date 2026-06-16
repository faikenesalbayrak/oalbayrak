import { DRON_QUESTION_COUNT, emptyDronSubmissionInput, type DronSubmissionInput } from "@shared/dron";
import { Check, ChevronLeft, ChevronRight, Home, Send } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import "./dron-form.css";

const steps = [
  { id: 1, label: "Şirket" },
  { id: 2, label: "Hedef Ülke" },
  { id: 3, label: "İlişkiler" },
  { id: 4, label: "Pazar" },
];

const requiredByStep: Record<number, Array<keyof DronSubmissionInput>> = {
  1: ["q1"],
  2: ["q16"],
  3: [],
  4: [],
};

export default function DronForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<DronSubmissionInput>(() => emptyDronSubmissionInput());
  const [touchedSubmit, setTouchedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const progress = useMemo(() => ((currentStep - 1) / (steps.length - 1)) * 100, [currentStep]);

  function updateValue(name: keyof DronSubmissionInput, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function isCurrentStepValid() {
    return requiredByStep[currentStep].every((key) => values[key].trim().length > 0);
  }

  function goNext() {
    setTouchedSubmit(true);
    setStatus(null);

    if (!isCurrentStepValid()) {
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1);
      setTouchedSubmit(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    void submitForm();
  }

  async function submitForm() {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/dron/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Başvuru kaydedilemedi.");
      }

      setStatus({ type: "success", message: result.message || "Başvurunuz başarıyla kaydedilmiştir." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Sunucuyla bağlantı kurulamadı. Lütfen tekrar deneyiniz.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status?.type === "success") {
    return (
      <DronShell homeHref="/" homeLabel="Ana site">
        <section className="dron-card dron-success" aria-live="polite">
          <div className="dron-success-icon">
            <Check size={44} />
          </div>
          <h1>Başvurunuz Kaydedildi</h1>
          <p>{status.message}</p>
          <p className="dron-muted">
            Değerlendirme sürecinin ardından yetkililerimiz sizinle irtibata geçecektir.
          </p>
          <button
            className="dron-btn dron-btn-primary"
            type="button"
            onClick={() => {
              setValues(emptyDronSubmissionInput());
              setCurrentStep(1);
              setTouchedSubmit(false);
              setStatus(null);
            }}
          >
            Yeni Başvuru Doldur
          </button>
        </section>
      </DronShell>
    );
  }

  return (
    <DronShell homeHref="/" homeLabel="Ana site">
      <section className="dron-card dron-form-card" aria-labelledby="dron-form-title">
        <Progress currentStep={currentStep} progress={progress} />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goNext();
          }}
        >
          {currentStep === 1 ? (
            <StepOne values={values} updateValue={updateValue} touchedSubmit={touchedSubmit} />
          ) : null}
          {currentStep === 2 ? (
            <StepTwo values={values} updateValue={updateValue} touchedSubmit={touchedSubmit} />
          ) : null}
          {currentStep === 3 ? <StepThree values={values} updateValue={updateValue} /> : null}
          {currentStep === 4 ? <StepFour values={values} updateValue={updateValue} /> : null}

          {status?.type === "error" ? <div className="dron-alert">{status.message}</div> : null}

          <div className="dron-actions">
            <button
              className="dron-btn dron-btn-secondary"
              type="button"
              disabled={currentStep === 1 || isSubmitting}
              onClick={() => {
                setCurrentStep((step) => Math.max(1, step - 1));
                setTouchedSubmit(false);
                setStatus(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ChevronLeft size={18} />
              Geri
            </button>
            <button className="dron-btn dron-btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Gönderiliyor..."
              ) : currentStep === steps.length ? (
                <>
                  <Send size={18} />
                  Gönder
                </>
              ) : (
                <>
                  İleri
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </DronShell>
  );
}

function DronShell({
  children,
  homeHref,
  homeLabel,
}: {
  children: ReactNode;
  homeHref: string;
  homeLabel: string;
}) {
  return (
    <div className="dron-page">
      <header className="dron-header">
        <div className="dron-logo" aria-label="AERO-NW">
          <span className="dron-logo-icon">A</span>
          <span>AERO-NW</span>
        </div>
        <a className="dron-header-link" href={homeHref}>
          <Home size={16} />
          {homeLabel}
        </a>
      </header>
      <main className="dron-main">{children}</main>
      <footer className="dron-footer">&copy; 2026 AERO-NW Aerospace & Defense. Tüm hakları saklıdır.</footer>
    </div>
  );
}

function Progress({ currentStep, progress }: { currentStep: number; progress: number }) {
  return (
    <div className="dron-progress" aria-label={`Form adımı ${currentStep}/${steps.length}`}>
      <div className="dron-progress-line" />
      <div className="dron-progress-fill" style={{ width: `${progress}%` }} />
      {steps.map((step) => (
        <div
          className={[
            "dron-progress-step",
            step.id === currentStep ? "active" : "",
            step.id < currentStep ? "completed" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          key={step.id}
        >
          {step.id < currentStep ? <Check size={16} /> : step.id}
          <span>{step.label}</span>
        </div>
      ))}
    </div>
  );
}

function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="dron-step-heading">
      <h1 id="dron-form-title">{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function StepOne({
  values,
  updateValue,
  touchedSubmit,
}: {
  values: DronSubmissionInput;
  updateValue: (name: keyof DronSubmissionInput, value: string) => void;
  touchedSubmit: boolean;
}) {
  return (
    <div className="dron-step">
      <StepHeading
        title="Kişisel ve Şirket Bilgileri"
        description="Lütfen kendiniz ve temsil ettiğiniz şirket hakkındaki temel bilgileri doldurunuz."
      />
      <div className="dron-grid">
        <TextField
          label="1. Ad / Soyad"
          name="q1"
          placeholder="Adınızı ve soyadınızı giriniz"
          required
          showError={touchedSubmit && !values.q1.trim()}
          value={values.q1}
          onChange={updateValue}
        />
        <TextField
          label="2. En Son Bitirdiğiniz Okul Adı"
          name="q2"
          placeholder="Mezun olduğunuz okul/üniversite"
          value={values.q2}
          onChange={updateValue}
        />
      </div>
      <div className="dron-grid">
        <TextField label="3. Mezuniyet Tarihi" name="q3" placeholder="Örn: 2018" value={values.q3} onChange={updateValue} />
        <TextField
          label="4. Şirketinizin Tam Adı"
          name="q4"
          placeholder="Şirket unvanını giriniz"
          value={values.q4}
          onChange={updateValue}
        />
      </div>
      <div className="dron-grid">
        <TextField
          label="5. Kayıtlı Olduğu Ticaret Odası"
          name="q5"
          placeholder="Örn: İTO"
          value={values.q5}
          onChange={updateValue}
        />
        <TextField label="7. Ticaret Sicil Numarası" name="q7" placeholder="Sicil no" value={values.q7} onChange={updateValue} />
      </div>
      <div className="dron-grid">
        <TextField
          label="8. Şirketinizin Kayıtlı Sermayesi"
          name="q8"
          placeholder="Sermaye miktarı"
          value={values.q8}
          onChange={updateValue}
        />
        <TextField
          label="9. Şirketinizdeki Yetkili Kişi(ler)"
          name="q9"
          placeholder="Yetkili adları"
          value={values.q9}
          onChange={updateValue}
        />
      </div>
      <TextAreaField
        label="6. Şirketinizin İştigal Konusu ve NACE Numarası"
        name="q6"
        placeholder="Faaliyet alanları ve NACE kodunu belirtiniz"
        value={values.q6}
        onChange={updateValue}
      />
    </div>
  );
}

function StepTwo({
  values,
  updateValue,
  touchedSubmit,
}: {
  values: DronSubmissionInput;
  updateValue: (name: keyof DronSubmissionInput, value: string) => void;
  touchedSubmit: boolean;
}) {
  return (
    <div className="dron-step">
      <StepHeading
        title="Hedef Ülke ve Yapılanma"
        description="Dron satışı yapmayı planladığınız ülke ve o ülkedeki mevcut durumunuz."
      />
      <div className="dron-grid">
        <TextField
          label="16. Dron satmayı düşündüğünüz ülke adı"
          name="q16"
          placeholder="Hedef ülke"
          required
          showError={touchedSubmit && !values.q16.trim()}
          value={values.q16}
          onChange={updateValue}
        />
        <SelectField
          label="15. Bu ülkenin dilini biliyor musunuz?"
          name="q15"
          value={values.q15}
          options={["Evet", "Hayır", "Orta Seviye"]}
          onChange={updateValue}
        />
      </div>
      <div className="dron-grid">
        <SelectField
          label="12. Bu ülkede şirketiniz var mı?"
          name="q12"
          value={values.q12}
          options={["Evet", "Hayır"]}
          onChange={updateValue}
        />
        <TextField
          label="17. Bu ülkede kaç yıldır yaşıyorsunuz?"
          name="q17"
          placeholder="Örn: 5 yıl (veya yaşamıyorum)"
          value={values.q17}
          onChange={updateValue}
        />
      </div>
      <TextField
        label="13. Bu ülkedeki Şirketinizin Tam Adı"
        name="q13"
        placeholder="Varsa yurt dışı şirketinizin adı"
        value={values.q13}
        onChange={updateValue}
      />
      <TextField
        label="14. Bu ülkede Şirketinizin Kayıtlı Olduğu Ticaret Odası"
        name="q14"
        placeholder="Kayıtlı olduğu oda"
        value={values.q14}
        onChange={updateValue}
      />
      <SelectField
        label="18. Bu ülke ile olan ilişkileriniz hangi seviyede?"
        name="q18"
        value={values.q18}
        options={["İleri", "Orta", "Zayıf"]}
        onChange={updateValue}
      />
    </div>
  );
}

function StepThree({
  values,
  updateValue,
}: {
  values: DronSubmissionInput;
  updateValue: (name: keyof DronSubmissionInput, value: string) => void;
}) {
  return (
    <div className="dron-step">
      <StepHeading
        title="Savunma Sanayi & İlişki Düzeyi"
        description="Daha önceki sektörel deneyimleriniz ve hedef ülkedeki karar vericilerle olan ilişkileriniz."
      />
      <TextAreaField
        label="10. Daha önce savunma sanayi ile ilişkili Türkiye’den başka bir ülkeye bir ürün satışı gerçekleştirdiniz mi?"
        name="q10"
        placeholder="Gerçekleştirdiyseniz detay yazınız (Ürün, Ülke vb.)"
        value={values.q10}
        onChange={updateValue}
      />
      <TextAreaField
        label="11. Türkiye’de veya başka bir ülkede ilişkide olduğunuz veya temsilciğini yaptığınız başka dron üreticileri var mı?"
        name="q11"
        placeholder="Varsa marka veya firma isimleri belirtiniz"
        value={values.q11}
        onChange={updateValue}
      />
      <TextAreaField
        label="19. Bu ülkede kimi tanıyorsunuz ve yakınlık dereceniz? (Örn: Başkan, Başbakan, Savunma Bakanı, Genel Kurmay Bşk, Kara Kuvvetleri Komutanı vs. - İlişki düzeyi: Çok iyi, iyi, orta)"
        name="q19"
        placeholder="Lütfen tanışıklıklarınızı ve yakınlık durumunu detaylandırın"
        value={values.q19}
        onChange={updateValue}
      />
    </div>
  );
}

function StepFour({
  values,
  updateValue,
}: {
  values: DronSubmissionInput;
  updateValue: (name: keyof DronSubmissionInput, value: string) => void;
}) {
  return (
    <div className="dron-step">
      <StepHeading
        title="Pazar Bilgisi ve İş Birliği"
        description="Hedef pazardaki potansiyel, satış bütçeleri ve AERO-NW ile kurmak istediğiniz iş modeli."
      />
      <div className="dron-grid">
        <SelectField label="20. Daha önce dron satışı yaptınız mı?" name="q20" value={values.q20} options={["Evet", "Hayır"]} onChange={updateValue} />
        <TextField label="21. Evet ise hangi ülke veya ülkelere?" name="q21" placeholder="Ülke listesi" value={values.q21} onChange={updateValue} />
      </div>
      <div className="dron-grid">
        <SelectField
          label="22. Ülkedeki dron pazarı hakkında somut bilginiz var mı?"
          name="q22"
          value={values.q22}
          options={["Evet", "Hayır"]}
          onChange={updateValue}
        />
        <SelectField
          label="24. Ülkede dron üretim imkanları var mıdır?"
          name="q24"
          value={values.q24}
          options={["Evet", "Hayır"]}
          onChange={updateValue}
        />
      </div>
      <TextField
        label="23. Sahipseniz pazar bilgisini nasıl elde ettiniz?"
        name="q23"
        placeholder="Örn: Sektörel raporlar, yerel kaynaklar"
        value={values.q23}
        onChange={updateValue}
      />
      <div className="dron-grid">
        <SelectField
          label="26. Sadece dron satmakla mı ilgileniyorsunuz?"
          name="q26"
          value={values.q26}
          options={["Evet, sadece satış", "Hayır, bakım/montaj/üretim de dahil"]}
          onChange={updateValue}
        />
        <TextField
          label="27. Tahmini aylık/yıllık alım miktarı nedir?"
          name="q27"
          placeholder="Örn: 50 adet/yıl"
          value={values.q27}
          onChange={updateValue}
        />
      </div>
      <TextField label="28. Ülkenin dron satın alma bütçesi hakkında bilginiz var mı?" name="q28" placeholder="Tahmini bütçe bilgisi" value={values.q28} onChange={updateValue} />
      <TextAreaField
        label="25. NW ile şirketiniz arasında nasıl bir ilişki kurmayı planlıyorsunuz?"
        name="q25"
        placeholder="Temsilcilik, distribütörlük, ortak girişim vb. beklentileriniz"
        value={values.q25}
        onChange={updateValue}
      />
      <TextAreaField
        label="29. Asıl karar vericiler kimlerdir ve ilişki seviyeniz nedir?"
        name="q29"
        placeholder="Satın alım onayını veren merciiler ve bağlantılarınız"
        value={values.q29}
        onChange={updateValue}
      />
    </div>
  );
}

function TextField({
  label,
  name,
  placeholder,
  value,
  required,
  showError,
  onChange,
}: {
  label: string;
  name: keyof DronSubmissionInput;
  placeholder: string;
  value: string;
  required?: boolean;
  showError?: boolean;
  onChange: (name: keyof DronSubmissionInput, value: string) => void;
}) {
  return (
    <label className="dron-field">
      <span>{label}</span>
      <input
        aria-invalid={showError ? "true" : "false"}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {showError ? <small>Bu alan zorunludur.</small> : null}
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: keyof DronSubmissionInput;
  placeholder: string;
  value: string;
  onChange: (name: keyof DronSubmissionInput, value: string) => void;
}) {
  return (
    <label className="dron-field">
      <span>{label}</span>
      <textarea name={name} placeholder={placeholder} value={value} onChange={(event) => onChange(name, event.target.value)} />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: keyof DronSubmissionInput;
  value: string;
  options: string[];
  onChange: (name: keyof DronSubmissionInput, value: string) => void;
}) {
  return (
    <label className="dron-field">
      <span>{label}</span>
      <select name={name} value={value} onChange={(event) => onChange(name, event.target.value)}>
        <option value="">Seçiniz</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
