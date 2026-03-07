/**
 * Design Philosophy: Çağdaş Akademisyen
 * - Deep Steel Blue (#1e3a5f) primary, Gold (#c9a227) accent
 * - DM Serif Display headings, DM Sans body
 * - Clean white space, card-based layout, sticky navigation
 * - Interactive charts, timeline, filterable publications
 */

import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Globe,
  Users,
  Building,
  Cpu,
  BarChart2,
  BookMarked,
  MessageSquare,
  Calendar,
  MapPin,
  Twitter,
  Linkedin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/hero_bg-3PFdCpxzfeE2EjZVSnYNvu.webp";
const BOOKS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/books_bg-mJy7EiwSBa2fHWSKnAz6t2.webp";
const PROFILE_IMG = "/images/oalbayrakprofil.jpeg";
const FULL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/orhan_albayrak_full_837c0e9f.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const publications = [
  {
    id: 1,
    year: 2023,
    title: "Dijital Çağda Siyaset: Teknoloji ve Yönetişimin Yeni Yüzü",
    type: "Kitap",
    publisher: "Akademisyen Kitabevi",
    doi: "10.37609/akya.2693",
    tags: ["Dijital Siyaset", "Teknoloji", "Yönetişim"],
  },
  {
    id: 2,
    year: 2023,
    title: "Yapay Zekâ ile Demokrasi Söyleşisi: Sesli Sorular, Dijital Cevaplar",
    type: "Kitap",
    publisher: "Özgür Yayınları",
    doi: "10.58830/ozgur.pub220",
    tags: ["Yapay Zeka", "Demokrasi", "Dijital"],
  },
  {
    id: 3,
    year: 2023,
    title: "Dijital Diplomasi: Diplomasi 3.0",
    type: "Makale",
    publisher: "İstanbul Ticaret Üniversitesi Sosyal Bilimler Dergisi",
    doi: "10.46928/iticusbe.1288805",
    tags: ["Dijital Diplomasi", "Uluslararası İlişkiler"],
  },
  {
    id: 4,
    year: 2023,
    title: "Küresel Güney'de Siyasetçi Olmanın Zorlukları",
    type: "Kitap Bölümü",
    publisher: "Geleceğin Koridorları",
    tags: ["Küresel Siyaset", "Siyaset Bilimi"],
  },
  {
    id: 5,
    year: 2022,
    title: "Meta-Politics and Ethics",
    type: "Kitap Bölümü",
    publisher: "Eastern and Western Ethicians: A Critical Comparison",
    isbn: "978-2-38236-470-3",
    tags: ["Siyaset Felsefesi", "Etik"],
  },
  {
    id: 6,
    year: 2021,
    title: "Comparing Political Participation Levels of Party Members Within the Two Main Parties of Turkey",
    type: "Makale",
    publisher: "Journal of Political Science and International Relations",
    doi: "10.11648/J.JPSIR.20210401.12",
    tags: ["Siyasi Katılım", "Parti İçi Demokrasi"],
  },
  {
    id: 7,
    year: 2021,
    title: "Parti Üyelerinin Siyasi Katılımı",
    type: "Kitap",
    publisher: "Orion Yayınevi, Ankara",
    isbn: "978-605-06875-9-0",
    tags: ["Siyasi Katılım", "Türkiye Siyaseti"],
  },
  {
    id: 8,
    year: 2021,
    title: "Saha Çalışmaları ve Etik İlkelerin AK Parti'nin Seçim Sonuçları Üzerindeki Etkileri",
    type: "Kitap Bölümü",
    publisher: "Teoriden Pratiğe Türkiye Siyaseti",
    isbn: "978-605-9823-56-2",
    tags: ["Seçim Çalışmaları", "Türkiye Siyaseti"],
  },
  {
    id: 9,
    year: 2021,
    title: "Pandemi Sürecinde Eğitim",
    type: "Makale",
    publisher: "Pandemi ve Sonrası",
    tags: ["Eğitim", "Pandemi"],
  },
  {
    id: 10,
    year: 2020,
    title: "Japonya'da Eğitim Sistemi ve Mesleki Eğitime Farklı Bir Bakış",
    type: "Makale",
    publisher: "Küresel Ölçekli Eğitim Planlaması ve Öne Çıkan Meslekler",
    tags: ["Eğitim", "Karşılaştırmalı Eğitim"],
  },
  {
    id: 11,
    year: 2019,
    title: "Göç ve Kültürel Etkileşim",
    type: "Kitap",
    publisher: "İstanbul Sabahattin Zaim Üniversitesi Yayınları",
    isbn: "978-605-81541-8-6",
    tags: ["Göç", "Kültür"],
  },
];

