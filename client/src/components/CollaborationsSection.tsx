import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, X, Sparkles, Loader2 } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

export type VisitedCountry = {
  id: string;
  nameTr: string;
  nameEn: string;
  lat: number;
  lng: number;
  flag: string;
  region: "avrupa" | "asya" | "amerika" | "afrika" | "ortadogu";
};

export const VISITED_COUNTRIES: VisitedCountry[] = [
  { id: "TR", nameTr: "Türkiye", nameEn: "Turkey", lat: 38.9637, lng: 35.2433, flag: "🇹🇷", region: "avrupa" },
  { id: "FR", nameTr: "Fransa", nameEn: "France", lat: 46.2276, lng: 2.2137, flag: "🇫🇷", region: "avrupa" },
  { id: "BE", nameTr: "Belçika", nameEn: "Belgium", lat: 50.5039, lng: 4.4699, flag: "🇧🇪", region: "avrupa" },
  { id: "US", nameTr: "Amerika Birleşik Devletleri", nameEn: "United States", lat: 37.0902, lng: -95.7129, flag: "🇺🇸", region: "amerika" },
  { id: "JP", nameTr: "Japonya", nameEn: "Japan", lat: 36.2048, lng: 138.2529, flag: "🇯🇵", region: "asya" },
  { id: "MY", nameTr: "Malezya", nameEn: "Malaysia", lat: 4.2105, lng: 101.9758, flag: "🇲🇾", region: "asya" },
  { id: "SG", nameTr: "Singapur", nameEn: "Singapore", lat: 1.3521, lng: 103.8198, flag: "🇸🇬", region: "asya" },
  { id: "DE", nameTr: "Almanya", nameEn: "Germany", lat: 51.1657, lng: 10.4515, flag: "🇩🇪", region: "avrupa" },
  { id: "ZA", nameTr: "Güney Afrika", nameEn: "South Africa", lat: -30.5595, lng: 22.9375, flag: "🇿🇦", region: "afrika" },
  { id: "MA", nameTr: "Fas", nameEn: "Morocco", lat: 31.7917, lng: -7.0926, flag: "🇲🇦", region: "afrika" },
  { id: "FI", nameTr: "Finlandiya", nameEn: "Finland", lat: 61.9241, lng: 25.7482, flag: "🇫🇮", region: "avrupa" },
  { id: "IT", nameTr: "İtalya", nameEn: "Italy", lat: 41.8719, lng: 12.5674, flag: "🇮🇹", region: "avrupa" },
  { id: "ES", nameTr: "İspanya", nameEn: "Spain", lat: 40.4637, lng: -3.7492, flag: "🇪🇸", region: "avrupa" },
  { id: "SD", nameTr: "Sudan", nameEn: "Sudan", lat: 12.8628, lng: 30.2176, flag: "🇸🇩", region: "afrika" },
  { id: "CH", nameTr: "İsviçre", nameEn: "Switzerland", lat: 46.8182, lng: 8.2275, flag: "🇨🇭", region: "avrupa" },
  { id: "HR", nameTr: "Hırvatistan", nameEn: "Croatia", lat: 45.1, lng: 15.2, flag: "🇭🇷", region: "avrupa" },
  { id: "GB", nameTr: "Birleşik Krallık", nameEn: "United Kingdom", lat: 55.3781, lng: -3.436, flag: "🇬🇧", region: "avrupa" },
  { id: "BA", nameTr: "Bosna-Hersek", nameEn: "Bosnia and Herzegovina", lat: 43.9159, lng: 17.6791, flag: "🇧🇦", region: "avrupa" },
  { id: "SY", nameTr: "Suriye", nameEn: "Syria", lat: 34.8021, lng: 38.9968, flag: "🇸🇾", region: "ortadogu" },
  { id: "SA", nameTr: "Suudi Arabistan", nameEn: "Saudi Arabia", lat: 23.8859, lng: 45.0792, flag: "🇸🇦", region: "ortadogu" },
  { id: "IR", nameTr: "İran", nameEn: "Iran", lat: 32.4279, lng: 53.688, flag: "🇮🇷", region: "ortadogu" },
  { id: "IQ", nameTr: "Irak", nameEn: "Iraq", lat: 33.2232, lng: 43.6793, flag: "🇮🇶", region: "ortadogu" },
  { id: "BG", nameTr: "Bulgaristan", nameEn: "Bulgaria", lat: 42.7339, lng: 25.4858, flag: "🇧🇬", region: "avrupa" },
  { id: "CN", nameTr: "Çin", nameEn: "China", lat: 35.8617, lng: 104.1954, flag: "🇨🇳", region: "asya" },
  { id: "KZ", nameTr: "Kazakistan", nameEn: "Kazakhstan", lat: 48.0196, lng: 66.9237, flag: "🇰🇿", region: "asya" },
  { id: "HK", nameTr: "Hong Kong", nameEn: "Hong Kong SAR China", lat: 22.3193, lng: 114.1694, flag: "🇭🇰", region: "asya" },
  { id: "NO", nameTr: "Norveç", nameEn: "Norway", lat: 60.472, lng: 8.4689, flag: "🇳🇴", region: "avrupa" },
  { id: "SE", nameTr: "İsveç", nameEn: "Sweden", lat: 60.1282, lng: 18.6435, flag: "🇸🇪", region: "avrupa" },
  { id: "DK", nameTr: "Danimarka", nameEn: "Denmark", lat: 56.2639, lng: 9.5018, flag: "🇩🇰", region: "avrupa" },
  { id: "HU", nameTr: "Macaristan", nameEn: "Hungary", lat: 47.1625, lng: 19.5033, flag: "🇭🇺", region: "avrupa" },
  { id: "EG", nameTr: "Mısır", nameEn: "Egypt", lat: 26.8206, lng: 30.8025, flag: "🇪🇬", region: "afrika" },
  { id: "CA", nameTr: "Kanada", nameEn: "Canada", lat: 56.1304, lng: -106.3468, flag: "🇨🇦", region: "amerika" },
  { id: "CY", nameTr: "Kıbrıs", nameEn: "Cyprus", lat: 35.1264, lng: 33.4299, flag: "🇨🇾", region: "avrupa" },
  { id: "XK", nameTr: "Kosova", nameEn: "Kosovo", lat: 42.6026, lng: 20.903, flag: "🇽🇰", region: "avrupa" },
  { id: "KW", nameTr: "Kuveyt", nameEn: "Kuwait", lat: 29.3117, lng: 47.4818, flag: "🇰🇼", region: "ortadogu" },
  { id: "RS", nameTr: "Sırbistan", nameEn: "Serbia", lat: 44.0165, lng: 21.0059, flag: "🇷🇸", region: "avrupa" },
  { id: "TZ", nameTr: "Tanzanya", nameEn: "Tanzania", lat: -6.369, lng: 34.8888, flag: "🇹🇿", region: "afrika" },
  { id: "TH", nameTr: "Tayland", nameEn: "Thailand", lat: 15.87, lng: 100.9925, flag: "🇹🇭", region: "asya" },
  { id: "UA", nameTr: "Ukrayna", nameEn: "Ukraine", lat: 48.3794, lng: 31.1656, flag: "🇺🇦", region: "avrupa" },
  { id: "JO", nameTr: "Ürdün", nameEn: "Jordan", lat: 30.5852, lng: 36.2384, flag: "🇯🇴", region: "ortadogu" },
  { id: "OM", nameTr: "Umman", nameEn: "Oman", lat: 21.5126, lng: 55.9233, flag: "🇴🇲", region: "ortadogu" },
  { id: "VA", nameTr: "Vatikan", nameEn: "Vatican City", lat: 41.9029, lng: 12.4534, flag: "🇻🇦", region: "avrupa" },
  { id: "AR", nameTr: "Arjantin", nameEn: "Argentina", lat: -38.4161, lng: -63.6167, flag: "🇦🇷", region: "amerika" },
  { id: "AL", nameTr: "Arnavutluk", nameEn: "Albania", lat: 41.1533, lng: 20.1683, flag: "🇦🇱", region: "avrupa" },
  { id: "AT", nameTr: "Avusturya", nameEn: "Austria", lat: 47.5162, lng: 14.5501, flag: "🇦🇹", region: "avrupa" },
  { id: "AZ", nameTr: "Azerbaycan", nameEn: "Azerbaijan", lat: 40.1431, lng: 47.5769, flag: "🇦🇿", region: "asya" },
  { id: "BR", nameTr: "Brezilya", nameEn: "Brazil", lat: -14.235, lng: -51.9253, flag: "🇧🇷", region: "amerika" },
  { id: "CZ", nameTr: "Çekya", nameEn: "Czech Republic", lat: 49.8175, lng: 15.473, flag: "🇨🇿", region: "avrupa" },
  { id: "NL", nameTr: "Hollanda", nameEn: "Netherlands", lat: 52.1326, lng: 5.2913, flag: "🇳🇱", region: "avrupa" },
  { id: "ID", nameTr: "Endonezya", nameEn: "Indonesia", lat: -0.7893, lng: 113.9213, flag: "🇮🇩", region: "asya" },
  { id: "AZORES", nameTr: "Azor Adaları (Portekiz)", nameEn: "Azores (Portugal)", lat: 37.7412, lng: -25.6756, flag: "🇵🇹", region: "avrupa" },
  { id: "RO", nameTr: "Romanya", nameEn: "Romania", lat: 45.9432, lng: 24.9668, flag: "🇷🇴", region: "avrupa" },
  { id: "SK", nameTr: "Slovakya", nameEn: "Slovakia", lat: 48.669, lng: 19.699, flag: "🇸🇰", region: "avrupa" },
  { id: "GR", nameTr: "Yunanistan", nameEn: "Greece", lat: 39.0742, lng: 21.8243, flag: "🇬🇷", region: "avrupa" },
  { id: "PS", nameTr: "Filistin", nameEn: "Palestine", lat: 31.9522, lng: 35.2332, flag: "🇵🇸", region: "ortadogu" },
  { id: "AE", nameTr: "Birleşik Arap Emirlikleri", nameEn: "United Arab Emirates", lat: 23.4241, lng: 53.8478, flag: "🇦🇪", region: "ortadogu" },
  { id: "MK", nameTr: "Kuzey Makedonya", nameEn: "North Macedonia", lat: 41.6086, lng: 21.7453, flag: "🇲🇰", region: "avrupa" },
];

