import { translations, type Language } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Facebook,
  FileText,
  Globe,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import {
  SinglePageDock,
  DOCK_ITEMS,
  type SectionId,
} from "@/components/nav/SinglePageDock";
import { MobileSidebar } from "@/components/nav/MobileSidebar";
import { ContactForm } from "@/components/site/ContactForm";
import { ItoMonthlySection } from "@/components/ItoMonthlySection";
import { CollaborationsSection } from "@/components/CollaborationsSection";
import { RadioGardenModal } from "@/components/RadioGardenModal";
import { CursorGrid } from "@/components/ui/cursor-grid";
import { useLanguage } from "@/contexts/LanguageContext";

const BOOKS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/books_bg-mJy7EiwSBa2fHWSKnAz6t2.webp";
const PROFILE_IMG = "/images/oalbayrak_ito_hero.jpg";

const TWITTER_URL = "https://x.com/OrAlbayrak";
const LINKEDIN_URL = "https://www.linkedin.com/in/orhan-albayrak/?locale=en";
const FACEBOOK_URL = "https://www.facebook.com/doc.dr.orhanalbayrak";
const INSTAGRAM_URL = "https://www.instagram.com/doc.dr.orhanalbayrak/";
const NSOSYAL_URL = "https://nsosyal.com/drorhanalbayrak";

type EducationItem = {
  degree: string;
  field: string;
  school: string;
  years: string;
  thesis: string;
  logo?: string;
  diplomaUrl?: string;
};

type CourseItem = {
  title: string;
  language: string;
  term: string;
  academicYear: string;
  level:
    | "Lisans"
    | "Yüksek Lisans"
    | "Doktora"
    | "Undergraduate"
    | "Master's"
    | "Ph.D.";
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
  /** Kitap bölümü çalışmalarında bölümün adı (kitabın adı `title` alanında durur). */
  chapter?: string;
  publisher?: string;
  editor?: string;
  edition?: string;
  pages?: string;
  isbn?: string;
  /** Yalnızca DOI son eki; kartta https://doi.org/ ön ekiyle bağlantıya dönüşür. */
  doi?: string;
  /** Dergi künyesi: cilt(sayı), sayfa aralığı. */
  citation?: string;
  language?: string;
  logo?: string;
  rightImage?: string;
  url?: string;
};

const aboutParagraphs = [
  "Doç. Dr. Orhan Albayrak, 1960 yılında Trabzon'un Arsin ilçesinde doğmuştur. İlk, orta ve lise eğitimini Erzurum'da tamamladıktan sonra kariyerine İstanbul Teknik Üniversitesi'nde Elektronik ve Haberleşme Mühendisliği lisans eğitimiyle başlamıştır.",
  "Lisans sonrasında aynı üniversitede Kontrol ve Bilgisayar programında yüksek lisansını tamamladı, Marmara Üniversitesi'nde Modern İşletme Yönetimi sertifika programını bitirdi; doktorasını ise İstanbul Sabahattin Zaim Üniversitesi'nde Siyaset Bilimi ve Uluslararası İlişkiler alanında yaptı. Üç yıl sonra da yine Siyaset Sosyolojisi alanında Doçentlik ünvanını aldı. 1982-1984 yılları arasında TÜBİTAK Gebze'de Elektronik Araştırma Bölümünde çalıştı. Arkasından ABD'de Gainesville'de University of Florida'da 2 yıl bir ağ projesinde mühendis olarak görev aldı. 2009-2014 yılları arasında İstanbul İl Genel Meclis Üyeliği ve Meclis Başkan Vekilliği görevinde bulundu. Aynı dönemde Assembly of Europe Region (AER) 'de İstanbul Temsilciliği ve Girişimcilik Çalışma Grubu Başkanlığı yaptı. Halen ITO, 1773 İTÜ Teknopark, TDED YK ve FGA Vakfı görevleri devam etmektedir.",
  "Doktora tezinde Türkiye'nin iki ana siyasi parti üyelerinin siyasi katılım düzeyleri ve parti içi demokrasiye dair tutumlarını hem nitel hem nicel yöntemlerle inceledi. İlgi alanları arasında dijital çağda siyaset, yapay zeka ve demokrasi ilişkisi, yeni toplumsal hareketler ve dijital diplomasi öne çıkmaktadır. Lise ve üniversite yıllarında lisanslı basketbol oynadı. İyi derecede masa tenisi oynamayı bilmektedir.",
  "İngilizce ve Osmanlıca bilen Doç. Dr. Albayrak, evli ve üç çocuk babasıdır.",
];

const educationCardsTr: EducationItem[] = [
  {
    degree: "Doçentlik",
    field: "Siyaset Sosyolojisi",
    school:
      "ÜAK Temel Alan: Sosyal, Beşeri ve İdari Bilimler / Bilim Alanı: Siyaset Bilimi",
    years: "2023",
    thesis: "Doçentlik Ünvanı",
    logo: "/images/uak-logo.png",
  },
  {
    degree: "Doktora",
    field: "Siyaset Bilimi ve Uluslararası İlişkiler",
    school: "İstanbul Sabahattin Zaim Üniversitesi",
    years: "2016–2020",
    thesis:
      'Tez: "Parti üyelerinin siyasi katılım düzeyi: İstanbul Ak Parti ve CHP örneği" (29.09.2020) — Danışman: Prof. Dr. Ömer Çaha',
    logo: "/images/izu-logo.png",
  },
  {
    degree: "Yüksek Lisans",
    field: "Modern İşletme Yönetimi",
    school: "Marmara Üniversitesi",
    years: "1999–2000",
    thesis: "Sertifika Programı",
    logo: "/images/marmara-logo.png",
  },
  {
    degree: "Yüksek Lisans",
    field: "Kontrol ve Bilgisayar Mühendisliği",
    school: "İstanbul Teknik Üniversitesi",
    years: "1982–1984",
    thesis: "Kontrol ve Bilgisayar Programı",
    logo: "/images/itu-logo.png",
    diplomaUrl: "/images/yuksek-lisans-diploma.png",
  },
  {
    degree: "Lisans",
    field: "Elektronik ve Haberleşme Mühendisliği",
    school: "İstanbul Teknik Üniversitesi",
    years: "1977–1982",
    thesis: "Elektronik ve Haberleşme Fakültesi",
    logo: "/images/itu-logo.png",
  },
];

const educationCardsEn: EducationItem[] = [
  {
    degree: "Associate Professorship",
    field: "Political Sociology",
    school:
      "UAK Field: Social, Human and Administrative Sciences / Subfield: Political Science",
    years: "2023",
    thesis: "Associate Professor Title",
    logo: "/images/uak-logo.png",
  },
  {
    degree: "Ph.D.",
    field: "Political Science and International Relations",
    school: "Istanbul Sabahattin Zaim University",
    years: "2016–2020",
    thesis:
      'Dissertation: "Political participation level of party members: The case of Ak Party and CHP in Istanbul" (29.09.2020) — Advisor: Prof. Dr. Ömer Çaha',
    logo: "/images/izu-logo.png",
  },
  {
    degree: "Master's Degree",
    field: "Modern Business Management",
    school: "Marmara University",
    years: "1999–2000",
    thesis: "Certificate Program",
    logo: "/images/marmara-logo.png",
  },
  {
    degree: "Master's Degree",
    field: "Control and Computer Engineering",
    school: "Istanbul Technical University",
    years: "1982–1984",
    thesis: "Control and Computer Program",
    logo: "/images/itu-logo.png",
    diplomaUrl: "/images/yuksek-lisans-diploma.png",
  },
  {
    degree: "Bachelor's Degree",
    field: "Electronics and Communication Engineering",
    school: "Istanbul Technical University",
    years: "1977–1982",
    thesis: "Faculty of Electronics and Communication",
    logo: "/images/itu-logo.png",
  },
];

const academicRolesTr: RecordItem[] = [
  {
    title: "DOÇENT",
    organization:
      "BEZM-İ ÂLEM VAKIF ÜNİVERSİTESİ / SAĞLIK BİLİMLERİ FAKÜLTESİ / SAĞLIK YÖNETİMİ BÖLÜMÜ",
    startDate: "15.10.2024",
    details: "Hâlen devam ediyor.",
    logo: "/images/bezmialem-logo.png",
    url: "https://bezmialem.edu.tr",
  },
  {
    title: "DOKTOR ÖĞRETİM ÜYESİ",
    organization:
      "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    details: "Siyaset Bilimi ve Uluslararası İlişkiler PR. (Tam Burslu)",
    startDate: "01.09.2021",
    endDate: "19.03.2024",
    logo: "/images/halic-logo.png",
    url: "https://halic.edu.tr",
  },
];

const academicRolesEn: RecordItem[] = [
  {
    title: "ASSOCIATE PROFESSOR",
    organization:
      "BEZMIALEM VAKIF UNIVERSITY / FACULTY OF HEALTH SCIENCES / DEPARTMENT OF HEALTH MANAGEMENT",
    startDate: "15.10.2024",
    details: "Ongoing.",
    logo: "/images/bezmialem-logo.png",
    url: "https://bezmialem.edu.tr",
  },
  {
    title: "ASSISTANT PROFESSOR",
    organization:
      "HALIC UNIVERSITY / FACULTY OF BUSINESS / DEPARTMENT OF POLITICAL SCIENCE AND INTERNATIONAL RELATIONS",
    details: "Political Science and International Relations Program (Full Scholarship)",
    startDate: "01.09.2021",
    endDate: "19.03.2024",
    logo: "/images/halic-logo.png",
    url: "https://halic.edu.tr",
  },
];

const adminRolesTr: RecordItem[] = [
  {
    title: "Bölüm Başkan Yardımcısı",
    organization:
      "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    scope: "Türkiye",
    startDate: "02.12.2022",
    endDate: "01.03.2023",
    logo: "/images/halic-logo.png",
    url: "https://halic.edu.tr",
  },
];