const publicationsByYear = [
  { year: "2019", count: 1 },
  { year: "2020", count: 2 },
  { year: "2021", count: 4 },
  { year: "2022", count: 1 },
  { year: "2023", count: 4 },
];

const publicationTypes = [
  { name: "Kitap", value: 4, color: "#1e3a5f" },
  { name: "Makale", value: 4, color: "#c9a227" },
  { name: "Kitap Bölümü", value: 3, color: "#4a7ab5" },
];

const researchAreas = [
  { name: "Dijital Siyaset", count: 5 },
  { name: "Siyasi Katılım", count: 4 },
  { name: "Eğitim", count: 3 },
  { name: "Yapay Zeka", count: 2 },
  { name: "Uluslararası İlişkiler", count: 3 },
  { name: "Göç & Kültür", count: 1 },
];

const careerTimeline = [
  {
    year: "1982–1984",
    role: "Araştırmacı",
    org: "TÜBİTAK Marmara Araştırma Merkezi",
    location: "Gebze, Kocaeli",
    icon: <Cpu size={16} />,
  },
  {
    year: "1984–1986",
    role: "Ağ Projesi Araştırmacısı",
    org: "University of Florida",
    location: "Florida, ABD",
    icon: <Globe size={16} />,
  },
  {
    year: "2004–Günümüz",
    role: "Meclis Üyesi & Eğitim Komitesi Başkanı",
    org: "İstanbul Ticaret Odası (İTO)",
    location: "İstanbul",
    icon: <Building size={16} />,
  },
  {
    year: "2009–2013",
    role: "İstanbul Temsilcisi & Girişimcilik Grubu Başkanı",
    org: "AER (Assembly of European Regions)",
    location: "Brüksel, Belçika",
    icon: <Globe size={16} />,
  },
  {
    year: "2009–2013",
    role: "İl Genel Meclis Üyesi & Başkan Vekili",
    org: "İstanbul İl Genel Meclisi",
    location: "İstanbul",
    icon: <Users size={16} />,
  },
  {
    year: "2015–Günümüz",
    role: "Mütevelli Heyet Başkanı",
    org: "FGA Vakfı (Faik-Gülüzar Albayrak Vakfı)",
    location: "İstanbul",
    icon: <Award size={16} />,
  },
  {
    year: "2018–Günümüz",
    role: "YK Üyesi & Başkan Yardımcısı",
    org: "Türkiye Dil ve Edebiyat Derneği (TDED)",
    location: "İstanbul",
    icon: <BookMarked size={16} />,
  },
  {
    year: "2021–2024",
    role: "Doçent Doktor",
    org: "Haliç Üniversitesi – Siyaset Bilimi ve Uluslararası İlişkiler",
    location: "İstanbul",
    icon: <GraduationCap size={16} />,
  },
  {
    year: "2023–Günümüz",
    role: "Yönetim Kurulu Üyesi",
    org: "İTÜ 1773 Teknopark A.Ş.",
    location: "İstanbul",
    icon: <Cpu size={16} />,
  },
];