// Dünya üzerindeki tüm GeoJSON ülke isimlerinin Türkçe karşılıkları ve bayrakları
const COUNTRY_INFO_MAP: Record<string, { tr: string; flag: string }> = {
  "Russia": { tr: "Rusya", flag: "🇷🇺" },
  "Canada": { tr: "Kanada", flag: "🇨🇦" },
  "United States of America": { tr: "ABD", flag: "🇺🇸" },
  "China": { tr: "Çin", flag: "🇨🇳" },
  "Brazil": { tr: "Brezilya", flag: "🇧🇷" },
  "Australia": { tr: "Avustralya", flag: "🇦🇺" },
  "India": { tr: "Hindistan", flag: "🇮🇳" },
  "Argentina": { tr: "Arjantin", flag: "🇦🇷" },
  "Kazakhstan": { tr: "Kazakistan", flag: "🇰🇿" },
  "Algeria": { tr: "Cezayir", flag: "🇩🇿" },
  "DR Congo": { tr: "Kongo DC", flag: "🇨🇩" },
  "Greenland": { tr: "Grönland", flag: "🇬🇱" },
  "Saudi Arabia": { tr: "Suudi Arabistan", flag: "🇸🇦" },
  "Mexico": { tr: "Meksika", flag: "🇲🇽" },
  "Indonesia": { tr: "Endonezya", flag: "🇮🇩" },
  "Sudan": { tr: "Sudan", flag: "🇸🇩" },
  "Libya": { tr: "Libya", flag: "🇱🇾" },
  "Iran": { tr: "İran", flag: "🇮🇷" },
  "Mongolia": { tr: "Moğolistan", flag: "🇲🇳" },
  "Peru": { tr: "Peru", flag: "🇵🇪" },
  "Chad": { tr: "Çad", flag: "🇹🇩" },
  "Niger": { tr: "Nijer", flag: "🇳🇪" },
  "Angola": { tr: "Angola", flag: "🇦🇴" },
  "Mali": { tr: "Mali", flag: "🇲🇱" },
  "South Africa": { tr: "Güney Afrika", flag: "🇿🇦" },
  "Colombia": { tr: "Kolombiya", flag: "🇨🇴" },
  "Ethiopia": { tr: "Etiyopya", flag: "🇪🇹" },
  "Bolivia": { tr: "Bolivya", flag: "🇧🇴" },
  "Mauritania": { tr: "Moritanya", flag: "🇲🇷" },
  "Egypt": { tr: "Mısır", flag: "🇪🇬" },
  "Tanzania": { tr: "Tanzanya", flag: "🇹🇿" },
  "Nigeria": { tr: "Nijerya", flag: "🇳🇬" },
  "Venezuela": { tr: "Venezuela", flag: "🇻🇪" },
  "Namibia": { tr: "Namibya", flag: "🇳🇦" },
  "Pakistan": { tr: "Pakistan", flag: "🇵🇰" },
  "Mozambique": { tr: "Mozambik", flag: "🇲🇿" },
  "Turkey": { tr: "Türkiye", flag: "🇹🇷" },
  "Chile": { tr: "Şili", flag: "🇨🇱" },
  "Zambia": { tr: "Zambiya", flag: "🇿🇲" },
  "Myanmar": { tr: "Myanmar", flag: "🇲🇲" },
  "Afghanistan": { tr: "Afganistan", flag: "🇦🇫" },
  "Somalia": { tr: "Somali", flag: "🇸🇴" },
  "France": { tr: "Fransa", flag: "🇫🇷" },
  "Central African Rep.": { tr: "Orta Afrika Cum.", flag: "🇨🇫" },
  "Ukraine": { tr: "Ukrayna", flag: "🇺🇦" },
  "Madagascar": { tr: "Madagaskar", flag: "🇲🇬" },
  "Botswana": { tr: "Botsvana", flag: "🇧🇼" },
  "Kenya": { tr: "Kenya", flag: "🇰🇪" },
  "Yemen": { tr: "Yemen", flag: "🇾🇪" },
  "Thailand": { tr: "Tayland", flag: "🇹🇭" },
  "Spain": { tr: "İspanya", flag: "🇪🇸" },
  "Turkmenistan": { tr: "Türkmenistan", flag: "🇹🇲" },
  "Cameroon": { tr: "Kamerun", flag: "🇨🇲" },
  "Papua New Guinea": { tr: "Papua Yeni Gine", flag: "🇵🇬" },
  "Sweden": { tr: "İsveç", flag: "🇸🇪" },
  "Uzbekistan": { tr: "Özbekistan", flag: "🇺🇿" },
  "Morocco": { tr: "Fas", flag: "🇲🇦" },
  "Iraq": { tr: "Irak", flag: "🇮🇶" },
  "Japan": { tr: "Japonya", flag: "🇯🇵" },
  "Paraguay": { tr: "Paraguay", flag: "🇵🇾" },
  "Zimbabwe": { tr: "Zimbabve", flag: "🇿🇼" },
  "Norway": { tr: "Norveç", flag: "🇳🇴" },
  "Finland": { tr: "Finlandiya", flag: "🇫🇮" },
  "Malaysia": { tr: "Malezya", flag: "🇲🇾" },
  "Vietnam": { tr: "Vietnam", flag: "🇻🇳" },
  "Congo": { tr: "Kongo", flag: "🇨🇬" },
  "Ivory Coast": { tr: "Fildişi Sahili", flag: "🇨🇮" },
  "Poland": { tr: "Polonya", flag: "🇵🇱" },
  "Oman": { tr: "Umman", flag: "🇴🇲" },
  "Italy": { tr: "İtalya", flag: "🇮🇹" },
  "Philippines": { tr: "Filipinler", flag: "🇵🇭" },
  "Ecuador": { tr: "Ekvador", flag: "🇪🇨" },
  "Burkina Faso": { tr: "Burkina Faso", flag: "🇧🇫" },
  "New Zealand": { tr: "Yeni Zelanda", flag: "🇳🇿" },
  "Gabon": { tr: "Gabon", flag: "🇬🇦" },
  "Guinea": { tr: "Gine", flag: "🇬🇳" },
  "United Kingdom": { tr: "Birleşik Krallık", flag: "🇬🇧" },
  "Uganda": { tr: "Uganda", flag: "🇺🇬" },
  "Ghana": { tr: "Gana", flag: "🇬🇭" },
  "Romania": { tr: "Romanya", flag: "🇷🇴" },
  "Laos": { tr: "Laos", flag: "🇱🇦" },
  "Guyana": { tr: "Guyana", flag: "🇬🇾" },
  "Belarus": { tr: "Belarus", flag: "🇧🇾" },
  "Kyrgyzstan": { tr: "Kırgızistan", flag: "🇰🇬" },
  "Senegal": { tr: "Senegal", flag: "🇸🇳" },
  "Syria": { tr: "Suriye", flag: "🇸🇾" },
  "Cambodia": { tr: "Kamboçya", flag: "🇰🇭" },
  "Uruguay": { tr: "Uruguay", flag: "🇺🇾" },
  "Suriname": { tr: "Surinam", flag: "🇸🇷" },
  "Tunisia": { tr: "Tunus", flag: "🇹🇳" },
  "Nepal": { tr: "Nepal", flag: "🇳🇵" },
  "Bangladesh": { tr: "Bangladeş", flag: "🇧🇩" },
  "Tajikistan": { tr: "Tacikistan", flag: "🇹🇯" },
  "Greece": { tr: "Yunanistan", flag: "🇬🇷" },
  "Nicaragua": { tr: "Nikaragua", flag: "🇳🇮" },
  "North Korea": { tr: "Kuzey Kore", flag: "🇰🇵" },
  "Malawi": { tr: "Malavi", flag: "🇲🇼" },
  "Eritrea": { tr: "Eritre", flag: "🇪🇷" },
  "Benin": { tr: "Benin", flag: "🇧🇯" },
  "Liberia": { tr: "Liberya", flag: "🇱🇷" },
  "South Korea": { tr: "Güney Kore", flag: "🇰🇷" },
  "Hungary": { tr: "Macaristan", flag: "🇭🇺" },
  "Portugal": { tr: "Portekiz", flag: "🇵🇹" },
  "Jordan": { tr: "Ürdün", flag: "🇯🇴" },
  "Serbia": { tr: "Sırbistan", flag: "🇷🇸" },
  "Azerbaijan": { tr: "Azerbaycan", flag: "🇦🇿" },
  "Austria": { tr: "Avusturya", flag: "🇦🇹" },
  "Czechia": { tr: "Çekya", flag: "🇨🇿" },
  "Czech Rep.": { tr: "Çekya", flag: "🇨🇿" },
  "Georgia": { tr: "Gürcistan", flag: "🇬🇪" },
  "Ireland": { tr: "İrlanda", flag: "🇮🇪" },
  "Sierra Leone": { tr: "Sierra Leone", flag: "🇸🇱" },
  "Lithuania": { tr: "Litvanya", flag: "🇱🇹" },
  "Latvia": { tr: "Letonya", flag: "🇱🇻" },
  "Croatia": { tr: "Hırvatistan", flag: "🇭🇷" },
  "Bosnia and Herz.": { tr: "Bosna-Hersek", flag: "🇧🇦" },
  "Slovakia": { tr: "Slovakya", flag: "🇸🇰" },
  "Estonia": { tr: "Estonya", flag: "🇪🇪" },
  "Denmark": { tr: "Danimarka", flag: "🇩🇰" },
  "Netherlands": { tr: "Hollanda", flag: "🇳🇱" },
  "Switzerland": { tr: "İsviçre", flag: "🇨🇭" },
  "Belgium": { tr: "Belçika", flag: "🇧🇪" },
  "Albania": { tr: "Arnavutluk", flag: "🇦🇱" },
  "North Macedonia": { tr: "Kuzey Makedonya", flag: "🇲🇰" },
  "Slovenia": { tr: "Slovenya", flag: "🇸🇮" },
  "Montenegro": { tr: "Karadağ", flag: "🇲🇪" },
  "Bulgaria": { tr: "Bulgaristan", flag: "🇧🇬" },
  "Kosovo": { tr: "Kosova", flag: "🇽🇰" },
  "Cyprus": { tr: "Kıbrıs", flag: "🇨🇾" },
  "Iceland": { tr: "İzlanda", flag: "🇮🇸" },
};

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;