const adminRolesEn: RecordItem[] = [
  {
    title: "Vice Department Head",
    organization:
      "HALIC UNIVERSITY / FACULTY OF BUSINESS / DEPARTMENT OF POLITICAL SCIENCE AND INTERNATIONAL RELATIONS",
    scope: "Turkey",
    startDate: "02.12.2022",
    endDate: "01.03.2023",
    logo: "/images/halic-logo.png",
    url: "https://halic.edu.tr",
  },
];

const externalExperiencesTr: RecordItem[] = [
  {
    title: "ADF – İleri Teknoloji Fonu",
    role: "Yönetim Kurulu Üyesi",
    scope: "Ticari (Özel)",
    startDate: "01.03.2026",
  },
  {
    title: "ÜNDER-Üniversite Öğretim Elemanları Dayanışma Derneği",
    role: "Yüksek İstişare Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "20.10.2024",
    logo: "/images/under-logo.png",
    url: "http://www.under.org.tr",
  },
  {
    title: "1773 İstanbul Teknik Üniversitesi Teknopark A.Ş.",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "08.12.2022",
    logo: "/images/itu-logo.png",
    url: "https://1773ituteknopark.com",
  },
  {
    title: "İstanbul Ticaret Odası",
    role: "Meclis Üyesi – Eğitim Meslek Komitesi",
    scope: "Mesleki Dernekler",
    startDate: "15.10.2022",
    logo: "/images/ito-logo.png",
    url: "https://www.ito.org.tr",
  },
  {
    title: "Türkiye Dil ve Edebiyat Derneği",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "01.06.2022",
    logo: "/images/tded-logo.png",
    url: "https://www.tded.org.tr",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2018",
    endDate: "01.01.2022",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "İstanbul Ticaret Odası",
    role: "Meclis Üyesi, Eğitim Komitesi Üyesi",
    scope: "Mesleki Dernekler",
    startDate: "15.10.2018",
    endDate: "15.10.2022",
    details: "8000 eğitim kurumunu temsilen seçilmiş meclis üyesi.",
    logo: "/images/ito-logo.png",
    url: "https://www.ito.org.tr",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "Girişimcilik Çalışma Grubu Başkanı",
    scope: "Belçika",
    startDate: "01.01.2011",
    endDate: "01.01.2013",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "İstanbul Temsilcisi",
    scope: "Belçika",
    startDate: "01.01.2009",
    endDate: "01.01.2011",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2009",
    endDate: "01.01.2013",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2004",
    endDate: "01.01.2009",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "Florida Üniversitesi",
    role: "Ağ Mühendisi",
    scope: "Gainesville, Florida, Amerika",
    startDate: "01.06.1984",
    endDate: "01.03.1986",
    logo: "/images/uf-logo.svg",
    url: "https://www.ufl.edu",
  },
];