const educationData = [
  {
    degree: "Doktora",
    field: "Siyaset Bilimi ve Uluslararası İlişkiler",
    school: "İstanbul Sabahattin Zaim Üniversitesi",
    years: "2016–2020",
    thesis: "Türkiye'nin iki ana siyasi parti üyelerinin siyasi katılım düzeyleri ve parti içi demokrasi",
  },
  {
    degree: "Yüksek Lisans",
    field: "Modern İşletme Yönetimi",
    school: "Marmara Üniversitesi",
    years: "1999–2000",
    thesis: "Sertifika Programı",
  },
  {
    degree: "Yüksek Lisans",
    field: "Kontrol ve Bilgisayar Mühendisliği",
    school: "İstanbul Teknik Üniversitesi",
    years: "1982–1984",
    thesis: "Kontrol ve Bilgisayar Programı",
  },
  {
    degree: "Lisans",
    field: "Elektronik ve Haberleşme Mühendisliği",
    school: "İstanbul Teknik Üniversitesi",
    years: "1977–1982",
    thesis: "Elektronik ve Haberleşme Fakültesi",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
      <div className="gold-line w-16 mt-3" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("hakkinda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pubFilter, setPubFilter] = useState<string>("Tümü");
  const [pubTypeFilter, setPubTypeFilter] = useState<string>("Tümü");

  const navItems = [
    { id: "hakkinda", label: "Hakkında" },
    { id: "egitim", label: "Eğitim" },
    { id: "kariyer", label: "Kariyer" },
    { id: "yayinlar", label: "Yayınlar" },
    { id: "arastirma", label: "Araştırma" },
    { id: "iletisim", label: "İletişim" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const filteredPubs = publications.filter((p) => {
    const yearMatch = pubFilter === "Tümü" || p.year.toString() === pubFilter;
    const typeMatch = pubTypeFilter === "Tümü" || p.type === pubTypeFilter;
    return yearMatch && typeMatch;
  });

  const years = ["Tümü", "2023", "2022", "2021", "2020", "2019"];
  const types = ["Tümü", "Kitap", "Makale", "Kitap Bölümü"];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'DM Serif Display', serif" }}>
              OA
            </div>
            <span className="font-semibold text-[#1e3a5f] hidden sm:block text-sm">Doç. Dr. Orhan Albayrak</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm rounded-md transition-colors animated-underline ${
                  activeSection === item.id
                    ? "text-[#1e3a5f] font-semibold"
                    : "text-gray-500 hover:text-[#1e3a5f]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#1e3a5f]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 text-sm rounded-md ${
                  activeSection === item.id ? "bg-[#1e3a5f] text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="hakkinda"
        className="relative min-h-screen flex items-center pt-16"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-transparent" />
        <div className="container relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <p className="text-[#c9a227] font-medium text-sm tracking-widest uppercase mb-4">
                Akademisyen · Araştırmacı · Yazar
              </p>
              <h1
                className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Doç. Dr.<br />Orhan<br />Albayrak
              </h1>
              <div className="gold-line w-24 mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                Elektronik Mühendisliği'nden Siyaset Bilimine uzanan çok disiplinli bir akademik profil.
                Dijital çağda siyaset, yapay zeka ve demokrasi üzerine araştırmalar.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("yayinlar")}
                  className="bg-[#c9a227] hover:bg-[#b8911f] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <BookOpen size={18} />
                  Yayınlarım
                </button>
                <button
                  onClick={() => scrollTo("iletisim")}
                  className="border border-white/50 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Mail size={18} />
                  İletişim
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold text-[#c9a227]" style={{ fontFamily: "'DM Serif Display', serif" }}>13+</p>
                  <p className="text-white/60 text-sm">Akademik Yayın</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c9a227]" style={{ fontFamily: "'DM Serif Display', serif" }}>40+</p>
                  <p className="text-white/60 text-sm">Yıllık Deneyim</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c9a227]" style={{ fontFamily: "'DM Serif Display', serif" }}>11+</p>
                  <p className="text-white/60 text-sm">Kurum Üyeliği</p>
                </div>
              </div>
            </div>

            {/* Right: Profile Photo */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-2xl overflow-hidden border-4 border-[#c9a227]/50 shadow-2xl">
                  <img
                    src={PROFILE_IMG}
                    alt="Doç. Dr. Orhan Albayrak"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#c9a227] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                  ORCID: 0000-0002-1937-6011
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2">
                <SectionTitle title="Hakkında" subtitle="Akademik Profil" />
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Doç. Dr. Orhan Albayrak, 1960 yılında Trabzon'un Arsin ilçesinde doğmuştur. İlk, orta ve lise eğitimini Erzurum'da tamamladıktan sonra akademik kariyerine İstanbul Teknik Üniversitesi'nde Elektronik ve Haberleşme Mühendisliği lisans eğitimiyle başlamıştır.
                  </p>
                  <p>
                    Lisans sonrasında aynı üniversitede Kontrol ve Bilgisayar programında yüksek lisansını tamamlamış, ardından University of Florida'da bir ağ projesinde görev almıştır. Marmara Üniversitesi'nde Modern İşletme Yönetimi sertifika programını bitirmiş; doktorasını ise İstanbul Sabahattin Zaim Üniversitesi'nde Siyaset Bilimi ve Uluslararası İlişkiler alanında tamamlamıştır.
                  </p>
                  <p>
                    Doktora tezinde Türkiye'nin iki ana siyasi parti üyelerinin siyasi katılım düzeyleri ve parti içi demokrasiye dair tutumlarını hem nitel hem nicel yöntemlerle incelemiştir. Akademik ilgi alanları arasında dijital çağda siyaset, yapay zeka ve demokrasi ilişkisi, yeni toplumsal hareketler ve dijital diplomasi öne çıkmaktadır.
                  </p>
                  <p>
                    İngilizce ve Osmanlıca bilen Doç. Dr. Albayrak, evli ve üç çocuk babasıdır.
                  </p>
                </div>
              </div>

              {/* Key Info Card */}
              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-[#1e3a5f] mb-4 text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Temel Bilgiler
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#c9a227] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Doğum Yeri</p>
                      <p className="text-gray-500">Arsin, Trabzon (1960)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap size={16} className="text-[#c9a227] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Unvan</p>
                      <p className="text-gray-500">Doçent Doktor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building size={16} className="text-[#c9a227] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Mevcut Kurum</p>
                      <p className="text-gray-500">Bezmialem Vakıf Üniversitesi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe size={16} className="text-[#c9a227] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Diller</p>
                      <p className="text-gray-500">Türkçe, İngilizce, Osmanlıca</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen size={16} className="text-[#c9a227] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">ORCID</p>
                      <a
                        href="https://orcid.org/0000-0002-1937-6011"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1e3a5f] hover:text-[#c9a227] transition-colors"
                      >
                        0000-0002-1937-6011
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Anahtar Kelimeler</p>
                  <div className="flex flex-wrap gap-2">
                    {["Siyaset Bilimi", "Dijital Çağda Siyaset", "Demokrasi", "Yapay Zeka", "Parti İçi Demokrasi"].map((tag) => (
                      <span key={tag} className="bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Education Section ── */}
      <section id="egitim" className="py-20 bg-[#f8f9fc]">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="Eğitim" subtitle="Akademik Geçmiş" />
            <div className="grid md:grid-cols-2 gap-6">
              {educationData.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover-card shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center shrink-0">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold bg-[#c9a227]/15 text-[#c9a227] px-2 py-0.5 rounded-full">
                          {edu.degree}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={11} /> {edu.years}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#1e3a5f] text-lg leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {edu.field}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{edu.school}</p>
                      <p className="text-gray-400 text-xs mt-2 italic">{edu.thesis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Career Timeline ── */}
      <section id="kariyer" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="Kariyer" subtitle="Mesleki Deneyim ve Görevler" />
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f] to-[#c9a227]" />
              <div className="space-y-6">
                {careerTimeline.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start pl-16 relative">
                    {/* Dot */}
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#1e3a5f] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 hover-card shadow-sm flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[#1e3a5f]">{item.role}</p>
                          <p className="text-gray-600 text-sm">{item.org}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-medium bg-[#1e3a5f]/10 text-[#1e3a5f] px-2 py-1 rounded-full">
                            {item.year}
                          </span>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-end">
                            <MapPin size={10} /> {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Publications Section ── */}
      <section id="yayinlar" className="py-20 bg-[#f8f9fc]">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="Yayınlar" subtitle="Akademik Çalışmalar ve Kitaplar" />

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Bar chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <BarChart2 size={18} className="text-[#c9a227]" />
                  Yıllara Göre Yayın Sayısı
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={publicationsByYear}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      formatter={(v) => [`${v} yayın`, "Sayı"]}
                    />
                    <Bar dataKey="count" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-[#c9a227]" />
                  Yayın Türleri Dağılımı
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={publicationTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {publicationTypes.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v} yayın`, n]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Yıl:</span>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setPubFilter(y)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      pubFilter === y
                        ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#1e3a5f]"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Tür:</span>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPubTypeFilter(t)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      pubTypeFilter === t
                        ? "bg-[#c9a227] text-white border-[#c9a227]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#c9a227]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Publications list */}
            <div className="space-y-4">
              {filteredPubs.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover-card shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            pub.type === "Kitap"
                              ? "bg-[#1e3a5f]/10 text-[#1e3a5f]"
                              : pub.type === "Makale"
                              ? "bg-[#c9a227]/15 text-[#b8911f]"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {pub.type}
                        </span>
                        <span className="text-xs text-gray-400">{pub.year}</span>
                      </div>
                      <h3 className="font-semibold text-[#1e3a5f] leading-snug mb-1">
                        {pub.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{pub.publisher}</p>
                      {(pub.doi || pub.isbn) && (
                        <p className="text-xs text-gray-400 mt-1">
                          {pub.doi ? `DOI: ${pub.doi}` : `ISBN: ${pub.isbn}`}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pub.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1e3a5f] hover:text-[#c9a227] transition-colors shrink-0"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {filteredPubs.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  Bu filtreye uygun yayın bulunamadı.
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Research Areas ── */}
      <section id="arastirma" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="Araştırma Alanları" subtitle="Uzmanlık ve İlgi Alanları" />
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Cpu size={24} />, title: "Dijital Çağda Siyaset", desc: "Teknolojinin siyasi süreçlere etkisi ve dijital yönetişim" },
                    { icon: <Users size={24} />, title: "Siyasi Katılım", desc: "Parti üyeliği ve parti içi demokrasi mekanizmaları" },
                    { icon: <Globe size={24} />, title: "Dijital Diplomasi", desc: "Diplomasi 3.0 ve uluslararası ilişkilerde dijital dönüşüm" },
                    { icon: <MessageSquare size={24} />, title: "Yapay Zeka & Demokrasi", desc: "YZ'nin demokratik süreçler üzerindeki etkileri" },
                    { icon: <GraduationCap size={24} />, title: "Eğitim Politikaları", desc: "Mesleki eğitim, okul özerkliği ve eğitim reformu" },
                    { icon: <BookMarked size={24} />, title: "Göç & Kültür", desc: "Göç hareketleri ve kültürel etkileşim dinamikleri" },
                  ].map((area, i) => (
                    <div key={i} className="bg-[#f8f9fc] rounded-xl p-4 border border-gray-100 hover-card">
                      <div className="text-[#c9a227] mb-3">{area.icon}</div>
                      <h4 className="font-semibold text-[#1e3a5f] text-sm mb-1">{area.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research bar chart */}
              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-[#1e3a5f] mb-6">Araştırma Alanı Yoğunluğu</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={researchAreas} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
                    <Tooltip
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      formatter={(v) => [`${v} yayın`, "Yayın Sayısı"]}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {researchAreas.map((_, i) => (
                        <Cell key={i} fill={i % 2 === 0 ? "#1e3a5f" : "#c9a227"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Notable Achievement Banner ── */}
      <section
        className="py-16 relative"
        style={{
          backgroundImage: `url(${BOOKS_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/85" />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <Award size={40} className="text-[#c9a227] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Dünya Birincisi Proje
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Yaklaşık <strong className="text-[#c9a227]">20.000 kişiye</strong> istihdam sağlayan Özel İdare Meslek Kursları projesi,
              Malezya'da düzenlenen <strong className="text-[#c9a227]">Dünya Ticaret Odaları Proje Yarışması</strong>'nda
              dünya birincisi seçilmiştir.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="İletişim" subtitle="Akademik İşbirliği ve Ulaşım" />
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Akademik işbirliği, konferans davetleri veya araştırma projeleri için aşağıdaki kanallar üzerinden iletişime geçebilirsiniz.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:orhan.albayrak@bezmialem.edu.tr"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#1e3a5f] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
                      <Mail size={18} className="text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Kurumsal E-posta</p>
                      <p className="text-[#1e3a5f] font-medium text-sm">orhan.albayrak@bezmialem.edu.tr</p>
                    </div>
                  </a>
                  <a
                    href="https://orcid.org/0000-0002-1937-6011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#1e3a5f] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
                      <BookOpen size={18} className="text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">ORCID Profili</p>
                      <p className="text-[#1e3a5f] font-medium text-sm">0000-0002-1937-6011</p>
                    </div>
                  </a>
                  <a
                    href="https://x.com/OrAlbayrak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#1e3a5f] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
                      <Twitter size={18} className="text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Twitter / X</p>
                      <p className="text-[#1e3a5f] font-medium text-sm">@OrAlbayrak</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Affiliations */}
              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-[#1e3a5f] mb-5 text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Üyelikler & Bağlantılar
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Bezmialem Vakıf Üniversitesi", role: "Doçent Doktor", url: "https://bezmialem.edu.tr" },
                    { name: "TDED – Türkiye Dil ve Edebiyat Derneği", role: "YK Üyesi & Başkan Yardımcısı", url: "https://www.tded.org.tr" },
                    { name: "İstanbul Ticaret Odası", role: "Meclis Üyesi", url: "https://www.ito.org.tr" },
                    { name: "İTÜ 1773 Teknopark A.Ş.", role: "YK Üyesi", url: "#" },
                    { name: "AKON İnovasyon Merkezi", role: "Bilim Kurulu Üyesi", url: "https://akon.org.tr" },
                    { name: "FGA Vakfı", role: "Mütevelli Heyet Başkanı", url: "#" },
                  ].map((aff, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#1e3a5f]">{aff.name}</p>
                        <p className="text-xs text-gray-400">{aff.role}</p>
                      </div>
                      {aff.url !== "#" && (
                        <a href={aff.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#c9a227] transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1e3a5f] text-white py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Doç. Dr. Orhan Albayrak
              </p>
              <p className="text-white/60 text-sm">Akademisyen · Araştırmacı · Yazar</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://orcid.org/0000-0002-1937-6011" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a227] transition-colors text-sm">
                ORCID
              </a>
              <a href="https://x.com/OrAlbayrak" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a227] transition-colors text-sm">
                Twitter
              </a>
              <a href="https://www.researchgate.net/profile/Orhan-Albayrak-6" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a227] transition-colors text-sm">
                ResearchGate
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
            © 2026 Doç. Dr. Orhan Albayrak. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
