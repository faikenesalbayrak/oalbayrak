import { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Twitter,
  X,
} from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/hero_bg-3PFdCpxzfeE2EjZVSnYNvu.webp";
const BOOKS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/books_bg-mJy7EiwSBa2fHWSKnAz6t2.webp";
const PROFILE_IMG = "/images/oalbayrakprofil.jpeg";

type EducationItem = {
  degree: string;
  field: string;
  school: string;
  years: string;
  thesis: string;
};

type CourseItem = {
  title: string;
  language: string;
  term: string;
  academicYear: string;
  level: "Lisans" | "Yüksek Lisans" | "Doktora";
};

type RecordItem = {
  title: string;
  organization?: string;
  role?: string;
  year?: string;
  scope?: string;
  venue?: string;
  startDate?: string;
  endDate?: string;
  details?: string;
};

const aboutParagraphs = [
  "Doç. Dr. Orhan Albayrak, 1960 yılında Trabzon'un Arsin ilçesinde doğmuştur. İlk, orta ve lise eğitimini Erzurum'da tamamladıktan sonra akademik kariyerine İstanbul Teknik Üniversitesi'nde Elektronik ve Haberleşme Mühendisliği lisans eğitimiyle başlamıştır.",
  "Lisans sonrasında aynı üniversitede Kontrol ve Bilgisayar programında yüksek lisansını tamamlamış, ardından University of Florida'da bir ağ projesinde görev almıştır. Marmara Üniversitesi'nde Modern İşletme Yönetimi sertifika programını bitirmiş; doktorasını ise İstanbul Sabahattin Zaim Üniversitesi'nde Siyaset Bilimi ve Uluslararası İlişkiler alanında tamamlamıştır. İki yıl sonra da yine Siyaset Sosyolojisi alanında Doçentlik ünvanını almıştır.",
  "Doktora tezinde Türkiye'nin iki ana siyasi parti üyelerinin siyasi katılım düzeyleri ve parti içi demokrasiye dair tutumlarını hem nitel hem nicel yöntemlerle incelemiştir. Akademik ilgi alanları arasında dijital çağda siyaset, yapay zeka ve demokrasi ilişkisi, yeni toplumsal hareketler ve dijital diplomasi öne çıkmaktadır.",
  "İngilizce ve Osmanlıca bilen Doç. Dr. Albayrak, evli ve üç çocuk babasıdır.",
];