const externalExperiencesEn: RecordItem[] = [
  {
    title: "ADF – Advanced Technology Fund",
    role: "Board Member",
    scope: "Commercial (Private)",
    startDate: "01.03.2026",
  },
  {
    title: "UNDER-Association of University Academic Staff Solidarity",
    role: "Member of High Advisory Board",
    scope: "Turkey",
    startDate: "20.10.2024",
    logo: "/images/under-logo.png",
    url: "http://www.under.org.tr",
  },
  {
    title: "1773 Istanbul Technical University Technopark Inc.",
    role: "Board Member",
    scope: "Turkey",
    startDate: "08.12.2022",
    logo: "/images/itu-logo.png",
    url: "https://1773ituteknopark.com",
  },
  {
    title: "Istanbul Chamber of Commerce",
    role: "Assembly Member – Education Professional Committee",
    scope: "Professional Associations",
    startDate: "15.10.2022",
    logo: "/images/ito-logo.png",
    url: "https://www.ito.org.tr",
  },
  {
    title: "Turkish Language and Literature Association",
    role: "Board Member",
    scope: "Turkey",
    startDate: "01.06.2022",
    logo: "/images/tded-logo.png",
    url: "https://www.tded.org.tr",
  },
  {
    title: "Istanbul Commerce University",
    role: "Member of the Board of Trustees",
    scope: "Turkey",
    startDate: "01.01.2018",
    endDate: "01.01.2022",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "Istanbul Chamber of Commerce",
    role: "Assembly Member, Education Committee Member",
    scope: "Professional Associations",
    startDate: "15.10.2018",
    endDate: "15.10.2022",
    details: "Elected assembly member representing 8,000 educational institutions.",
    logo: "/images/ito-logo.png",
    url: "https://www.ito.org.tr",
  },
  {
    title: "AER (Assembly of European Regions)",
    role: "President of Entrepreneurship Working Group",
    scope: "Belgium",
    startDate: "01.01.2011",
    endDate: "01.01.2013",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
  {
    title: "AER (Assembly of European Regions)",
    role: "Istanbul Representative",
    scope: "Belgium",
    startDate: "01.01.2009",
    endDate: "01.01.2011",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
  {
    title: "Istanbul Commerce University",
    role: "Member of the Board of Trustees",
    scope: "Turkey",
    startDate: "01.01.2009",
    endDate: "01.01.2013",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "Istanbul Commerce University",
    role: "Member of the Board of Trustees",
    scope: "Turkey",
    startDate: "01.01.2004",
    endDate: "01.01.2009",
    logo: "/images/ticaret-uni-logo.png",
    url: "https://www.ticaret.edu.tr",
  },
  {
    title: "University of Florida",
    role: "Network Engineer",
    scope: "Gainesville, Florida, USA",
    startDate: "01.06.1984",
    endDate: "01.03.1986",
    logo: "/images/uf-logo.svg",
    url: "https://www.ufl.edu",
  },
];

const coursesTr: CourseItem[] = [
  {
    title: "Sağlık Yönetiminde İstatistik",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2024-2025",
    level: "Lisans",
  },
  {
    title: "Dijital Çağda Toplum",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Lisans",
  },
  {
    title: "Türk Siyasal Hayatı",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Lisans",
  },
  {
    title: "Sosyal Bilimlerde Matematik",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Lisans",
  },
  {
    title: "Toplum Bilimde Temel Kavramlar",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Lisans",
  },
  {
    title: "Bitirme Projesi",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Siyasal İletişim",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Uluslararası İlişkilere Giriş",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Bilişim Teknolojileri",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Dijital Çağda Toplum",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Sosyal Bilimlerde İstatistik",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Toplum Bilimde Temel Kavramlar",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2022-2023",
    level: "Lisans",
  },
  {
    title: "Dijital Çağda Siyaset",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Lisans",
  },
  {
    title: "Siyasi Kültür ve Demokrasi",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Lisans",
  },
  {
    title: "Uluslararası İlişkilere Giriş",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Lisans",
  },
  {
    title: "Sosyal Bilimlerde İstatistik",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2021-2022",
    level: "Lisans",
  },
  {
    title: "Toplum Bilimde Temel Kavramlar",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2021-2022",
    level: "Lisans",
  },
  {
    title: "Siyasi Kültür ve Demokrasi",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2020-2021",
    level: "Lisans",
  },
  {
    title: "Uluslararası İlişkilere Giriş",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2020-2021",
    level: "Lisans",
  },
  {
    title: "Term Project",
    language: "İngilizce",
    term: "Bahar",
    academicYear: "2023-2024",
    level: "Yüksek Lisans",
  },
  {
    title: "Term Project",
    language: "İngilizce",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Yüksek Lisans",
  },
  {
    title: "Business Statistics (İngilizce)",
    language: "İngilizce",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Yüksek Lisans",
  },
  {
    title: "Business Statistics (İngilizce)",
    language: "İngilizce",
    term: "Güz",
    academicYear: "2021-2022",
    level: "Yüksek Lisans",
  },
  {
    title: "Araştırma ve Yayın Etiği",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2022-2023",
    level: "Doktora",
  },
  {
    title: "Araştırma ve Yayın Etiği",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Doktora",
  },
  {
    title: "Araştırma ve Yayın Etiği",
    language: "Türkçe",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Doktora",
  },
  {
    title: "Araştırma ve Yayın Etiği",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2022-2023",
    level: "Doktora",
  },
  {
    title: "Araştırma ve Yayın Etiği",
    language: "Türkçe",
    term: "Güz",
    academicYear: "2023-2024",
    level: "Doktora",
  },
];

const coursesEn: CourseItem[] = [
  {
    title: "Statistics in Health Management",
    language: "Turkish",
    term: "Fall",
    academicYear: "2024-2025",
    level: "Undergraduate",
  },
  {
    title: "Society in the Digital Age",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Undergraduate",
  },
  {
    title: "Turkish Political Life",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Undergraduate",
  },
  {
    title: "Mathematics in Social Sciences",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Undergraduate",
  },
  {
    title: "Fundamental Concepts in Sociology",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Undergraduate",
  },
  {
    title: "Graduation Project",
    language: "Turkish",
    term: "Spring",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Political Communication",
    language: "Turkish",
    term: "Spring",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Introduction to International Relations",
    language: "Turkish",
    term: "Spring",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Information Technologies",
    language: "Turkish",
    term: "Spring",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Society in the Digital Age",
    language: "Turkish",
    term: "Fall",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Statistics in Social Sciences",
    language: "Turkish",
    term: "Fall",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Fundamental Concepts in Sociology",
    language: "Turkish",
    term: "Fall",
    academicYear: "2022-2023",
    level: "Undergraduate",
  },
  {
    title: "Politics in the Digital Age",
    language: "Turkish",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Undergraduate",
  },
  {
    title: "Political Culture and Democracy",
    language: "Turkish",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Undergraduate",
  },
  {
    title: "Introduction to International Relations",
    language: "Turkish",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Undergraduate",
  },
  {
    title: "Statistics in Social Sciences",
    language: "Turkish",
    term: "Fall",
    academicYear: "2021-2022",
    level: "Undergraduate",
  },
  {
    title: "Fundamental Concepts in Sociology",
    language: "Turkish",
    term: "Fall",
    academicYear: "2021-2022",
    level: "Undergraduate",
  },
  {
    title: "Political Culture and Democracy",
    language: "Turkish",
    term: "Spring",
    academicYear: "2020-2021",
    level: "Undergraduate",
  },
  {
    title: "Introduction to International Relations",
    language: "Turkish",
    term: "Spring",
    academicYear: "2020-2021",
    level: "Undergraduate",
  },
  {
    title: "Term Project",
    language: "English",
    term: "Spring",
    academicYear: "2023-2024",
    level: "Master's",
  },
  {
    title: "Term Project",
    language: "English",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Master's",
  },
  {
    title: "Business Statistics (English)",
    language: "English",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Master's",
  },
  {
    title: "Business Statistics (English)",
    language: "English",
    term: "Fall",
    academicYear: "2021-2022",
    level: "Master's",
  },
  {
    title: "Research and Publication Ethics",
    language: "Turkish",
    term: "Spring",
    academicYear: "2022-2023",
    level: "Ph.D.",
  },
  {
    title: "Research and Publication Ethics",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Ph.D.",
  },
  {
    title: "Research and Publication Ethics",
    language: "Turkish",
    term: "Spring",
    academicYear: "2021-2022",
    level: "Ph.D.",
  },
  {
    title: "Research and Publication Ethics",
    language: "Turkish",
    term: "Fall",
    academicYear: "2022-2023",
    level: "Ph.D.",
  },
  {
    title: "Research and Publication Ethics",
    language: "Turkish",
    term: "Fall",
    academicYear: "2023-2024",
    level: "Ph.D.",
  },
];

const projectRolesTr: RecordItem[] = [
  {
    title:
      "Sanayi Politikaları ve Teknoloji Yönetimi Gençlik Çalışanları Hareketliliği",
    role: "Proje Koordinatörü",
    scope: "Avrupa Birliği · Uluslararası",
    startDate: "03.03.2023",
    endDate: "10.04.2025",
    details:
      "Proje Koordinatörleri: Cengiz Akyıldız, Eyüp Vural Aydın, Hamide Arslan, Orhan Albayrak. Araştırmacılar: Egehan Özkan Alakaş, Yusuf Ceylan, Mehmet Saim Aşçı, Pınar Başar, Tuncel Öz, Yahya Fidan, Merve Arslan, Sabri Öz.",
  },
];

const projectRolesEn: RecordItem[] = [
  {
    title:
      "Industrial Policies and Technology Management Youth Workers Mobility",
    role: "Project Coordinator",
    scope: "European Union · International",
    startDate: "03.03.2023",
    endDate: "10.04.2025",
    details:
      "Project Coordinators: Cengiz Akyıldız, Eyüp Vural Aydın, Hamide Arslan, Orhan Albayrak. Researchers: Egehan Özkan Alakaş, Yusuf Ceylan, Mehmet Saim Aşçı, Pınar Başar, Tuncel Öz, Yahya Fidan, Merve Arslan, Sabri Öz.",
  },
];

const internationalArticlesTr: RecordItem[] = [
  {
    title: "Türkiye'de Okul Özerkliği ve Özgürlükçü Eğitim Anlayışı",
    year: "2021",
    venue: "Alanyazın Dergisi",
    citation: "2(2), 83-90",
    doi: "10.22596/cresjournal",
    scope: "Uluslararası hakemli dergi",
  },
  {
    title:
      "Comparing Political Participation Levels of Party Members Within the Two Main Parties of Turkey Based on Their Media Usage and Expectations",
    year: "2021",
    venue: "Journal of Political Science and International Relations",
    citation: "4(1), 8-17",
    doi: "10.11648/j.jpsir.20210401.12",
    scope: "Uluslararası hakemli dergi",
  },
];

const internationalArticlesEn: RecordItem[] = [
  {
    title: "School Autonomy and Libertarian Educational Perspective in Turkey",
    year: "2021",
    venue: "Alanyazın Dergisi",
    citation: "2(2), 83-90",
    doi: "10.22596/cresjournal",
    scope: "International peer-reviewed journal",
  },
  {
    title:
      "Comparing Political Participation Levels of Party Members Within the Two Main Parties of Turkey Based on Their Media Usage and Expectations",
    year: "2021",
    venue: "Journal of Political Science and International Relations",
    citation: "4(1), 8-17",
    doi: "10.11648/j.jpsir.20210401.12",
    scope: "International peer-reviewed journal",
  },
];

const nationalArticlesTr: RecordItem[] = [
  {
    title: "Dijital Diplomasi 3.0",
    year: "2023",
    venue: "İstanbul Ticaret Üniversitesi Sosyal Bilimler Dergisi",
    citation: "22(46), 493-508",
    doi: "10.46928/iticusbe.1288805",
    scope: "TR DİZİN",
  },
  {
    title: "Siyasetin Finansmanı",
    year: "2023",
    venue:
      "Süleyman Demirel Üniversitesi Fen-Edebiyat Fakültesi Sosyal Bilimler Dergisi",
    citation: "(59), 209-221",
    scope: "TR DİZİN",
  },
  {
    title:
      "Çevrecilik Neden Muhafazakâr Düşüncelerle İlişkilidir? Ve Yeşil Muhafazakârlıkla İlişkili Bir Bilişsel Duygusal (CAM) Haritalama Örneği",
    year: "2023",
    venue: "Avrasya Bilimler Akademisi Sosyal Bilimler Dergisi",
    citation: "(49), 69-85",
    scope: "Ulusal hakemli dergi",
  },
];

const nationalArticlesEn: RecordItem[] = [
  {
    title: "Digital Diplomacy 3.0",
    year: "2023",
    venue: "Istanbul Commerce University Journal of Social Sciences",
    citation: "22(46), 493-508",
    doi: "10.46928/iticusbe.1288805",
    scope: "TR DİZİN (National Index)",
  },
  {
    title: "Financing of Politics",
    year: "2023",
    venue: "Süleyman Demirel University Journal of Social Sciences",
    citation: "(59), 209-221",
    scope: "TR DİZİN (National Index)",
  },
  {
    title:
      "Why is Environmentalism Related to Conservative Thought? And an Example of Cognitive Emotional (CAM) Mapping Related to Green Conservatism",
    year: "2023",
    venue: "Eurasia Academy of Sciences Social Sciences Journal",
    citation: "(49), 69-85",
    scope: "National Peer-Reviewed Journal",
  },
];

const otherPublicationsTr: RecordItem[] = [
  {
    title: "Pandemi Sürecinde Eğitim",
    year: "2021",
    venue: "Mimar Mühendisler Grubu Dergisi",
    citation: "(118), 46-51",
    scope: "Ulusal · Hakemsiz",
  },
  {
    title:
      "Eğitim ve Mesleki Eğitim, Sorunları ve Çözüm Önerileri, Mesleği Eğitimin Cazip Hale Gelmesi İçin Bir Öneri",
    year: "2020",
    venue: "Mimar Mühendisler Grubu Dergisi",
    citation: "(116), 80-96",
    scope: "Ulusal · Hakemsiz",
  },
  {
    title:
      "Japonya'da Eğitim Sistemi ve Mesleki Eğitime Farklı Bir Bakış: Japonya Örneği",
    year: "2020",
    venue: "Mimar Mühendisler Grubu Dergisi",
    citation: "(116), 52-64",
    scope: "Ulusal · Hakemsiz",
  },
];

const otherPublicationsEn: RecordItem[] = [
  {
    title: "Education During the Pandemic Process",
    year: "2021",
    venue: "Journal of Architects and Engineers Group",
    citation: "(118), 46-51",
    scope: "National · Non-Peer-Reviewed",
  },
  {
    title:
      "Education and Vocational Education, Problems and Solution Proposals: A Proposal to Make Vocational Education Attractive",
    year: "2020",
    venue: "Journal of Architects and Engineers Group",
    citation: "(116), 80-96",
    scope: "National · Non-Peer-Reviewed",
  },
  {
    title:
      "Education System in Japan and a Different Perspective on Vocational Education: The Case of Japan",
    year: "2020",
    venue: "Journal of Architects and Engineers Group",
    citation: "(116), 52-64",
    scope: "National · Non-Peer-Reviewed",
  },
];

const authoredBooksTr: RecordItem[] = [
  {
    title:
      "Yapay Zekâyla Demokrasi Üzerine Söyleşi: Sesli Sorular, Dijital Cevaplar",
    year: "2023",
    publisher: "Özgür Yayınevi",
    editor: "Dr. Eyüp Öz",
    edition: "1",
    pages: "148",
    isbn: "978-975-447-711-5",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/yapay-zeka-demokrasi-kitap.png",
  },
  {
    title: "Dijital Çağda Siyaset",
    year: "2023",
    publisher: "Akademisyen Yayınevi",
    editor: "Prof. Dr. Ali Rafet Özkan",
    edition: "1",
    pages: "407",
    isbn: "978-625-399-244-6",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/dijital-cagda-siyaset-kitap.png",
  },
  {
    title: "Parti Üyelerinin Siyasi Katılımı",
    year: "2021",
    publisher: "Orion Akademi",
    editor: "Prof. Dr. Ali Rafet Özkan",
    edition: "1",
    pages: "280",
    isbn: "978-605-06875-9-0",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/parti-uyelerinin-siyasi-katilimi-kitap.png",
  },
];

const authoredBooksEn: RecordItem[] = [
  {
    title:
      "Interview on Democracy with Artificial Intelligence: Voice Questions, Digital Answers",
    year: "2023",
    publisher: "Özgür Publishing",
    editor: "Dr. Eyüp Öz",
    edition: "1",
    pages: "148",
    isbn: "978-975-447-711-5",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/yapay-zeka-demokrasi-kitap.png",
  },
  {
    title: "Politics in the Digital Age",
    year: "2023",
    publisher: "Akademisyen Publishing",
    editor: "Prof. Dr. Ali Rafet Özkan",
    edition: "1",
    pages: "407",
    isbn: "978-625-399-244-6",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/dijital-cagda-siyaset-kitap.png",
  },
  {
    title: "Political Participation of Party Members",
    year: "2021",
    publisher: "Orion Academy",
    editor: "Prof. Dr. Ali Rafet Özkan",
    edition: "1",
    pages: "280",
    isbn: "978-605-06875-9-0",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/parti-uyelerinin-siyasi-katilimi-kitap.png",
  },
];

const bookChaptersTr: RecordItem[] = [
  {
    title: "Teoriden Pratiğe Türkiye Siyaseti",
    chapter:
      "Saha Çalışmaları ve Etik İlkelerin AK Parti'nin Seçim Sonuçları Üzerindeki Etkileri",
    year: "2021",
    publisher: "Liberte Yayınları, İstanbul",
    editor: "Prof. Dr. Alim Yılmaz, Dr. İkram Bağcı",
    edition: "1",
    pages: "280",
    isbn: "978-605-9823-56-2",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/teoriden-pratige-turkiye-siyaseti-kitap.png",
  },
  {
    title: "Demokrasi ve Etkin Yurttaşlık",
    chapter:
      "Yeni Medya Aracılığıyla Dijital Demokrasi ve Siyasi Katılımın Dönüşümü",
    year: "2025",
    publisher: "Çizgi Kitabevi, İstanbul",
    editor: "M. M. Yavuz, D. Geylani, M. Köse",
    edition: "1",
    pages: "355",
    isbn: "978-625-396-595-2",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/demokrasi-ve-etkin-yurttaslik-kitap.png",
  },
  {
    title: "Geleceğin Koridorları",
    chapter: "Küresel Güney'de Siyasetçi Olmanın Zorlukları",
    year: "2023",
    publisher: "Hiperlink Eğitim İletişim Yay. Ltd. Şti.",
    editor: "Prof. Dr. Figen Yıldırım, Doç. Dr. Sabri Öz",
    edition: "1",
    pages: "384",
    isbn: "978-625-6482-35-7",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/gelecegin-koridorlari-kitap.png",
  },
  {
    title: "Eastern and Western Ethicians: A Critical Comparison",
    chapter: "Meta-Politics and Ethics",
    year: "2022",
    publisher: "Livre De Lyon",
    editor:
      "Prof. Dr. Ali Rafet Özkan, Prof. Dr. Emine Öztürk, Doç. Dr. Sadagat Abbasova",
    edition: "1",
    pages: "432",
    isbn: "978-2-38236-470-3",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/eastern-and-western-ethicians-kitap.png",
  },
  {
    title: "İletişim ve İlişki Sorunları",
    chapter: "İletişimde Yapay Zeka ve Dijital Olgunlukta Uyumun Rolü",
    year: "2025",
    publisher: "Çizgi Kitabevi",
    edition: "1",
    pages: "335",
    editor: "A. Muhsin Yılmazçoban",
    language: "Türkçe",
    scope: "Bilimsel Kitap",
    rightImage: "/images/iletisim-ve-iliski-sorunlari-kitap.png",
  },
];

const bookChaptersEn: RecordItem[] = [
  {
    title: "Turkey Politics from Theory to Practice",
    chapter:
      "Effects of Fieldwork and Ethical Principles on AK Party's Election Results",
    year: "2021",
    publisher: "Liberte Publications, Istanbul",
    editor: "Prof. Dr. Alim Yılmaz, Dr. İkram Bağcı",
    edition: "1",
    pages: "280",
    isbn: "978-605-9823-56-2",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/teoriden-pratige-turkiye-siyaseti-kitap.png",
  },
  {
    title: "Democracy and Active Citizenship",
    chapter:
      "Digital Democracy and the Transformation of Political Participation Through New Media",
    year: "2025",
    publisher: "Çizgi Bookstore, Istanbul",
    editor: "M. M. Yavuz, D. Geylani, M. Köse",
    edition: "1",
    pages: "355",
    isbn: "978-625-396-595-2",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/demokrasi-ve-etkin-yurttaslik-kitap.png",
  },
  {
    title: "Corridors of the Future",
    chapter: "Challenges of Being a Politician in the Global South",
    year: "2023",
    publisher: "Hiperlink Publishing, Istanbul",
    editor: "Prof. Dr. Figen Yıldırım, Assoc. Prof. Dr. Sabri Öz",
    edition: "1",
    pages: "384",
    isbn: "978-625-6482-35-7",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/gelecegin-koridorlari-kitap.png",
  },
  {
    title: "Eastern and Western Ethicians: A Critical Comparison",
    chapter: "Meta-Politics and Ethics",
    year: "2022",
    publisher: "Livre De Lyon",
    editor:
      "Prof. Dr. Ali Rafet Özkan, Prof. Dr. Emine Öztürk, Assoc. Prof. Dr. Sadagat Abbasova",
    edition: "1",
    pages: "432",
    isbn: "978-2-38236-470-3",
    language: "English / Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/eastern-and-western-ethicians-kitap.png",
  },
  {
    title: "Communication and Relationship Issues",
    chapter:
      "The Role of Artificial Intelligence in Communication and Alignment in Digital Maturity",
    year: "2025",
    publisher: "Çizgi Bookstore",
    edition: "1",
    pages: "335",
    editor: "A. Muhsin Yılmazçoban",
    language: "Turkish",
    scope: "Scholarly Book",
    rightImage: "/images/iletisim-ve-iliski-sorunlari-kitap.png",
  },
];

const internationalPapersTr: RecordItem[] = [
  {
    title:
      "Political participation levels of party members: The Case of Ak Party and CHP in Istanbul",
    role: "Tam Metin Bildiri · Sözlü Sunum",
    year: "12-16.07.2025",
    venue: "28th IPSA World Congress of Political Science, Seoul, Güney Kore",
    scope: "Uluslararası",
  },
  {
    title: "Technology: Threat or Opportunity for the Future of Democracy?",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "12.10.2023",
    venue: "Digital Diplomacy: Trends & Features",
    scope: "Uluslararası",
  },
  {
    title: "Digital Political Polarization and Ways to Prevent It",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "12.08.2023",
    venue:
      "10th International Congress on Humanities and Social Sciences in a Changing World",
    citation: "1-526",
    scope: "Uluslararası",
  },
  {
    title: "Metaverse-Politics and Ethics",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "11-12.11.2022",
    venue:
      "International Social Sciences Congress in the Age of Digital Transformation, İstanbul",
    citation: "1-663",
    scope: "Uluslararası",
  },
  {
    title:
      "Party members' attitudes toward their own leaders: The Cases of Istanbul Ak Party and CHP",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "20.11.2021",
    venue:
      "I. International Artuklu Congress on Economic Administrative and Political Sciences",
    citation: "1-444",
    scope: "Uluslararası",
  },
  {
    title: "Türkiye'de Okul Özerkliği ve Özgürlükçü Eğitim Anlayışı",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "23.06.2021",
    venue:
      "2023 Vizyonu, Salgın Krizi ve Dijitalleşme Bağlamında Okul Özerkliği",
    citation: "1-133",
    doi: "10.22596/cresjournal",
    scope: "Uluslararası",
  },
];

const internationalPapersEn: RecordItem[] = [
  {
    title:
      "Political participation levels of party members: The Case of Ak Party and CHP in Istanbul",
    role: "Full Paper · Oral Presentation",
    year: "12-16.07.2025",
    venue: "28th IPSA World Congress of Political Science, Seoul, South Korea",
    scope: "International",
  },
  {
    title: "Technology: Threat or Opportunity for the Future of Democracy?",
    role: "Abstract · Oral Presentation",
    year: "12.10.2023",
    venue: "Digital Diplomacy: Trends & Features",
    scope: "International",
  },
  {
    title: "Digital Political Polarization and Ways to Prevent It",
    role: "Abstract · Oral Presentation",
    year: "12.08.2023",
    venue:
      "10th International Congress on Humanities and Social Sciences in a Changing World",
    citation: "1-526",
    scope: "International",
  },
  {
    title: "Metaverse-Politics and Ethics",
    role: "Abstract · Oral Presentation",
    year: "11-12.11.2022",
    venue:
      "International Social Sciences Congress in the Age of Digital Transformation, Istanbul",
    citation: "1-663",
    scope: "International",
  },
  {
    title:
      "Party members' attitudes toward their own leaders: The Cases of Istanbul Ak Party and CHP",
    role: "Abstract · Oral Presentation",
    year: "20.11.2021",
    venue:
      "I. International Artuklu Congress on Economic Administrative and Political Sciences",
    citation: "1-444",
    scope: "International",
  },
  {
    title: "School Autonomy and Libertarian Educational Perspective in Turkey",
    role: "Abstract · Oral Presentation",
    year: "23.06.2021",
    venue:
      "School Autonomy in the Context of 2023 Vision, Pandemic Crisis and Digitalization",
    citation: "1-133",
    doi: "10.22596/cresjournal",
    scope: "International",
  },
];

const nationalPapersTr: RecordItem[] = [
  {
    title: "Dijital Demokrasi ve Siyasi Katılım",
    role: "Özet Bildiri · Sözlü Sunum",
    year: "24.10.2024",
    venue: "II. Politik Psikoloji Sempozyumu - Demokrasi ve Etkin Yurttaşlık",
    scope: "Ulusal",
  },
  {
    title: "Etik Değerlere Saygılı bir Metaverse Oluşturma",
    role: "Tam Metin Bildiri · Sözlü Sunum",
    year: "2024",
    venue: "Sosyal Bilimler ve Yapay Zeka Kongresi",
    scope: "Ulusal",
  },
];

const nationalPapersEn: RecordItem[] = [
  {
    title: "Digital Democracy and Political Participation",
    role: "Abstract · Oral Presentation",
    year: "24.10.2024",
    venue: "II. Political Psychology Symposium - Democracy and Active Citizenship",
    scope: "National",
  },
  {
    title: "Creating a Metaverse Respectful of Ethical Values",
    role: "Full Paper · Oral Presentation",
    year: "2024",
    venue: "Social Sciences and Artificial Intelligence Congress",
    scope: "National",
  },
];

const workshopsTr: RecordItem[] = [
  {
    title: "Türkiye'de Yabancı Dille Öğretim",
    role: "Oturum Başkanı",
    venue: "İstanbul Sabahattin Zaim Üniversitesi",
    year: "04.05.2026",
    scope: "Ulusal",
  },
  {
    title: "Savaş Ortamındaki Çocuklarda Ölüm Algısı",
    venue:
      "IX. Uluslararası Maneviyat Psikolojisi Sempozyumu — Sağlık Bilimleri Üniversitesi, İlim Yayma Cemiyeti",
    year: "11-12.11.2025",
    scope: "Uluslararası",
  },
  {
    title: "Orta Öğretimde Zorunlu Eğitim Çalıştayı",
    venue: "BYOTELL Kozyatağı, İstanbul",
    year: "31.05.2025",
    scope: "Ulusal",
    details:
      '21. yüzyılda lise eğitiminin süresi ve yapısı ile bu alandaki politikalar ele alınarak bilimsel temelli çözüm önerileri geliştirilmiştir. Türkiye Yüzyılı Maarif Modeli kapsamında planlanan "düşünsel makas değişimine" katkı sunmak ve Türkiye\'nin sosyo-ekonomik ve kültürel gerçeklikleri çerçevesinde politika yapıcılara yol gösterecek bir perspektif oluşturmak amaçlanmıştır.',
  },
];

const workshopsEn: RecordItem[] = [
  {
    title: "Foreign Language Education in Turkey",
    role: "Session Chair",
    venue: "Istanbul Sabahattin Zaim University",
    year: "04.05.2026",
    scope: "National",
  },
  {
    title: "Perception of Death in Children in Conflict Environments",
    venue:
      "IX. International Symposium on Psychology of Spirituality — University of Health Sciences, Society for the Dissemination of Knowledge",
    year: "11-12.11.2025",
    scope: "International",
  },
  {
    title: "Compulsory Education Workshop in Secondary Education",
    venue: "BYOTELL Kozyatağı, Istanbul",
    year: "31.05.2025",
    scope: "National",
    details:
      'In the 21st century, the duration and structure of high school education and policies in this field were discussed to develop scientifically-based solutions. It aimed to contribute to the "intellectual pivot" planned under the Century of Turkey Education Model and create a perspective to guide policymakers within the framework of Turkey\'s socio-economic and cultural realities.',
  },
];

const seminarsTr: RecordItem[] = [
  {
    title: "Algı Yönetimi ve Manipülasyon",
    venue: "TDED Genel Merkezi, Eyüp",
    year: "12.04.2025",
    scope: "Ulusal",
    details:
      "Pınar Yayınları'nca yayımlanan, Mücahit Gültekin'in \"Kanmanın ve Kandırmanın Psikolojisi\" adlı kitabının sunumu.",
  },
  {
    title: "Artificial Intelligence and Diplomacy",
    venue: "Çevrim içi",
    year: "03.10.2023",
    scope: "Uluslararası",
    details: "Digital diplomacy and inclusive peace studies for youth.",
  },
  {
    title: "InCites Benchmarking and Analytics",
    venue: "Haliç Üniversitesi, İstanbul",
    year: "22.09.2021",
    scope: "Uluslararası",
    details: "Web of Science ile ilgili webinar.",
  },
];

const seminarsEn: RecordItem[] = [
  {
    title: "Perception Management and Manipulation",
    venue: "TDED Headquarters, Eyüp",
    year: "12.04.2025",
    scope: "National",
    details:
      'Presentation of Mücahit Gültekin\'s book "Psychology of Deceiving and Being Deceived" published by Pınar Publishing.',
  },
  {
    title: "Artificial Intelligence and Diplomacy",
    venue: "Online",
    year: "03.10.2023",
    scope: "International",
    details: "Digital diplomacy and inclusive peace studies for youth.",
  },
  {
    title: "InCites Benchmarking and Analytics",
    venue: "Haliç University, Istanbul",
    year: "22.09.2021",
    scope: "International",
    details: "Webinar on Web of Science.",
  },
];

const speechesTr: RecordItem[] = [
  {
    title: "Yapay Zekâ ve Eğitim",
    venue: "İstanbul Medeniyet Üniversitesi Eğitim Fakültesi",
    year: "15.04.2026",
    scope: "Ulusal",
    details: "Yapay zekâ ve eğitim ilişkisi.",
  },
  {
    title:
      "Gerçekliğin Gölgesinde: Yapay Zekâya Akıl, Kalp, Ruh ve Marifetle Bakmak",
    venue: "Ensar Vakfı Genel Merkezi",
    year: "22.11.2025",
    scope: "Ulusal",
    details: "Yapay zekâ ile maneviyat ilişkisi.",
  },
  {
    title: "Yapay Zekâ ve Günlük Hayat",
    organization: "T.C. Kültür ve Turizm Bakanlığı",
    venue: "Rami Kütüphanesi, İstanbul",
    year: "04.04.2025",
    scope: "Ulusal",
  },
  {
    title: "Dijital Çağda Siyaset",
    venue: "Konya Selçuk Üniversitesi",
    year: "07.11.2023",
    scope: "Ulusal",
    details: "Dijitalleşme ve siyaset ilişkisi.",
  },
  {
    title: "Digital Diplomacy and Inclusive Peace Studies for Youth",
    venue: "Artificial Intelligence and Diplomacy, İstanbul",
    year: "03.10.2023",
    scope: "Uluslararası",
  },
  {
    title: "Eğitim Yolculuğu",
    venue: "TVNet Televizyonu",
    year: "05.11.2020",
    scope: "Ulusal",
    details: "Meslek liselerinin eğitim sistemimizdeki yeri ve önemi.",
  },
];

const speechesEn: RecordItem[] = [
  {
    title: "Artificial Intelligence and Education",
    venue: "Istanbul Medeniyet University Faculty of Education",
    year: "15.04.2026",
    scope: "National",
    details: "Relationship between artificial intelligence and education.",
  },
  {
    title:
      "In the Shadow of Reality: Looking at Artificial Intelligence with Mind, Heart, Soul, and Wisdom",
    venue: "Ensar Foundation Headquarters",
    year: "22.11.2025",
    scope: "National",
    details: "Relationship between artificial intelligence and spirituality.",
  },
  {
    title: "Artificial Intelligence and Daily Life",
    organization: "Republic of Turkey Ministry of Culture and Tourism",
    venue: "Rami Library, Istanbul",
    year: "04.04.2025",
    scope: "National",
  },
  {
    title: "Politics in the Digital Age",
    venue: "Konya Selçuk University",
    year: "07.11.2023",
    scope: "National",
    details: "Relationship between digitalization and politics.",
  },
  {
    title: "Digital Diplomacy and Inclusive Peace Studies for Youth",
    venue: "Artificial Intelligence and Diplomacy, Istanbul",
    year: "03.10.2023",
    scope: "International",
  },
  {
    title: "Educational Journey",
    venue: "TVNet Television",
    year: "05.11.2020",
    scope: "National",
    details: "Place and importance of vocational high schools in our education system.",
  },
];

const conferenceOrganizationsTr: RecordItem[] = [
  {
    title: "Geçmişten Günümüze Türkçenin İmlası Uluslararası Sempozyumu",
    role: "Oturum Başkanı",
    venue: "İstanbul Üniversitesi Edebiyat Fakültesi",
    year: "24-26.09.2025",
    scope: "Uluslararası",
    details:
      '"ChatGPT\'ye sorduk: Türkçe Noktalama İşaretlerine Eleştirel Bir Bakış" oturumu.',
  },
];

const conferenceOrganizationsEn: RecordItem[] = [
  {
    title: "International Symposium on Turkish Spelling from Past to Present",
    role: "Session Chair",
    venue: "Istanbul University Faculty of Literature",
    year: "24-26.09.2025",
    scope: "International",
    details:
      'Session: "We asked ChatGPT: A Critical Look at Turkish Punctuation Marks".',
  },
];

const editorsTr: RecordItem[] = [
  {
    title: "GÖÇ VE KÜLTÜREL ETKİLEŞİM (Migration and Cultural Interaction)",
    role: "Editör · Kitap",
    organization: "İstanbul Sabahattin Zaim Üniversitesi",
    startDate: "01.04.2019",
    endDate: "02.04.2019",
    scope: "Uluslararası",
    details:
      "Avustralya National Üniversitesi ve İstanbul Sabahattin Zaim Üniversitesi'nde görev yapan, koronadan vefat eden Prof. Dr. M. Mehdi İlhan Hoca anısına.",
    rightImage: "/images/goc-ve-kulturel-etkilesim-kitap.png",
  },
];

const editorsEn: RecordItem[] = [
  {
    title: "MIGRATION AND CULTURAL INTERACTION",
    role: "Editor · Book",
    organization: "Istanbul Sabahattin Zaim University",
    startDate: "01.04.2019",
    endDate: "02.04.2019",
    scope: "International",
    details:
      "In memory of Prof. Dr. M. Mehdi İlhan, who served at Australian National University and Istanbul Sabahattin Zaim University and passed away due to COVID-19.",
    rightImage: "/images/goc-ve-kulturel-etkilesim-kitap.png",
  },
];

const certificatesTr: RecordItem[] = [
  {
    title:
      "Marmara Üniversitesi – İşletme Bilimleri Uygulama ve Araştırma Merkezi",
    role: "Sertifika",
    scope: "Ulusal",
    venue: "İstanbul",
    year: "24.06.2000",
    logo: "/images/marmara-logo.png",
    url: "https://www.marmara.edu.tr",
  },
  {
    title: "AER (Assembly of Europe Region)",
    role: "Sertifika",
    scope: "Uluslararası",
    venue: "İstanbul",
    year: "03.06.2010",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
];

const certificatesEn: RecordItem[] = [
  {
    title:
      "Marmara University – Center for Business Sciences Application and Research",
    role: "Certificate",
    scope: "National",
    venue: "Istanbul",
    year: "24.06.2000",
    logo: "/images/marmara-logo.png",
    url: "https://www.marmara.edu.tr",
  },
  {
    title: "AER (Assembly of European Regions)",
    role: "Certificate",
    scope: "International",
    venue: "Istanbul",
    year: "03.06.2010",
    logo: "/images/aer-logo.svg",
    url: "https://aer.eu",
  },
];

const membershipsTr: RecordItem[] = [
  {
    title: "Academia.edu",
    role: "Üye · Akademik Profil",
    year: "2025",
    details: "Akademik Ağ",
    logo: "/images/academia-logo.svg",
    url: "https://independent.academia.edu/OrhanAlbayrak6",
  },
  {
    title: "International Political Science Association (IPSA)",
    role: "Üye",
    year: "2025",
    details: "Bilimsel Kuruluş",
    logo: "/images/ipsa-logo.png",
    url: "https://www.ipsa.org",
  },
  {
    title: "ÜNDER – Üniversite Öğretim Elemanları Dayanışma Derneği",
    role: "Üye · Yüksek İstişare Kurulu Üyesi (20.10.2024)",
    year: "2023",
    details: "Bilimsel Kuruluş",
    logo: "/images/under-logo.png",
    url: "https://www.facebook.com/underorgtr/",
  },
];

const membershipsEn: RecordItem[] = [
  {
    title: "Academia.edu",
    role: "Member · Academic Profile",
    year: "2025",
    details: "Academic Network",
    logo: "/images/academia-logo.svg",
    url: "https://independent.academia.edu/OrhanAlbayrak6",
  },
  {
    title: "International Political Science Association (IPSA)",
    role: "Member",
    year: "2025",
    details: "Scientific Organization",
    logo: "/images/ipsa-logo.png",
    url: "https://www.ipsa.org",
  },
  {
    title: "UNDER – Association of University Academic Staff Solidarity",
    role: "Member · High Advisory Board Member (20.10.2024)",
    year: "2023",
    details: "Scientific Organization",
    logo: "/images/under-logo.png",
    url: "https://www.facebook.com/underorgtr/",
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
      // threshold 0: eleman ekrana ilk değdiğinde tetiklenir. Oransal bir eşik (ör. 0.1)
      // kullanılırsa, viewport'un 10 katından uzun bölümler bu oranı hiç yakalayamaz ve
      // kalıcı olarak görünmez kalır (Yayınlar bölümünde mobilde yaşanan durum).
      { threshold: 0 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#7a2948] mb-2"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
      <div className="gold-line w-16 mt-3" />
    </div>
  );
}

function SubsectionTitle({ title }: { title: string }) {
  return (
    <h3
      className="text-2xl font-semibold text-[#7a2948] mb-4 mt-1"
      style={{ fontFamily: "'DM Serif Display', serif" }}
    >
      {title}
    </h3>
  );
}

function RecordCards({
  items,
  venueLabel = "Yer/Etkinlik",
  showRoleLabel = true,
  labels = {
    role: "Görev",
    chapter: "Bölüm",
    citation: "Cilt/Sayı-Sayfa",
    edition: "Basım",
    pages: "sayfa",
    editor: "Editör",
    language: "Dil",
    scope: "Kapsam",
    dateYear: "Tarih/Yıl",
    duration: "Süre",
  },
}: {
  items: RecordItem[];
  venueLabel?: string;
  showRoleLabel?: boolean;
  labels?: {
    role: string;
    chapter: string;
    citation: string;
    edition: string;
    pages: string;
    editor: string;
    language: string;
    scope: string;
    dateYear: string;
    duration: string;
  };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(item => {
        // Yayınevi, basım ve sayfa bilgisi tek satırda toplanır; boş olanlar araya nokta koymadan atlanır.
        const imprint = [
          item.publisher,
          item.edition && `${item.edition}. ${labels.edition}`,
          item.pages && `${item.pages} ${labels.pages}`,
        ]
          .filter(Boolean)
          .join(" · ");

        const cardContent = (
          <div
            key={`${item.title}-${item.chapter ?? item.year ?? item.startDate ?? "x"}`}
            className={`w-full min-w-0 overflow-hidden bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm flex items-start gap-4 transition-all ${
              item.url ? "hover:border-[#c9a227]/40 hover:shadow-md group cursor-pointer" : ""
            }`}
          >
            {item.logo && (
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-center p-1.5 shrink-0 overflow-hidden dark:bg-white dark:border-gray-200 mt-0.5">
                <img
                  src={item.logo}
                  alt={item.organization || item.title}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`font-semibold text-[#1e3a5f] leading-snug break-words min-w-0 ${item.url ? "group-hover:text-[#c9a227] transition-colors" : ""}`}>
                  {item.title}
                </p>
                {item.url && (
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-[#c9a227] shrink-0 mt-0.5 transition-colors" />
                )}
              </div>
              {item.chapter && (
                <p className="text-sm text-gray-600 mt-1 italic leading-relaxed break-words min-w-0">
                  {labels.chapter}: {item.chapter}
                </p>
              )}
              {item.organization && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words min-w-0">
                  {item.organization}
                </p>
              )}
              <div className="mt-2 space-y-1 text-sm text-gray-500 leading-relaxed break-words min-w-0">
                {item.role && (
                  <p>{showRoleLabel ? `${labels.role}: ${item.role}` : item.role}</p>
                )}
                {item.venue && (
                  <p>
                    {venueLabel}: {item.venue}
                  </p>
                )}
                {item.citation && <p>{labels.citation}: {item.citation}</p>}
                {imprint && <p>{imprint}</p>}
                {item.editor && <p>{labels.editor}: {item.editor}</p>}
                {item.isbn && <p>ISBN: {item.isbn}</p>}
                {item.doi && (
                  <p>
                    DOI:{" "}
                    <a
                      href={`https://doi.org/${item.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1e3a5f] hover:text-[#c9a227] underline underline-offset-2 transition-colors break-all"
                    >
                      {item.doi}
                    </a>
                  </p>
                )}
                {item.language && <p>{labels.language}: {item.language}</p>}
                {item.scope && <p>{labels.scope}: {item.scope}</p>}
                {item.year && <p>{labels.dateYear}: {item.year}</p>}
                {(item.startDate || item.endDate) && (
                  <p>
                    {labels.duration}: {item.startDate ?? "-"}{" "}
                    {item.endDate ? `- ${item.endDate}` : ""}
                  </p>
                )}
                {item.details && <p>{item.details}</p>}
              </div>
            </div>
            {item.rightImage && (
              <div className="w-20 md:w-24 shrink-0 rounded-lg overflow-hidden border border-gray-200/80 shadow-md group-hover:scale-105 transition-transform bg-white p-0.5 mt-0.5">
                <img
                  src={item.rightImage}
                  alt={item.title}
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>
            )}
          </div>
        );

        if (item.url) {
          return (
            <a
              key={`${item.title}-${item.chapter ?? item.year ?? item.startDate ?? "x"}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {cardContent}
            </a>
          );
        }

        return cardContent;
      })}
    </div>
  );
}

export default function Home() {
  const { language: lang, setLanguage: setLang } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionId>("hakkinda");
  const [isRadioModalOpen, setIsRadioModalOpen] = useState(false);

  const t = translations[lang];

  const educationCards = lang === "en" ? educationCardsEn : educationCardsTr;
  const academicRoles = lang === "en" ? academicRolesEn : academicRolesTr;
  const adminRoles = lang === "en" ? adminRolesEn : adminRolesTr;
  const externalExperiences =
    lang === "en" ? externalExperiencesEn : externalExperiencesTr;
  const projectRoles = lang === "en" ? projectRolesEn : projectRolesTr;
  const internationalArticles =
    lang === "en" ? internationalArticlesEn : internationalArticlesTr;
  const nationalArticles =
    lang === "en" ? nationalArticlesEn : nationalArticlesTr;
  const otherPublications =
    lang === "en" ? otherPublicationsEn : otherPublicationsTr;
  const authoredBooks = lang === "en" ? authoredBooksEn : authoredBooksTr;
  const bookChapters = lang === "en" ? bookChaptersEn : bookChaptersTr;
  const internationalPapers =
    lang === "en" ? internationalPapersEn : internationalPapersTr;
  const nationalPapers = lang === "en" ? nationalPapersEn : nationalPapersTr;
  const workshops = lang === "en" ? workshopsEn : workshopsTr;
  const seminars = lang === "en" ? seminarsEn : seminarsTr;
  const speeches = lang === "en" ? speechesEn : speechesTr;
  const conferenceOrganizations =
    lang === "en" ? conferenceOrganizationsEn : conferenceOrganizationsTr;
  const editors = lang === "en" ? editorsEn : editorsTr;
  const certificates = lang === "en" ? certificatesEn : certificatesTr;
  const memberships = lang === "en" ? membershipsEn : membershipsTr;

  useEffect(() => {
    const handleScroll = () => {
      const sections = DOCK_ITEMS.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(DOCK_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    if (id === "muzik-dinle") {
      setIsRadioModalOpen(true);
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 88;
      const y =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };



  const courses = lang === "en" ? coursesEn : coursesTr;
  const lisansCourses = courses.filter(
    course => course.level === "Lisans" || course.level === "Undergraduate"
  );
  const yuksekLisansCourses = courses.filter(
    course => course.level === "Yüksek Lisans" || course.level === "Master's"
  );
  const doktoraCourses = courses.filter(
    course => course.level === "Doktora" || course.level === "Ph.D."
  );

  return (
    <div
      className="site-shell min-h-screen bg-white transition-colors duration-300 dark:bg-[#090f18]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <SinglePageDock
        activeSection={activeSection}
        onNavigate={scrollTo}
        lang={lang}
        onLanguageChange={setLang}
      />
      <MobileSidebar
        activeSection={activeSection}
        onNavigate={scrollTo}
        lang={lang}
        onLanguageChange={setLang}
      />

      <section
        id="hero"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#f5f2eb] pb-16 pt-28 scroll-mt-24 transition-colors duration-300 dark:bg-[#090f18] md:pb-20"
      >
        <CursorGrid
          cellSize={64}
          color="#7a2948"
          radius={170}
          holdTime={240}
          fadeDuration={720}
          lineWidth={1.4}
          maxOpacity={0.92}
          fillOpacity={0.05}
          gridOpacity={0.09}
          cellRadius={7}
          pulseSpeed={560}
          ambient
          className="z-0 opacity-90"
        />
        <div className="absolute -left-28 top-28 size-80 rounded-full bg-[#c9a227]/15 blur-3xl" />
        <div className="absolute -right-20 bottom-12 size-96 rounded-full bg-[#7a2948]/15 blur-3xl" />

        <div className="container relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <h1
                className="text-[20pt] font-bold italic leading-snug tracking-normal text-[#7a2948]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {t.heroTitle}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A66C2] text-white hover:bg-[#004182] hover:scale-105 transition-all shadow-sm"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white hover:bg-[#0d65d9] hover:scale-105 transition-all shadow-sm"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={NSOSYAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="N Sosyal"
                  aria-label="N Sosyal"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#1e3a5f] hover:scale-105 transition-all shadow-sm overflow-hidden p-1 border border-gray-200 dark:border-white/10 dark:bg-white"
                >
                  <img
                    src="/images/nsosyal.png"
                    alt="N Sosyal"
                    className="h-full w-full object-contain rounded-lg"
                  />
                </a>
              </div>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#42506a] dark:text-[#b3c0d0] md:text-xl">
                {t.heroDesc}
              </p>
              <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => scrollTo("yayinlar")}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1e3a5f] px-4 py-3 font-semibold text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-0.5 hover:bg-[#142b49]"
                >
                  <BookOpen className="shrink-0" size={18} />
                  {t.explorePubs}
                </button>
                <button
                  onClick={() => {
                    scrollTo("iletisim");
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#1e3a5f]/20 bg-white/65 px-4 py-3 font-semibold text-[#1e3a5f] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#1e3a5f]/40 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  <Mail className="shrink-0" size={18} />
                  {t.contactBtn}
                </button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#1e3a5f]/10 pt-5 text-sm text-[#5c6678] dark:border-white/10 dark:text-[#9dacbf]">
                <span>
                  <strong className="text-[#1e3a5f]">2023</strong>{" "}
                  {t.heroStats?.associateProf ?? (lang === "en" ? "Associate Professorship" : "Doçentlik")}
                </span>
                <span>
                  <strong className="text-[#1e3a5f]">16K+</strong>{" "}
                  {t.heroStats?.employmentImpact ?? (lang === "en" ? "Employment impact" : "İstihdam etkisi")}
                </span>
                <span>
                  <strong className="text-[#1e3a5f]">3</strong>{" "}
                  {t.heroStats?.disciplines ?? (lang === "en" ? "Disciplines" : "Disiplin")}
                </span>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[560px]">
                <div className="absolute inset-x-4 bottom-0 h-[78%] rounded-[3rem_3rem_5rem_2.5rem] bg-gradient-to-br from-[#14243b] via-[#1e3a5f] to-[#7a2948] shadow-[0_40px_80px_rgba(20,36,59,0.28)]" />
                <div className="absolute inset-x-1 bottom-3 h-[72%] rounded-[3rem_3rem_5rem_2.5rem] border border-white/25" />
                <div className="relative mx-auto aspect-[16/10] w-[95%] overflow-hidden rounded-[2.5rem] border border-white/30 bg-white p-2 shadow-2xl dark:bg-[#111a27]">
                  <img
                    src={PROFILE_IMG}
                    alt="Doç. Dr. Orhan Albayrak"
                    className="h-full w-full rounded-[2rem] object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#14243b]/60 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 -left-4 sm:-left-8 max-w-[240px] sm:max-w-[270px] rounded-2xl border border-white/70 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111a27]/90 z-20">
                  <p className="text-xs sm:text-sm font-medium italic leading-relaxed text-[#1e3a5f] dark:text-white">
                    “{t.profileBadge}”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 animate-bounce text-[#1e3a5f]/35 md:block">
          <ChevronDown size={28} />
        </div>
      </section>

      <section id="hakkinda" className="py-20 bg-white scroll-mt-24">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title={t.aboutTitle} />
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {t.aboutParagraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h4
                  className="font-semibold text-[#7a2948] mb-4 text-lg"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {t.basicInfo.title}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{t.basicInfo.birthPlace}</p>
                      <p className="text-gray-500">{t.basicInfo.birthPlaceVal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{t.basicInfo.titleLabel}</p>
                      <p className="text-gray-500">{t.basicInfo.titleVal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{t.basicInfo.institution}</p>
                      <p className="text-gray-500">
                        {t.basicInfo.institutionVal}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{t.basicInfo.languages}</p>
                      <p className="text-gray-500">
                        {t.basicInfo.languagesVal}
                      </p>
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
            <SectionTitle title={t.educationTitle} />
            <div className="grid md:grid-cols-2 gap-6">
              {educationCards.map(edu => {
                const [showDiplomaPreview, setShowDiplomaPreview] = useState(false);

                return (
                  <div
                    key={`${edu.degree}-${edu.years}`}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative"
                  >
                    <div className="flex items-start gap-4">
                      {edu.diplomaUrl ? (
                        <div
                          onMouseEnter={() => setShowDiplomaPreview(true)}
                          onMouseLeave={() => setShowDiplomaPreview(false)}
                          className="relative cursor-pointer"
                        >
                          <a
                            href={edu.diplomaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={lang === "en" ? "View Diploma" : "Diplomayı Görüntüle"}
                            className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-center p-1.5 shrink-0 overflow-hidden dark:bg-white dark:border-gray-200 hover:border-[#c9a227] hover:scale-105 transition-all group block"
                          >
                            {edu.logo ? (
                              <img
                                src={edu.logo}
                                alt={edu.school}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <GraduationCap size={22} className="text-[#1e3a5f]" />
                            )}
                          </a>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-center p-1.5 shrink-0 overflow-hidden dark:bg-white dark:border-gray-200">
                          {edu.logo ? (
                            <img
                              src={edu.logo}
                              alt={edu.school}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <GraduationCap size={22} className="text-[#1e3a5f]" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-[#c9a227]/15 text-[#c9a227] px-2 py-0.5 rounded-full">
                              {edu.degree}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar size={11} /> {edu.years}
                            </span>
                          </div>
                          {edu.diplomaUrl && (
                            <div
                              onMouseEnter={() => setShowDiplomaPreview(true)}
                              onMouseLeave={() => setShowDiplomaPreview(false)}
                              className="relative"
                            >
                              <a
                                href={edu.diplomaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#1e3a5f] hover:text-[#c9a227] font-medium flex items-center gap-1 transition-colors py-1 px-1.5 rounded hover:bg-slate-50 cursor-pointer"
                              >
                                <span>{lang === "en" ? "Diploma" : "Diploma"}</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}
                        </div>
                        <h3
                          className="font-semibold text-[#1e3a5f] text-lg leading-tight"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {edu.field}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{edu.school}</p>
                        <p className="text-gray-400 text-xs mt-2 italic">
                          {edu.thesis}
                        </p>
                      </div>
                    </div>

                    {/* Fullscreen Overlay Popup for Diploma (Transparent background) */}
                    {edu.diplomaUrl && showDiplomaPreview && (
                      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none transition-all animate-in fade-in duration-200 bg-transparent">
                        <div className="bg-white p-3 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-4xl max-h-[90vh] flex flex-col items-center border border-gray-200">
                          <img
                            src={edu.diplomaUrl}
                            alt="Diploma Preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-sm"
                          />
                          <div className="mt-2 flex items-center justify-between w-full px-2 text-xs text-gray-500 font-medium">
                            <span>🎓 {lang === "en" ? "M.Sc. Diploma Preview" : "Yüksek Lisans Diploma Önizlemesi"}</span>
                            <span className="text-gray-400">{lang === "en" ? "Click to open full resolution" : "Tam çözünürlük için tıklayın"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="kariyer" className="py-20 bg-white scroll-mt-24">
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle title={t.careerTitle} />

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.academicRole} />
              <RecordCards items={academicRoles} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.adminRole} />
              <RecordCards items={adminRoles} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.externalExp} />
              <RecordCards items={externalExperiences} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.coursesTaught} />
              <div className="space-y-7">
                {[
                  {
                    label: lang === "en" ? "Undergraduate" : "Lisans",
                    data: lisansCourses,
                  },
                  {
                    label: lang === "en" ? "Master's" : "Yüksek Lisans",
                    data: yuksekLisansCourses,
                  },
                  {
                    label: lang === "en" ? "Ph.D." : "Doktora",
                    data: doktoraCourses,
                  },
                ].map(group => (
                  <div key={group.label}>
                    <h4
                      className="text-xl font-semibold text-[#7a2948] mb-3"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {group.label}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {group.data.map((course, courseIndex) => (
                        <div
                          key={`${course.title}-${course.academicYear}-${course.term}-${courseIndex}`}
                          className="bg-[#f8f9fc] rounded-xl border border-gray-100 p-3"
                        >
                          <p className="font-medium text-[#1e3a5f] text-base leading-snug break-words">
                            {course.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {course.language} · {course.term} ·{" "}
                            {course.academicYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-8 md:mt-10">
              <SubsectionTitle title={t.subsections.projectRoles} />
              <RecordCards items={projectRoles} labels={t.cardLabels} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="yayinlar" className="py-20 bg-[#f8f9fc] scroll-mt-24">
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle title={t.publicationsTitle} />

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.intArticles} />
              <RecordCards
                items={internationalArticles}
                venueLabel={t.cardLabels.journal}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.natArticles} />
              <RecordCards
                items={nationalArticles}
                venueLabel={t.cardLabels.journal}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.otherPubs} />
              <RecordCards
                items={otherPublications}
                venueLabel={t.cardLabels.journal}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.myBooks} />
              <RecordCards items={authoredBooks} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.bookChapters} />
              <RecordCards items={bookChapters} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.intPapers} />
              <RecordCards
                items={internationalPapers}
                venueLabel={t.cardLabels.event}
                showRoleLabel={false}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.natPapers} />
              <RecordCards
                items={nationalPapers}
                venueLabel={t.cardLabels.event}
                showRoleLabel={false}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.editorship} />
              <RecordCards items={editors} labels={t.cardLabels} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.speeches} />
              <RecordCards
                items={speeches}
                venueLabel={t.cardLabels.place}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.workshops} />
              <RecordCards
                items={workshops}
                venueLabel={t.cardLabels.place}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.seminars} />
              <RecordCards
                items={seminars}
                venueLabel={t.cardLabels.place}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.conferences} />
              <RecordCards
                items={conferenceOrganizations}
                venueLabel={t.cardLabels.place}
                labels={t.cardLabels}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.certificates} />
              <RecordCards
                items={certificates}
                venueLabel={t.cardLabels.place}
                labels={t.cardLabels}
              />

            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.memberships} />
              <RecordCards items={memberships} labels={t.cardLabels} />
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
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {t.awardSection.title}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t.awardSection.desc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ItoMonthlySection lang={lang} />

      <CollaborationsSection lang={lang} />

      <section id="iletisim" className="py-20 bg-white scroll-mt-24">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title={t.contactBtn} />
            <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr] lg:items-start">
              <div className="rounded-3xl border border-gray-100 bg-[#f8f9fc] p-5 shadow-sm md:p-8">
                <ContactForm />
              </div>

              <div className="space-y-5">
                <a
                  href="mailto:orhan.albayrak@bezmialem.edu.tr"
                  className="group block rounded-3xl bg-[#1e3a5f] p-6 text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                        {t.directContact}
                      </p>
                      <p className="mt-3 break-all text-base font-medium">
                        orhan.albayrak@bezmialem.edu.tr
                      </p>
                    </div>
                    <ArrowUpRight
                      className="shrink-0 text-white/60 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                      size={20}
                    />
                  </div>
                </a>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h4
                    className="mb-5 text-lg font-semibold text-[#7a2948]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {t.membershipsTitle}
                  </h4>
                  <div className="space-y-3">
                    {(lang === "en"
                      ? [
                          {
                            name: "Bezmialem Vakif University",
                            role: "Associate Professor",
                            url: "https://bezmialem.edu.tr",
                          },
                          {
                            name: "TDED – Turkish Language and Literature Association",
                            role: "Vice President & Board Member",
                            url: "https://www.tded.org.tr",
                          },
                          {
                            name: "Istanbul Chamber of Commerce",
                            role: "Assembly Member",
                            url: "https://www.ito.org.tr",
                          },
                          {
                            name: "ITU 1773 Technopark Inc.",
                            role: "Board Member",
                            url: "https://1773ituteknopark.com",
                          },
                          {
                            name: "FGA Foundation",
                            role: "Chairman of the Board of Trustees",
                            url: "http://fgavakfi.org",
                          },
                          {
                            name: "Academia.edu",
                            role: "Academic Profile",
                            url: "https://independent.academia.edu/OrhanAlbayrak6",
                          },
                        ]
                      : [
                          {
                            name: "Bezmialem Vakıf Üniversitesi",
                            role: "Doçent Doktor",
                            url: "https://bezmialem.edu.tr",
                          },
                          {
                            name: "TDED – Türkiye Dil ve Edebiyat Derneği",
                            role: "Genel Başkan Yardımcısı ve YK Üyesi",
                            url: "https://www.tded.org.tr",
                          },
                          {
                            name: "İstanbul Ticaret Odası",
                            role: "Meclis Üyesi",
                            url: "https://www.ito.org.tr",
                          },
                          {
                            name: "İTÜ 1773 Teknopark A.Ş.",
                            role: "Yönetim Kurulu Üyesi",
                            url: "https://1773ituteknopark.com",
                          },
                          {
                            name: "FGA Vakfı",
                            role: "Mütevelli Heyet Başkanı",
                            url: "http://fgavakfi.org",
                          },
                          {
                            name: "Academia.edu",
                            role: "Akademik Profil",
                            url: "https://independent.academia.edu/OrhanAlbayrak6",
                          },
                        ]
                    ).map(aff => (
                      <div
                        key={aff.name}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#1e3a5f]">
                            {aff.name}
                          </p>
                          <p className="text-xs text-gray-400">{aff.role}</p>
                        </div>
                        {aff.url !== "#" && (
                          <a
                            href={aff.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#c9a227] transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="bg-[#1e3a5f] text-white pt-12 pb-8 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Col 1: Brand & Profile Info */}
            <div className="space-y-3">
              <h3
                className="text-2xl font-semibold tracking-tight text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {lang === "en" ? "Assoc. Prof. Dr. Orhan Albayrak" : "Doç. Dr. Orhan Albayrak"}
              </h3>
              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                {lang === "en"
                  ? "Bezmialem Vakif University – Department of Health Management. Academic research, publications, and public policy studies in Political Science and Digitalization."
                  : "Bezmialem Vakıf Üniversitesi Sağlık Yönetimi Bölümü Öğretim Üyesi. Siyaset bilimi, dijitalleşme, kamu politikası ve eğitim alanlarında akademik çalışmalar."}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                >
                  <svg
                    className="w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A66C2] text-white hover:bg-[#004182] hover:scale-105 transition-all shadow-sm"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white hover:bg-[#0d65d9] hover:scale-105 transition-all shadow-sm"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={NSOSYAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="N Sosyal"
                  aria-label="N Sosyal"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#1e3a5f] hover:scale-105 transition-all shadow-sm overflow-hidden p-1 border border-gray-200"
                >
                  <img
                    src="/images/nsosyal.png"
                    alt="N Sosyal"
                    className="h-full w-full object-contain rounded-lg"
                  />
                </a>
              </div>
            </div>

            {/* Col 2: Hızlı Bağlantılar / Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c9a227]">
                {lang === "en" ? "Quick Links" : "Hızlı Bağlantılar"}
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => scrollTo("hakkinda")}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {lang === "en" ? "About Me" : "Hakkımda"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("egitim")}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {lang === "en" ? "Education & Titles" : "Eğitim & Unvanlar"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("kariyer")}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {lang === "en" ? "Career & Experience" : "Kariyer & Deneyim"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("yayinlar")}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {lang === "en" ? "Publications & Activities" : "Yayınlar & Etkinlikler"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("iletisim")}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {lang === "en" ? "Contact" : "İletişim"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Faydalı Linkler / Useful Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c9a227]">
                {lang === "en" ? "Useful Links" : "Faydalı Linkler"}
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>
                  <a
                    href="https://www.yok.gov.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink size={14} className="text-[#c9a227] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{lang === "en" ? "Council of Higher Education (YÖK)" : "Yükseköğretim Kurulu (YÖK)"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ito.org.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink size={14} className="text-[#c9a227] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{lang === "en" ? "Istanbul Chamber of Commerce" : "İstanbul Ticaret Odası"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tobb.org.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink size={14} className="text-[#c9a227] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{lang === "en" ? "Union of Chambers and Commodity Exchanges of Turkey" : "Türkiye Odalar ve Borsalar Birliği"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ticaret.gov.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink size={14} className="text-[#c9a227] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{lang === "en" ? "Ministry of Trade" : "T.C. Ticaret Bakanlığı"}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://famelack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink size={14} className="text-[#c9a227] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Famelack</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: İletişim & Kurum / Contact Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c9a227]">
                {lang === "en" ? "Contact Info" : "İletişim Bilgileri"}
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#c9a227]" />
                  <span>
                    {lang === "en"
                      ? "Bezmialem Vakif University, Eyupsultan, Istanbul"
                      : "Bezmialem Vakıf Üniversitesi, Eyüpsultan, İstanbul"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-[#c9a227]" />
                  <a
                    href="mailto:orhan.albayrak@bezmialem.edu.tr"
                    className="hover:text-white hover:underline transition-colors break-all"
                  >
                    orhan.albayrak@bezmialem.edu.tr
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href="https://bezmialem.edu.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-[#c9a227] transition-colors"
                  >
                    <span>{lang === "en" ? "Bezmialem Vakif University" : "Bezmialem Vakıf Üniversitesi"}</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Scroll to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>
              © 2026 {lang === "en" ? "Assoc. Prof. Dr. Orhan Albayrak. All rights reserved." : "Doç. Dr. Orhan Albayrak. Tüm hakları saklıdır."}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs text-gray-300 hover:bg-[#c9a227] hover:text-white transition-all cursor-pointer"
            >
              <span>{lang === "en" ? "Back to Top" : "Yukarı Çık"}</span>
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </footer>

      <RadioGardenModal
        isOpen={isRadioModalOpen}
        onClose={() => setIsRadioModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