export function CollaborationsSection({ lang }: { lang: "tr" | "en" }) {
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountry | null>(null);
  const [hoverCountry, setHoverCountry] = useState<VisitedCountry | null>(null);
  const [hoverFeatureName, setHoverFeatureName] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [geographies, setGeographies] = useState<any[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState(true);

  // Bölgelere özel 3D Zoom ve Odaklama (Scale & Center) Ayarları
  const REGION_CONFIGS: Record<string, { scale: number; center: [number, number] }> = {
    all: { scale: 145, center: [0, 25] },
    avrupa: { scale: 420, center: [15, 52] },
    asya: { scale: 220, center: [85, 30] },
    ortadogu: { scale: 580, center: [45, 23] },
    afrika: { scale: 260, center: [20, 2] },
    amerika: { scale: 180, center: [-75, 10] },
  };

  // d3-geo mercator projeksiyonu (Arama veya Bölgeye göre dinamik zoom ve merkezleme)
  const projection = useMemo(() => {
    // Eğer arama kutusunda yazı varsa, aranan ülkenin koordinatlarına odaklan
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      // Önce Ziyaret edilen 50+ ülkeden ara
      const matchedVisited = VISITED_COUNTRIES.find((c) =>
        c.nameTr.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q)
      );

      if (matchedVisited) {
        return geoMercator()
          .scale(480)
          .center([matchedVisited.lng, matchedVisited.lat])
          .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
      }

      // Ziyaret edilmeyen tüm dünya ülkelerinden poligon bazlı ara
      const matchedGeo = geographies.find((g) => {
        const name = (g.properties?.name || "").toLowerCase();
        const trInfo = COUNTRY_INFO_MAP[g.properties?.name] || { tr: "" };
        return name.includes(q) || trInfo.tr.toLowerCase().includes(q);
      });

      if (matchedGeo) {
        try {
          const tempPath = geoPath().projection(geoMercator());
          const centroid = tempPath.centroid(matchedGeo);
          if (centroid) {
            // lon/lat ters projeksiyonu
            const inverted = geoMercator().invert?.(centroid);
            if (inverted) {
              return geoMercator()
                .scale(480)
                .center([inverted[0], inverted[1]])
                .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
            }
          }
        } catch {
          // Fallback
        }
      }
    }

    // Arama yoksa varsayılan bölge zoom'unu kullan
    const config = REGION_CONFIGS[activeRegion] || REGION_CONFIGS.all;
    return geoMercator()
      .scale(config.scale)
      .center(config.center)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
  }, [activeRegion, searchQuery, geographies]);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // TopoJSON Dünya Harita Verisi Yükleme (Natural Earth 110m)
  useEffect(() => {
    let isMounted = true;
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const countriesGeo = (feature(data, data.objects.countries) as any).features;
        setGeographies(countriesGeo);
        setIsLoadingMap(false);
      })
      .catch((err) => {
        console.error("Harita yüklenemedi:", err);
        if (isMounted) setIsLoadingMap(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCountries = useMemo(() => {
    return VISITED_COUNTRIES.filter((country) => {
      const name = lang === "en" ? country.nameEn : country.nameTr;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        activeRegion === "all" ||
        country.region === activeRegion ||
        (activeRegion === "asya" && country.region === "ortadogu");
      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      const nameA = lang === "en" ? a.nameEn : a.nameTr;
      const nameB = lang === "en" ? b.nameEn : b.nameTr;
      return nameA.localeCompare(nameB, lang);
    });
  }, [searchQuery, activeRegion, lang]);

  const totalCountries = VISITED_COUNTRIES.length;

  return (
    <section id="isbirlikleri" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-24">
      {/* Arka plan ışık efektleri */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Başlık ve açıklama */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 text-[#c9a227] text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe size={14} />
            <span>{lang === "en" ? "Global Academic & Professional Footprint" : "Uluslararası Temas ve İşbirlikleri"}</span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {lang === "en" ? "Collaborations & Visited Countries" : "İşbirlikleri ve Ziyaret Edilen Ülkeler"}
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            {lang === "en"
              ? `Academic research, international delegation speeches, regional development projects, and official visits across ${totalCountries} countries.`
              : `Akademik çalışmalar, uluslararası heyet görüşmeleri, bölgesel kalkınma projeleri ve resmi temaslarda bulunulan toplam ${totalCountries} ülke.`}
          </p>
        </div>

        {/* Sayaçlar / İstatistik Şeritleri */}
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-[#c9a227]">{totalCountries}</p>
            <p className="text-xs md:text-sm text-slate-300 mt-1 font-medium">
              {lang === "en" ? "Countries Visited" : "Ziyaret Edilen Ülke"}
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">5</p>
            <p className="text-xs md:text-sm text-slate-300 mt-1 font-medium">
              {lang === "en" ? "Continents" : "Kıta"}
            </p>
          </div>
        </div>

        {/* Harita Kartı */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-4 md:p-8 shadow-2xl backdrop-blur-md mb-12 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#c9a227]" size={20} />
              <span className="text-sm font-semibold text-slate-200">
                {lang === "en"
                  ? "Interactive World Map (Click markers or list to highlight)"
                  : "İnteraktif Gerçek Dünya Haritası (İğnelere veya listedeki ülkelere tıklayabilirsiniz)"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedCountry && (
                <div className="flex items-center gap-2 bg-[#c9a227]/20 border border-[#c9a227]/40 text-[#c9a227] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <span>{selectedCountry.flag} {lang === "en" ? selectedCountry.nameEn : selectedCountry.nameTr}</span>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Gerçek 3D Kabartmalı SVG Dünya Haritası Container */}
          <div
            className="relative w-full aspect-[2/1] bg-[#070d1e] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group transition-transform duration-500 hover:rotate-x-0"
            style={{
              transform: "perspective(1200px) rotateX(14deg) scale(0.98)",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseLeave={() => {
              setMousePos(null);
              setHoverCountry(null);
              setHoverFeatureName(null);
            }}
          >
            {isLoadingMap && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-30">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Loader2 className="animate-spin text-[#c9a227]" size={24} />
                  <span>{lang === "en" ? "Loading 3D World Map Data..." : "3D Dünya Haritası Yükleniyor..."}</span>
                </div>
              </div>
            )}

            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="w-full h-full object-cover"
            >
              {/* Okyanus, Izgara ve 3D Filtre Efektleri */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                {/* 3D Kabartma Derinlik Gölgesi */}
                <filter id="land-3d-shadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                </filter>
                {/* Seçili/İğneli Ülke Işıma Efekti */}
                <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#060c1e" />
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#grid)" />

              {/* Okyanus İsimleri (Dil Seçeneğine Göre Dinamik Türkçe / İngilizce) */}
              <g className="oceans-layer pointer-events-none opacity-40 select-none" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="4">
                {(() => {
                  const OCEANS = [
                    { tr: "ATLANTİK OKYANUSU", en: "ATLANTIC OCEAN", lat: 10, lng: -28, rotate: -90 },
                    { tr: "HİNT OKYANUSU", en: "INDIAN OCEAN", lat: -15, lng: 75, rotate: -60 },
                    { tr: "BÜYÜK OKYANUS", en: "PACIFIC OCEAN", lat: 5, lng: -140, rotate: 0 },
                    { tr: "BÜYÜK OKYANUS", en: "PACIFIC OCEAN", lat: 10, lng: 165, rotate: 0 },
                    { tr: "ARKTİK OKYANUSU", en: "ARCTIC OCEAN", lat: 78, lng: 20, rotate: 0 },
                    { tr: "GÜNEY OKYANUSU", en: "SOUTHERN OCEAN", lat: -65, lng: 0, rotate: 0 },
                  ];

                  return OCEANS.map((ocean, i) => {
                    const coords = projection([ocean.lng, ocean.lat]);
                    if (!coords) return null;
                    const text = lang === "en" ? ocean.en : ocean.tr;
                    const [cx, cy] = coords;

                    return (
                      <text
                        key={i}
                        x={cx}
                        y={cy}
                        transform={ocean.rotate ? `rotate(${ocean.rotate}, ${cx}, ${cy})` : undefined}
                        textAnchor="middle"
                        className="font-mono uppercase transition-all duration-300"
                        style={{ fontStyle: "italic" }}
                      >
                        {text}
                      </text>
                    );
                  });
                })()}
              </g>

              {/* 3D Ekstra Derinlik ve Kalınlık Tabakaları (Katmanlı Gölge) */}
              <g className="countries-shadow-deep" opacity="0.4">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;
                  return (
                    <path
                      key={`shadow-deep-${geo.id || index}`}
                      d={d}
                      fill="#000000"
                      transform="translate(7, 11)"
                    />
                  );
                })}
              </g>

              <g className="countries-shadow-mid" opacity="0.7">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;
                  return (
                    <path
                      key={`shadow-mid-${geo.id || index}`}
                      d={d}
                      fill="#030816"
                      transform="translate(4, 6)"
                    />
                  );
                })}
              </g>

              {/* Azor Adaları (Azores) Coğrafi Ada Noktaları - Atlantik Okyanusu'nda küçük adacıklar */}
              {(() => {
                const azoresCoords = projection([-25.6756, 37.7412]);
                if (!azoresCoords) return null;
                const [ax, ay] = azoresCoords;
                return (
                  <g className="azores-islands-group" fill="#3b4f71" stroke="#c9a227" strokeWidth="0.8">
                    {/* Azorlar adacıklar kümesi */}
                    <circle cx={ax} cy={ay} r="2.2" />
                    <circle cx={ax - 5} cy={ay + 2} r="1.6" />
                    <circle cx={ax + 6} cy={ay - 3} r="1.8" />
                    <circle cx={ax - 10} cy={ay + 4} r="1.4" />
                    <circle cx={ax + 11} cy={ay - 5} r="1.5" />
                  </g>
                );
              })()}

              {/* Ana Coğrafi Ülke Poligonları (Kalınlaştırılmış 3D Kabartmalı Stilde) */}
              <g className="countries" filter="url(#land-3d-shadow)">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;

                  const geoName = geo.properties?.name || "";
                  const matchedActivePin = filteredCountries.find((c) => {
                    const nameEn = c.nameEn.toLowerCase();
                    const nameTr = c.nameTr.toLowerCase();
                    const gName = geoName.toLowerCase();
                    return (
                      gName === nameEn ||
                      gName === nameTr ||
                      (c.id === "CZ" && (gName.includes("czech") || geo.id === "CZE")) ||
                      (c.id === "IR" && (gName.includes("iran") || geo.id === "IRN")) ||
                      (c.id === "US" && (gName.includes("united states") || gName.includes("america") || geo.id === "USA")) ||
                      (c.id === "GR" && (gName.includes("greece") || geo.id === "GRC")) ||
                      (c.id === "PS" && (gName.includes("palestin") || geo.id === "PSE" || gName.includes("west bank"))) ||
                      (c.id === "AE" && (gName.includes("emirates") || geo.id === "ARE")) ||
                      (c.id === "MK" && (gName.includes("macedonia") || geo.id === "MKD")) ||
                      (c.id === "BA" && (gName.includes("bosnia") || geo.id === "BIH")) ||
                      (c.id && (c.id === geo.id || c.id === geo.properties?.iso_a2))
                    );
                  });

                  return (
                    <path
                      key={geo.id || index}
                      d={d}
                      fill={matchedActivePin ? "#2b4c7e" : "#1a2a44"}
                      stroke={matchedActivePin ? "#c9a227" : "#3b4f71"}
                      strokeWidth={matchedActivePin ? "0.8" : "0.4"}
                      onMouseEnter={() => {
                        if (!matchedActivePin) {
                          setHoverFeatureName(geoName);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoverFeatureName(null);
                      }}
                      className="transition-all duration-200 hover:fill-amber-500/50 hover:stroke-amber-400 cursor-pointer"
                    />
                  );
                })}
              </g>

              {/* Ziyaret Edilen Ülke İğneleri (Pins) - Sade İç Daire Noktaları */}
              <g className="pins">
                {filteredCountries.map((country) => {
                  const coords = projection([country.lng, country.lat]);
                  if (!coords) return null;
                  const [x, y] = coords;

                  const isSelected = selectedCountry?.id === country.id;
                  const isTurkey = country.id === "TR";
                  const isAzores = country.id === "AZORES";

                  return (
                    <g
                      key={country.id}
                      onClick={() => setSelectedCountry(country)}
                      onMouseEnter={() => setHoverCountry(country)}
                      onMouseLeave={() => setHoverCountry(null)}
                      className="cursor-pointer group/pin"
                    >
                      {/* SADECE Türkiye üzerine gelindiğinde olduğu yerde Yanıp Sönen Efekt */}
                      {isTurkey && (hoverCountry?.id === "TR" || hoverFeatureName === "Turkey" || hoverFeatureName === "Türkiye") && (
                        <circle
                          cx={x}
                          cy={y}
                          r="10"
                          fill="rgba(239, 68, 68, 0.5)"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          className="animate-ping pointer-events-none"
                        />
                      )}

                      {/* Ana Tek İğne Noktası (Sabit, Yerinde Duruş) */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? "6" : isTurkey ? "5" : isAzores ? "2.5" : "3.5"}
                        className={`transition-colors duration-200 ${
                          isSelected
                            ? "fill-[#c9a227] stroke-white"
                            : isTurkey
                            ? "fill-red-500 stroke-white drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                            : "fill-amber-400 stroke-slate-950 group-hover/pin:fill-[#c9a227]"
                        }`}
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Haritanın Sağ Üst Köşesinde Sabit Rozet - Türkiye İçin Parlayan Yıldız Gibi Açılış Efekti */}
            {(hoverCountry || hoverFeatureName) && (() => {
              let name = "";
              let flag = "🌐";
              let isTurkeyBadge = false;

              if (hoverCountry) {
                name = lang === "en" ? hoverCountry.nameEn : hoverCountry.nameTr;
                flag = hoverCountry.flag;
                isTurkeyBadge = hoverCountry.id === "TR";
              } else if (hoverFeatureName) {
                const countryInfo = COUNTRY_INFO_MAP[hoverFeatureName] || {
                  tr: hoverFeatureName,
                  flag: "🌐",
                };
                name = lang === "en" ? hoverFeatureName : countryInfo.tr;
                flag = countryInfo.flag;
                isTurkeyBadge = hoverFeatureName.toLowerCase().includes("turkey") || hoverFeatureName.toLowerCase().includes("türkiye");
              }

              return (
                <div
                  className={`absolute top-4 right-4 z-40 px-4.5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-none transition-all duration-300 ${
                    isTurkeyBadge
                      ? "bg-red-950/90 border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.95)] animate-pulse scale-105"
                      : "bg-slate-900/95 border-2 border-slate-700 text-white"
                  }`}
                >
                  <span className="text-2xl">{flag}</span>
                  <span
                    className={`font-black text-sm md:text-base tracking-wide ${
                      isTurkeyBadge
                        ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
                        : "text-white"
                    }`}
                  >
                    {name} {isTurkeyBadge && "🇹🇷"}
                  </span>
                </div>
              );
            })()}

            {/* Seçili Ülke Detay Kartı Overlay */}
            <AnimatePresence>
              {selectedCountry && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 border border-[#c9a227]/50 rounded-2xl p-4 shadow-2xl backdrop-blur-lg text-left z-20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{selectedCountry.flag}</span>
                      <div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                          {lang === "en" ? selectedCountry.nameEn : selectedCountry.nameTr}
                        </h4>
                        <span className="text-xs text-[#c9a227] font-medium uppercase tracking-wider">
                          {selectedCountry.id === "TR"
                            ? lang === "en" ? "Home Base" : "Ana Vatan / Merkez"
                            : lang === "en" ? "Visited & Delegation Partner" : "Ziyaret & Temas Ülkesi"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Arama ve Filtreleme Şeridi */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "en" ? "Search country..." : "Ülke ara..."}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#c9a227] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: "all", labelTr: "Tüm Ülkeler", labelEn: "All Countries" },
                { id: "avrupa", labelTr: "Avrupa", labelEn: "Europe" },
                { id: "asya", labelTr: "Asya", labelEn: "Asia" },
                { id: "ortadogu", labelTr: "Orta Doğu", labelEn: "Middle East" },
                { id: "afrika", labelTr: "Afrika", labelEn: "Africa" },
                { id: "amerika", labelTr: "Amerika", labelEn: "Americas" },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setActiveRegion(reg.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeRegion === reg.id
                      ? "bg-[#c9a227] text-slate-950 shadow-md shadow-[#c9a227]/20"
                      : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {lang === "en" ? reg.labelEn : reg.labelTr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              return (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#c9a227]/20 border-[#c9a227] text-white shadow-lg"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <span className="text-xl shrink-0">{country.flag}</span>
                  <span className="text-xs font-medium truncate">
                    {lang === "en" ? country.nameEn : country.nameTr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