const educationCards: EducationItem[] = [
  {
    degree: "Doktora",
    field: "Siyaset Bilimi ve Uluslararası İlişkiler",
    school: "İstanbul Sabahattin Zaim Üniversitesi",
    years: "2016–2020",
    thesis: "Siyaset Bilimi ve Uluslararası İlişkiler Bölümü",
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
  {
    degree: "Doçentlik",
    field: "Siyaset Sosyolojisi",
    school: "ÜAK Temel Alan: Sosyal, Beşeri ve İdari Bilimler / Bilim Alanı: Siyaset Bilimi",
    years: "2023",
    thesis: "Doçentlik Ünvanı",
  },
];

const academicRoles: RecordItem[] = [
  {
    title: "DOÇENT",
    organization: "BEZM-İ ÂLEM VAKIF ÜNİVERSİTESİ / SAĞLIK BİLİMLERİ FAKÜLTESİ / SAĞLIK YÖNETİMİ BÖLÜMÜ",
    startDate: "15.10.2024",
    endDate: "15.02.2025",
  },
  {
    title: "DOKTOR ÖĞRETİM ÜYESİ",
    organization: "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    details: "Siyaset Bilimi ve Uluslararası İlişkiler PR. (Tam Burslu)",
    startDate: "01.09.2021",
    endDate: "19.03.2024",
  },
];

const adminRoles: RecordItem[] = [
  {
    title: "Bölüm Başkan Yardımcısı",
    organization: "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    scope: "Türkiye",
    startDate: "02.12.2022",
    endDate: "01.03.2023",
  },
];

const externalExperiences: RecordItem[] = [
  {
    title: "ÜNDER-Üniversite Öğretim Elemanları Dayanışma Derneği",
    role: "Yüksek İstişare Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "20.10.2024",
  },
  {
    title: "Türkiye Dil ve Edebiyat Derneği",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "01.06.2022",
  },
  {
    title: "İstanbul Ticaret Odası",
    role: "Meclis Üyesi",
    scope: "Türkiye",
    startDate: "15.10.2022",
  },
  {
    title: "1773 İstanbul Teknik Üniversitesi Teknopark A.Ş.",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "08.12.2022",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "Girişimcilik Çalışma Grubu Başkanı",
    scope: "Belçika",
    startDate: "01.01.2011",
    endDate: "01.01.2013",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "İstanbul Temsilcisi",
    scope: "Belçika",
    startDate: "01.01.2009",
    endDate: "01.01.2011",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2018",
    endDate: "01.01.2022",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2009",
    endDate: "01.01.2013",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2004",
    endDate: "01.01.2009",
  },
];

const courses: CourseItem[] = [
  { title: "Sağlık Yönetiminde İstatistik", language: "Türkçe", term: "Güz", academicYear: "2024-2025", level: "Lisans" },
  { title: "Dijital Çağda Toplum", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Lisans" },
  { title: "Türk Siyasal Hayatı", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Lisans" },
  { title: "Sosyal Bilimlerde Matematik", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Lisans" },
  { title: "Toplum Bilimde Temel Kavramlar", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Lisans" },
  { title: "Bitirme Projesi", language: "Türkçe", term: "Bahar", academicYear: "2022-2023", level: "Lisans" },
  { title: "Siyasal İletişim", language: "Türkçe", term: "Bahar", academicYear: "2022-2023", level: "Lisans" },
  { title: "Uluslararası İlişkilere Giriş", language: "Türkçe", term: "Bahar", academicYear: "2022-2023", level: "Lisans" },
  { title: "Bilişim Teknolojileri", language: "Türkçe", term: "Bahar", academicYear: "2022-2023", level: "Lisans" },
  { title: "Dijital Çağda Toplum", language: "Türkçe", term: "Güz", academicYear: "2022-2023", level: "Lisans" },
  { title: "Sosyal Bilimlerde İstatistik", language: "Türkçe", term: "Güz", academicYear: "2022-2023", level: "Lisans" },
  { title: "Toplum Bilimde Temel Kavramlar", language: "Türkçe", term: "Güz", academicYear: "2022-2023", level: "Lisans" },
  { title: "Dijital Çağda Siyaset", language: "Türkçe", term: "Bahar", academicYear: "2021-2022", level: "Lisans" },
  { title: "Siyasi Kültür ve Demokrasi", language: "Türkçe", term: "Bahar", academicYear: "2021-2022", level: "Lisans" },
  { title: "Uluslararası İlişkilere Giriş", language: "Türkçe", term: "Bahar", academicYear: "2021-2022", level: "Lisans" },
  { title: "Sosyal Bilimlerde İstatistik", language: "Türkçe", term: "Güz", academicYear: "2021-2022", level: "Lisans" },
  { title: "Toplum Bilimde Temel Kavramlar", language: "Türkçe", term: "Güz", academicYear: "2021-2022", level: "Lisans" },
  { title: "Siyasi Kültür ve Demokrasi", language: "Türkçe", term: "Bahar", academicYear: "2020-2021", level: "Lisans" },
  { title: "Uluslararası İlişkilere Giriş", language: "Türkçe", term: "Bahar", academicYear: "2020-2021", level: "Lisans" },
  { title: "Term Project", language: "İngilizce", term: "Bahar", academicYear: "2023-2024", level: "Yüksek Lisans" },
  { title: "Term Project", language: "İngilizce", term: "Bahar", academicYear: "2021-2022", level: "Yüksek Lisans" },
  { title: "Business Statistics", language: "İngilizce", term: "Bahar", academicYear: "2021-2022", level: "Yüksek Lisans" },
  { title: "Business Statistics", language: "İngilizce", term: "Güz", academicYear: "2021-2022", level: "Yüksek Lisans" },
  { title: "Araştırma ve Yayın Etiği", language: "Türkçe", term: "Bahar", academicYear: "2022-2023", level: "Doktora" },
  { title: "Araştırma ve Yayın Etiği", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Doktora" },
  { title: "Araştırma ve Yayın Etiği", language: "Türkçe", term: "Bahar", academicYear: "2021-2022", level: "Doktora" },
  { title: "Araştırma ve Yayın Etiği", language: "Türkçe", term: "Güz", academicYear: "2022-2023", level: "Doktora" },
  { title: "Araştırma ve Yayın Etiği", language: "Türkçe", term: "Güz", academicYear: "2023-2024", level: "Doktora" },
];

const projectRoles: RecordItem[] = [
  {
    title: "Sanayi Politikaları ve Teknoloji Yönetimi Gençlik Çalışanları Hareketliliği",
    scope: "Avrupa Birliği",
    details:
      "Araştırmacı: Egehan Özkan Alakaş, Cengiz Akyıldız, Eyüp Vural Aydın, Hamide Arslan, Yusuf Ceylan, Mehmet Saim Aşçı, Pınar Başar, Tuncel Öz, Yahya Fidan, Merve Arslan, Orhan Albayrak, Sabri Öz.",
  },
];

const articles: RecordItem[] = [
  { title: "Siyasetin Finansmanı", year: "2023", venue: "Süleyman Demirel Üniversitesi Fen-Edebiyat Fakültesi Sosyal Bilimler Dergisi", scope: "TR DİZİN" },
  { title: "Çevrecilik Neden Muhafazakâr Düşüncelerle İlişkilidir? Ve Yeşil Muhafazakârlıkla İlişkili Bir Bilişsel Duygusal (CAM) Haritalama Örneği", year: "2023", venue: "Avrasya Bilimler Akademisi Sosyal Bilimler Dergisi", scope: "Diğer endeksler" },
  { title: "Pandemi Sürecinde Eğitim", year: "2021", venue: "Mimar Mühendisler Grubu Dergisi", scope: "Endekste taranmıyor" },
  { title: "Japonya'da Eğitim Sistemi ve Mesleki Eğitime Farklı Bir Bakış: Japonya Örneği", year: "2020", venue: "Mimar Mühendisler Grubu Dergisi", scope: "Endekste taranmıyor" },
  { title: "Eğitim ve Mesleki Eğitim, Sorunları ve Çözüm Önerileri, Mesleği Eğitimin Cazip Hale Gelmesi İçin Bir Öneri", year: "2020", venue: "Mimar Mühendisler Grubu Dergisi", scope: "Endekste taranmıyor" },
  { title: "Comparing Political Participation Levels of Party Members Within the Two Main Parties of Turkey Based on Their Media Usage and Expectations", year: "2021", venue: "Journal of Political Science and International Relations", scope: "Diğer endeksler" },
  { title: "Dijital Diplomasi: Diplomasi 3.0", year: "2023", venue: "İstanbul Ticaret Üniversitesi Sosyal Bilimler Dergisi", scope: "TR DİZİN" },
  { title: "Türkiye'de Okul Özerkliği ve Özgürlükçü Eğitim Anlayışı", year: "2021", venue: "Alanyazın Dergisi", scope: "Diğer endeksler" },
];

const books: RecordItem[] = [
  { title: "Demokrasi ve Etkin Yurttaşlık", year: "2025", venue: "Yeni Medya Aracılığıyla Dijital Demokrasi ve Siyasi Katılımın Dönüşümü", scope: "Ulusal" },
  { title: "Geleceğin Koridorları", year: "2023", venue: "Küresel Güney'de Siyasetçi Olmanın Zorlukları", scope: "Uluslararası" },
  { title: "Yapay Zekâyla Demokrasi Üzerine Söyleşi: Sesli Sorular, Dijital Cevaplar", year: "2023", scope: "Uluslararası" },
  { title: "Dijital Çağda Siyaset", year: "2023", scope: "Uluslararası" },
  { title: "Eastern and Western Ethicians: A Critical Comparison", year: "2022", venue: "Meta-Politics and Ethics", scope: "Uluslararası" },
  { title: "Teoriden Pratiğe Türkiye Siyaseti", year: "2021", venue: "Saha Çalışmaları ve Etik İlkelerin AK Parti'nin Seçim Sonuçları Üzerindeki Etkileri", scope: "Uluslararası" },
  { title: "Parti Üyelerinin Siyasi Katılımı", year: "2021", scope: "Uluslararası" },
];

const symposiums: RecordItem[] = [
  {
    title: "Political participation levels of party members: The Case of AK Party and CHP in Istanbul",
    role: "Sözlü Sunum",
    year: "12-16.07.2025",
    venue: "28th IPSA World Congress of Political Science, Seoul",
    scope: "Uluslararası",
  },
  {
    title: "Dijital Demokrasi ve Siyasi Katılım",
    role: "Sözlü Sunum",
    year: "24.10.2024",
    venue: "II. Politik Psikoloji Sempozyumu - Demokrasi ve Etkin Yurttaşlık",
    scope: "Ulusal",
  },
  {
    title: "Digital Political Polarization and Ways to Prevent It",
    role: "Sözlü Sunum",
    year: "12.08.2023",
    venue: "10th International Congress on Humanities and Social Sciences in a Changing World",
    scope: "Uluslararası",
  },
  {
    title: "Technology: Threat or Opportunity for the Future of Democracy?",
    role: "Sözlü Sunum",
    year: "12.10.2023",
    venue: "Digital Diplomacy: Trends & Features",
    scope: "Uluslararası",
  },
  {
    title: "Party members' attitudes toward their own leaders",
    role: "Sözlü Sunum",
    year: "20.11.2021",
    venue: "I. International Artuklu Congress on Economic Administrative and Political Sciences",
    scope: "Uluslararası",
  },
  {
    title: "Metaverse-Politics and Ethics",
    role: "Sözlü Sunum",
    year: "11.11.2022",
    venue: "International Social Sciences Congress in the Age of Digital Transformation",
    scope: "Uluslararası",
  },
  {
    title: "Türkiye'de Okul Özerkliği ve Özgürlükçü Eğitim Anlayışı",
    role: "Sözlü Sunum",
    year: "23.06.2021",
    venue: "2023 Vizyonu, Salgın Krizi ve Dijitalleşme Bağlamında Okul Özerkliği",
    scope: "Uluslararası",
  },
];

const editors: RecordItem[] = [
  {
    title: "GÖÇ VE KÜLTÜREL ETKİLEŞİM (Migration and Cultural Interaction)",
    role: "Editör",
    year: "2019",
    scope: "Uluslararası",
    details: "Avustralya National Univ ve Sabahattin Zaim Üniv. görev yapan Prof. Dr. M. Mehdi İlha...",
  },
];

const certificates: RecordItem[] = [
  {
    title: "Digital Diplomacy and Inclusive Peace Studies for Youth",
    role: "Konuşmalarım",
    scope: "Uluslararası",
    venue: "İstanbul",
    year: "03.10.2023",
  },
  {
    title: "Marmara Üniversitesi-İşletme Bilimleri Uygulama ve Araştırma Merkezi",
    role: "Sertifika",
    scope: "Ulusal",
    venue: "İstanbul",
    year: "24.06.2000",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "Sertifika",
    scope: "Uluslararası",
    venue: "İstanbul",
    year: "03.06.2010",
  },
  {
    title: "InCites Benchmarking and Analytics",
    role: "Seminer",
    scope: "Uluslararası",
    venue: "İstanbul",
    year: "22.09.2021",
  },
];

const memberships: RecordItem[] = [
  {
    title: "INTERNATIONAL POLITICAL SCIENCE ASSOCIATION",
    role: "Üye",
    year: "2025",
    details: "Bilimsel Kuruluş",
  },
  {
    title: "İstanbul Teknik Üniversitesi Teknopark A.Ş.",
    role: "Yönetim Kurulu Üyesi",
    year: "2022",
    details: "Bilimsel Kuruluş",
  },
];

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
    if (ref.current) {
      observer.observe(ref.current);
    }
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

function SubsectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-4 mt-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
      {title}
    </h3>
  );
}

function RecordCards({ items }: { items: RecordItem[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={`${item.title}-${item.year ?? item.startDate ?? "x"}`} className="w-full min-w-0 overflow-hidden bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm">
          <p className="font-semibold text-[#1e3a5f] leading-snug break-words min-w-0">{item.title}</p>
          {item.organization && <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words min-w-0">{item.organization}</p>}
          <div className="mt-2 space-y-1 text-sm text-gray-500 leading-relaxed break-words min-w-0">
            {item.role && <p>Görev: {item.role}</p>}
            {item.venue && <p>Yer/Etkinlik: {item.venue}</p>}
            {item.scope && <p>Kapsam: {item.scope}</p>}
            {item.year && <p>Tarih/Yıl: {item.year}</p>}
            {(item.startDate || item.endDate) && (
              <p>
                Süre: {item.startDate ?? "-"} {item.endDate ? `- ${item.endDate}` : ""}
              </p>
            )}
            {item.details && <p>{item.details}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hakkinda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hakkinda", label: "Hakkında" },
    { id: "egitim", label: "Eğitim" },
    { id: "kariyer", label: "Kariyer" },
    { id: "yayinlar", label: "Yayınlar" },
    { id: "iletisim", label: "İletişim" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
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
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = window.innerWidth < 768 ? 76 : 84;
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const lisansCourses = courses.filter((course) => course.level === "Lisans");
  const yuksekLisansCourses = courses.filter((course) => course.level === "Yüksek Lisans");
  const doktoraCourses = courses.filter((course) => course.level === "Doktora");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'DM Serif Display', serif" }}>
              OA
            </div>
            <span className="font-semibold text-[#1e3a5f] hidden sm:block text-sm">Doç. Dr. Orhan Albayrak</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === item.id ? "text-[#1e3a5f] font-semibold" : "text-gray-500 hover:text-[#1e3a5f]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 text-[#1e3a5f]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 text-sm rounded-md ${activeSection === item.id ? "bg-[#1e3a5f] text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section
        id="hakkinda"
        className="relative min-h-screen flex items-center pt-16 scroll-mt-24"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-transparent" />
        <div className="container relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-[#c9a227] font-medium text-sm tracking-widest uppercase mb-4">Akademisyen · Araştırmacı · Yazar</p>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Doç. Dr.
                <br />
                Orhan
                <br />
                Albayrak
              </h1>
              <div className="gold-line w-24 mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                Elektronik Mühendisliği'nden Siyaset Bilimine uzanan çok disiplinli bir akademik profil. Dijital çağda siyaset, yapay zeka ve demokrasi üzerine araştırmalar.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("yayinlar")} className="bg-[#c9a227] hover:bg-[#b8911f] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <BookOpen size={18} />
                  Yayınlarım
                </button>
                <button onClick={() => scrollTo("iletisim")} className="border border-white/50 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Mail size={18} />
                  İletişim
                </button>
              </div>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-2xl overflow-hidden border-4 border-[#c9a227]/50 shadow-2xl">
                  <img src={PROFILE_IMG} alt="Doç. Dr. Orhan Albayrak" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#c9a227] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                  ORCID: 0000-0002-1937-6011
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown size={28} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2">
                <SectionTitle title="Hakkında" subtitle="Akademik Profil" />
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {aboutParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
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
                      <a href="https://orcid.org/0000-0002-1937-6011" target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] hover:text-[#c9a227] transition-colors">
                        0000-0002-1937-6011
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="egitim" className="py-20 bg-[#f8f9fc] scroll-mt-24">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="Eğitim" subtitle="Akademik Geçmiş" />
            <div className="grid md:grid-cols-2 gap-6">
              {educationCards.map((edu) => (
                <div key={`${edu.degree}-${edu.years}`} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center shrink-0">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold bg-[#c9a227]/15 text-[#c9a227] px-2 py-0.5 rounded-full">{edu.degree}</span>
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

      <section id="kariyer" className="py-20 bg-white scroll-mt-24">
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle title="Kariyer" subtitle="Mesleki Deneyim ve Görevler" />

            <div className="space-y-4">
              <SubsectionTitle title="Akademik Görev" />
              <RecordCards items={academicRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="İdari Görev" />
              <RecordCards items={adminRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Üniversite Dışı Deneyim" />
              <RecordCards items={externalExperiences} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Verdiği Dersler" />
              <div className="space-y-7">
                {[
                  { label: "Lisans", data: lisansCourses },
                  { label: "Yüksek Lisans", data: yuksekLisansCourses },
                  { label: "Doktora", data: doktoraCourses },
                ].map((group) => (
                  <div key={group.label}>
                    <h4 className="text-xl font-semibold text-[#1e3a5f] mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>{group.label}</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {group.data.map((course) => (
                        <div key={`${course.title}-${course.academicYear}-${course.term}`} className="bg-[#f8f9fc] rounded-xl border border-gray-100 p-3">
                          <p className="font-medium text-[#1e3a5f] text-base leading-snug break-words">{course.title}</p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {course.language} · {course.term} · {course.academicYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-8 md:mt-10">
              <SubsectionTitle title="Proje Görevleri" />
              <RecordCards items={projectRoles} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="yayinlar" className="py-20 bg-[#f8f9fc] scroll-mt-24">
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle title="Yayınlar" subtitle="Akademik Çalışmalar" />

            <div className="space-y-4">
              <SubsectionTitle title="Makale" />
              <RecordCards items={articles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Kitaplarım" />
              <RecordCards items={books} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Tebliğ (Bildiri)" />
              <RecordCards items={symposiums} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Editörlük" />
              <RecordCards items={editors} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Araştırma, Kurs, Sertifika" />
              <RecordCards items={certificates} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title="Üyelik" />
              <RecordCards items={memberships} />
            </div>
          </AnimatedSection>
        </div>
      </section>

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
              Yaklaşık <strong className="text-[#c9a227]">20.000 kişiye</strong> istihdam sağlayan Özel İdare Meslek Kursları projesi, Malezya'da düzenlenen{" "}
              <strong className="text-[#c9a227]">Dünya Ticaret Odaları Proje Yarışması</strong>'nda dünya birincisi seçilmiştir.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section id="iletisim" className="py-20 bg-white scroll-mt-24">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title="İletişim" subtitle="Akademik İşbirliği ve Ulaşım" />
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">Akademik işbirliği, konferans davetleri veya araştırma projeleri için aşağıdaki kanallar üzerinden iletişime geçebilirsiniz.</p>
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

              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-[#1e3a5f] mb-5 text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Üyelikler & Bağlantılar
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Bezmialem Vakıf Üniversitesi", role: "Doçent Doktor", url: "https://bezmialem.edu.tr" },
                    { name: "TDED – Türkiye Dil ve Edebiyat Derneği", role: "Yönetim Kurulu Üyesi", url: "https://www.tded.org.tr" },
                    { name: "İstanbul Ticaret Odası", role: "Meclis Üyesi", url: "https://www.ito.org.tr" },
                    { name: "İTÜ 1773 Teknopark A.Ş.", role: "Yönetim Kurulu Üyesi", url: "#" },
                    { name: "FGA Vakfı", role: "Mütevelli Heyet Başkanı", url: "#" },
                  ].map((aff) => (
                    <div key={aff.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
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
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/40 text-xs">© 2026 Doç. Dr. Orhan Albayrak. Tüm hakları saklıdır.</div>
        </div>
      </footer>
    </div>
  );
}
