import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  ExternalLink,
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
import { CvRequestForm } from "@/components/site/CvRequestForm";
import { CursorGrid } from "@/components/ui/cursor-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const BOOKS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/books_bg-mJy7EiwSBa2fHWSKnAz6t2.webp";
const PROFILE_IMG = "/images/oalbayrakprofil.jpeg";

const LINKEDIN_URL = "https://www.linkedin.com/in/orhan-albayrak";
const INSTAGRAM_URL = "https://www.instagram.com/drorhanalbayrak/";

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
};

const aboutParagraphs = [
  "Doç. Dr. Orhan Albayrak, 1960 yılında Trabzon'un Arsin ilçesinde doğmuştur. İlk, orta ve lise eğitimini Erzurum'da tamamladıktan sonra akademik kariyerine İstanbul Teknik Üniversitesi'nde Elektronik ve Haberleşme Mühendisliği lisans eğitimiyle başlamıştır.",
  "Lisans sonrasında aynı üniversitede Kontrol ve Bilgisayar programında yüksek lisansını tamamlamış, ardından University of Florida'da bir ağ projesinde görev almıştır. Marmara Üniversitesi'nde Modern İşletme Yönetimi sertifika programını bitirmiş; doktorasını ise İstanbul Sabahattin Zaim Üniversitesi'nde Siyaset Bilimi ve Uluslararası İlişkiler alanında tamamlamıştır. İki yıl sonra da yine Siyaset Sosyolojisi alanında Doçentlik ünvanını almıştır.",
  "Doktora tezinde Türkiye'nin iki ana siyasi parti üyelerinin siyasi katılım düzeyleri ve parti içi demokrasiye dair tutumlarını hem nitel hem nicel yöntemlerle incelemiştir. Akademik ilgi alanları arasında dijital çağda siyaset, yapay zeka ve demokrasi ilişkisi, yeni toplumsal hareketler ve dijital diplomasi öne çıkmaktadır.",
  "İngilizce ve Osmanlıca bilen Doç. Dr. Albayrak, evli ve üç çocuk babasıdır.",
];

const aboutParagraphsEn = [
  "Assoc. Prof. Dr. Orhan Albayrak was born in Arsin, Trabzon, in 1960. After completing his primary and secondary education in Erzurum, he began his academic journey with a bachelor’s degree in Electronics and Communication Engineering at Istanbul Technical University.",
  "He completed a master’s program in Control and Computer Engineering at the same university and later worked on a network project at the University of Florida. He completed Marmara University’s Modern Business Management certificate program and earned his PhD in Political Science and International Relations at Istanbul Sabahattin Zaim University. Two years later, he received the title of Associate Professor in Political Sociology.",
  "His doctoral research used qualitative and quantitative methods to examine the political participation of members of Türkiye’s two major political parties and their attitudes toward intra-party democracy. His academic interests include politics in the digital age, the relationship between artificial intelligence and democracy, new social movements, and digital diplomacy.",
  "Assoc. Prof. Dr. Albayrak speaks English and Ottoman Turkish. He is married and has three children.",
];

const educationCards: EducationItem[] = [
  {
    degree: "Doçentlik",
    field: "Siyaset Sosyolojisi",
    school:
      "ÜAK Temel Alan: Sosyal, Beşeri ve İdari Bilimler / Bilim Alanı: Siyaset Bilimi",
    years: "2023",
    thesis: "Doçentlik Ünvanı",
  },
  {
    degree: "Doktora",
    field: "Siyaset Bilimi ve Uluslararası İlişkiler",
    school: "İstanbul Sabahattin Zaim Üniversitesi",
    years: "2016–2020",
    thesis:
      'Tez: "Parti üyelerinin siyasi katılım düzeyi: İstanbul Ak Parti ve CHP örneği" (29.09.2020) — Danışman: Prof. Dr. Ömer Çaha',
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

const educationCardsEn: EducationItem[] = [
  {
    degree: "Associate Professorship",
    field: "Political Sociology",
    school:
      "UAK Main Field: Social, Human and Administrative Sciences / Field: Political Science",
    years: "2023",
    thesis: "Associate Professor title",
  },
  {
    degree: "PhD",
    field: "Political Science and International Relations",
    school: "Istanbul Sabahattin Zaim University",
    years: "2016–2020",
    thesis:
      "Dissertation: “Political participation levels of party members: The Istanbul AK Party and CHP case” (29.09.2020) — Advisor: Prof. Dr. Ömer Çaha",
  },
  {
    degree: "Graduate Certificate",
    field: "Modern Business Management",
    school: "Marmara University",
    years: "1999–2000",
    thesis: "Certificate program",
  },
  {
    degree: "Master’s Degree",
    field: "Control and Computer Engineering",
    school: "Istanbul Technical University",
    years: "1982–1984",
    thesis: "Control and Computer Engineering program",
  },
  {
    degree: "Bachelor’s Degree",
    field: "Electronics and Communication Engineering",
    school: "Istanbul Technical University",
    years: "1977–1982",
    thesis: "Faculty of Electronics and Communication",
  },
];

const academicRoles: RecordItem[] = [
  {
    title: "DOÇENT",
    organization:
      "BEZM-İ ÂLEM VAKIF ÜNİVERSİTESİ / SAĞLIK BİLİMLERİ FAKÜLTESİ / SAĞLIK YÖNETİMİ BÖLÜMÜ",
    startDate: "15.10.2024",
    details: "Hâlen devam ediyor.",
  },
  {
    title: "DOKTOR ÖĞRETİM ÜYESİ",
    organization:
      "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    details: "Siyaset Bilimi ve Uluslararası İlişkiler PR. (Tam Burslu)",
    startDate: "01.09.2021",
    endDate: "19.03.2024",
  },
];

const adminRoles: RecordItem[] = [
  {
    title: "Bölüm Başkan Yardımcısı",
    organization:
      "HALİÇ ÜNİVERSİTESİ / İŞLETME FAKÜLTESİ / SİYASET BİLİMİ VE ULUSLARARASI İLİŞKİLER BÖLÜMÜ",
    scope: "Türkiye",
    startDate: "02.12.2022",
    endDate: "01.03.2023",
  },
];

const externalExperiences: RecordItem[] = [
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
  },
  {
    title: "1773 İstanbul Teknik Üniversitesi Teknopark A.Ş.",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "08.12.2022",
  },
  {
    title: "İstanbul Ticaret Odası",
    role: "Meclis Üyesi – Eğitim Meslek Komitesi",
    scope: "Mesleki Dernekler",
    startDate: "15.10.2022",
  },
  {
    title: "Türkiye Dil ve Edebiyat Derneği",
    role: "Yönetim Kurulu Üyesi",
    scope: "Türkiye",
    startDate: "01.06.2022",
  },
  {
    title: "İstanbul Ticaret Üniversitesi",
    role: "Mütevelli Heyet Üyesi",
    scope: "Türkiye",
    startDate: "01.01.2018",
    endDate: "01.01.2022",
  },
  {
    title: "İstanbul Ticaret Odası",
    role: "Meclis Üyesi, Eğitim Komitesi Üyesi",
    scope: "Mesleki Dernekler",
    startDate: "15.10.2018",
    endDate: "15.10.2022",
    details: "8000 eğitim kurumunu temsilen seçilmiş meclis üyesi.",
  },
  {
    title: "Marmara Üniversitesi Teknopark A.Ş.",
    role: "Ortak – Teknopark Kurucu Ortağı",
    scope: "Ticari (Özel)",
    startDate: "01.01.2016",
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
    title: "Business Statistics",
    language: "İngilizce",
    term: "Bahar",
    academicYear: "2021-2022",
    level: "Yüksek Lisans",
  },
  {
    title: "Business Statistics",
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

const projectRoles: RecordItem[] = [
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

const internationalArticles: RecordItem[] = [
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

const nationalArticles: RecordItem[] = [
  {
    title: "Dijital Diplomasi: Diplomasi 3.0",
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

const otherPublications: RecordItem[] = [
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

const authoredBooks: RecordItem[] = [
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
  },
];

const bookChapters: RecordItem[] = [
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
  },
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
  },
];

const internationalPapers: RecordItem[] = [
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

const nationalPapers: RecordItem[] = [
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

const workshops: RecordItem[] = [
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

const seminars: RecordItem[] = [
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

const speeches: RecordItem[] = [
  {
    title: "Yapay Zeka ve Eğitim",
    venue: "İstanbul Medeniyet Üniversitesi Eğitim Fakültesi",
    year: "15.04.2026",
    scope: "Ulusal",
    details: "Yapay zeka ve eğitim ilişkisi.",
  },
  {
    title:
      "Gerçekliğin Gölgesinde: Yapay Zekâya Akıl, Kalp, Ruh ve Marifetle Bakmak",
    venue: "Ensar Vakfı Genel Merkezi",
    year: "22.11.2025",
    scope: "Ulusal",
    details: "Yapay zeka ile maneviyat ilişkisi.",
  },
  {
    title: "Yapay Zeka ve Günlük Hayat",
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

const conferenceOrganizations: RecordItem[] = [
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

const editors: RecordItem[] = [
  {
    title: "GÖÇ VE KÜLTÜREL ETKİLEŞİM (Migration and Cultural Interaction)",
    role: "Editör · Kitap",
    organization: "İstanbul Sabahattin Zaim Üniversitesi",
    startDate: "01.04.2019",
    endDate: "02.04.2019",
    scope: "Uluslararası",
    details:
      "Avustralya National Üniversitesi ve İstanbul Sabahattin Zaim Üniversitesi'nde görev yapan, koronadan vefat eden Prof. Dr. M. Mehdi İlhan Hoca anısına.",
  },
];

const certificates: RecordItem[] = [
  {
    title:
      "Marmara Üniversitesi – İşletme Bilimleri Uygulama ve Araştırma Merkezi",
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
];

const memberships: RecordItem[] = [
  {
    title: "INTERNATIONAL POLITICAL SCIENCE ASSOCIATION",
    role: "Üye",
    year: "2025",
    details: "Bilimsel Kuruluş",
  },
  {
    title: "ÜNDER – Üniversite Öğretim Elemanları Dayanışma Derneği",
    role: "Üye · Yüksek İstişare Kurulu Üyesi (20.10.2024)",
    year: "2023",
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
        className="mb-2 text-3xl font-bold text-[#1e3a5f] dark:text-[#e5edf7] md:text-4xl"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
      <div className="gold-line w-16 mt-3" />
    </div>
  );
}

function SubsectionTitle({ title }: { title: string }) {
  return (
    <h3
      className="mb-4 mt-1 text-2xl font-semibold text-[#1e3a5f] dark:text-[#dce8f5]"
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
}: {
  items: RecordItem[];
  venueLabel?: string;
  showRoleLabel?: boolean;
}) {
  const { isEnglish } = useLanguage();
  const translateValue = (value: string) => {
    if (!isEnglish) return value;
    const translations: Record<string, string> = {
      "Hâlen devam ediyor.": "Ongoing.",
      Ulusal: "National",
      Uluslararası: "International",
      Türkçe: "Turkish",
      İngilizce: "English",
      "Bilimsel Kitap": "Academic book",
      "Bilimsel Kuruluş": "Academic organization",
      Sertifika: "Certificate",
      Üye: "Member",
    };
    return translations[value] ?? value;
  };
  const localizedVenueLabel = isEnglish
    ? ({
        "Yer/Etkinlik": "Venue/Event",
        Dergi: "Journal",
        Etkinlik: "Event",
        Yer: "Venue",
      }[venueLabel] ?? venueLabel)
    : venueLabel;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(item => {
        // Yayınevi, basım ve sayfa bilgisi tek satırda toplanır; boş olanlar araya nokta koymadan atlanır.
        const imprint = [
          item.publisher,
          item.edition &&
            (isEnglish ? `${item.edition}. edition` : `${item.edition}. Basım`),
          item.pages &&
            (isEnglish ? `${item.pages} pages` : `${item.pages} sayfa`),
        ]
          .filter(Boolean)
          .join(" · ");

        return (
          <div
            key={`${item.title}-${item.chapter ?? item.year ?? item.startDate ?? "x"}`}
            className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors dark:border-white/10 dark:bg-[#151f2d] md:p-5"
          >
            <p className="min-w-0 break-words font-semibold leading-snug text-[#1e3a5f] dark:text-[#dce8f5]">
              {item.title}
            </p>
            {item.chapter && (
              <p className="mt-1 min-w-0 break-words text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
                {isEnglish ? "Chapter" : "Bölüm"}: {item.chapter}
              </p>
            )}
            {item.organization && (
              <p className="mt-1 min-w-0 break-words text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.organization}
              </p>
            )}
            <div className="mt-2 min-w-0 space-y-1 break-words text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {item.role && (
                <p>
                  {showRoleLabel
                    ? `${isEnglish ? "Role" : "Görev"}: ${translateValue(item.role)}`
                    : translateValue(item.role)}
                </p>
              )}
              {item.venue && (
                <p>
                  {localizedVenueLabel}: {item.venue}
                </p>
              )}
              {item.citation && (
                <p>
                  {isEnglish ? "Volume/Issue-Pages" : "Cilt/Sayı-Sayfa"}:{" "}
                  {item.citation}
                </p>
              )}
              {imprint && <p>{imprint}</p>}
              {item.editor && (
                <p>
                  {isEnglish ? "Editor" : "Editör"}: {item.editor}
                </p>
              )}
              {item.isbn && <p>ISBN: {item.isbn}</p>}
              {item.doi && (
                <p>
                  DOI:{" "}
                  <a
                    href={`https://doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-[#1e3a5f] underline underline-offset-2 transition-colors hover:text-[#c9a227] dark:text-[#9eb7d4]"
                  >
                    {item.doi}
                  </a>
                </p>
              )}
              {item.language && (
                <p>
                  {isEnglish ? "Language" : "Dil"}:{" "}
                  {translateValue(item.language)}
                </p>
              )}
              {item.scope && (
                <p>
                  {isEnglish ? "Scope" : "Kapsam"}: {translateValue(item.scope)}
                </p>
              )}
              {item.year && (
                <p>
                  {isEnglish ? "Date/Year" : "Tarih/Yıl"}: {item.year}
                </p>
              )}
              {(item.startDate || item.endDate) && (
                <p>
                  {isEnglish ? "Period" : "Süre"}: {item.startDate ?? "-"}{" "}
                  {item.endDate ? `- ${item.endDate}` : ""}
                </p>
              )}
              {item.details && <p>{translateValue(item.details)}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { isEnglish } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionId>("hakkinda");
  const [contactTab, setContactTab] = useState<"contact" | "cv">("contact");

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
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 88;
      const y =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const openCvRequest = () => {
    setContactTab("cv");
    scrollTo("iletisim");
  };

  const lisansCourses = courses.filter(course => course.level === "Lisans");
  const yuksekLisansCourses = courses.filter(
    course => course.level === "Yüksek Lisans"
  );
  const doktoraCourses = courses.filter(course => course.level === "Doktora");
  const displayedAbout = isEnglish ? aboutParagraphsEn : aboutParagraphs;
  const displayedEducation = isEnglish ? educationCardsEn : educationCards;

  useEffect(() => {
    document.title = isEnglish
      ? "Assoc. Prof. Dr. Orhan Albayrak"
      : "Doç. Dr. Orhan Albayrak";
  }, [isEnglish]);

  return (
    <div
      className="min-h-screen bg-white text-[#243247] transition-colors duration-300 dark:bg-[#0b111b] dark:text-[#d6dfeb]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <SinglePageDock activeSection={activeSection} onNavigate={scrollTo} />
      <MobileSidebar
        activeSection={activeSection}
        onNavigate={scrollTo}
        onOpenCvRequest={openCvRequest}
      />

      <section
        id="hakkinda"
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
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-20">
            <div className="animate-fade-in-up order-2 min-w-0 lg:order-1">
              <h1
                className="text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-[#14243b] dark:text-[#edf3fa]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Orhan
                <br />
                <span className="-mx-[0.08em] inline-block bg-gradient-to-r from-[#7a2948] via-[#a23b5e] to-[#c9a227] bg-clip-text px-[0.08em] pb-[0.08em] text-transparent italic">
                  Albayrak
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#42506a] dark:text-[#b3c0d0] md:text-xl">
                {isEnglish
                  ? "A multidisciplinary profile spanning Electronics Engineering and Political Science. Research on politics, artificial intelligence, and democracy in the digital age."
                  : "Elektronik Mühendisliği'nden Siyaset Bilimine uzanan çok disiplinli bir profil. Dijital çağda siyaset, yapay zeka ve demokrasi üzerine araştırmalar."}
              </p>
              <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  onClick={() => scrollTo("yayinlar")}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1e3a5f] px-4 py-3 font-semibold text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-0.5 hover:bg-[#142b49]"
                >
                  <BookOpen className="shrink-0" size={18} />
                  {isEnglish ? "Publications" : "Yayınları İncele"}
                </button>
                <button
                  onClick={() => {
                    setContactTab("contact");
                    scrollTo("iletisim");
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#1e3a5f]/20 bg-white/65 px-4 py-3 font-semibold text-[#1e3a5f] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#1e3a5f]/40 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  <Mail className="shrink-0" size={18} />
                  {isEnglish ? "Contact" : "İletişim"}
                </button>
                <button
                  onClick={openCvRequest}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#7a2948] px-4 py-3 font-semibold text-white shadow-lg shadow-[#7a2948]/15 transition hover:-translate-y-0.5 hover:bg-[#5d1e37]"
                >
                  <FileText className="shrink-0" size={18} />
                  {isEnglish ? "Request CV" : "CV Talep Et"}
                </button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#1e3a5f]/10 pt-5 text-sm text-[#5c6678] dark:border-white/10 dark:text-[#9dacbf]">
                <span>
                  <strong className="text-[#1e3a5f] dark:text-white">
                    2023
                  </strong>{" "}
                  {isEnglish ? "Associate Professor" : "Doçentlik"}
                </span>
                <span>
                  <strong className="text-[#1e3a5f] dark:text-white">
                    20K+
                  </strong>{" "}
                  {isEnglish ? "Employment impact" : "İstihdam etkisi"}
                </span>
                <span>
                  <strong className="text-[#1e3a5f] dark:text-white">3</strong>{" "}
                  {isEnglish ? "Disciplines" : "Disiplin"}
                </span>
              </div>
            </div>

            <div className="order-1 flex min-w-0 justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute inset-x-8 bottom-0 h-[78%] rounded-[5rem_5rem_8rem_2.5rem] bg-gradient-to-br from-[#14243b] via-[#1e3a5f] to-[#7a2948] shadow-[0_40px_80px_rgba(20,36,59,0.28)]" />
                <div className="absolute inset-x-2 bottom-4 h-[72%] rounded-[5rem_5rem_8rem_2.5rem] border border-white/25" />
                <div className="relative mx-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[4.5rem_4.5rem_7rem_2.25rem] border border-white/30 shadow-2xl">
                  <img
                    src={PROFILE_IMG}
                    alt={
                      isEnglish
                        ? "Assoc. Prof. Dr. Orhan Albayrak"
                        : "Doç. Dr. Orhan Albayrak"
                    }
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14243b]/80 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-2 max-w-[240px] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111a27]/90 sm:-left-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7a2948]">
                    {isEnglish ? "Academic focus" : "Akademik odak"}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-[#1e3a5f] dark:text-white">
                    {isEnglish
                      ? "Digital politics, democracy, and society"
                      : "Dijital siyaset, demokrasi ve toplum"}
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

      <section className="bg-white py-20 transition-colors dark:bg-[#0b111b]">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2">
                <SectionTitle title={isEnglish ? "About" : "Hakkında"} />
                <div className="space-y-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {displayedAbout.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#f8f9fc] p-6 transition-colors dark:border-white/10 dark:bg-[#111a27]">
                <h3
                  className="mb-4 text-lg font-semibold text-[#1e3a5f] dark:text-white"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {isEnglish ? "Key Information" : "Temel Bilgiler"}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {isEnglish ? "Birthplace" : "Doğum Yeri"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Arsin, Trabzon (1960)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {isEnglish ? "Title" : "Unvan"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {isEnglish ? "Associate Professor" : "Doçent Doktor"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {isEnglish ? "Current Institution" : "Mevcut Kurum"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {isEnglish
                          ? "Bezmialem Vakif University"
                          : "Bezmialem Vakıf Üniversitesi"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe
                      size={16}
                      className="text-[#c9a227] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-200">
                        {isEnglish ? "Languages" : "Diller"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {isEnglish
                          ? "Turkish, English, Ottoman Turkish"
                          : "Türkçe, İngilizce, Osmanlıca"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        id="egitim"
        className="scroll-mt-24 bg-[#f8f9fc] py-20 transition-colors dark:bg-[#111a27]"
      >
        <div className="container">
          <AnimatedSection>
            <SectionTitle title={isEnglish ? "Education" : "Eğitim"} />
            <div className="grid md:grid-cols-2 gap-6">
              {displayedEducation.map(edu => (
                <div
                  key={`${edu.degree}-${edu.years}`}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-[#151f2d]"
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
                      <h3
                        className="text-lg font-semibold leading-tight text-[#1e3a5f] dark:text-white"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {edu.field}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {edu.school}
                      </p>
                      <p className="mt-2 text-xs italic text-gray-400 dark:text-gray-500">
                        {edu.thesis}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        id="kariyer"
        className="scroll-mt-24 bg-white py-20 transition-colors dark:bg-[#0b111b]"
      >
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle
              title={isEnglish ? "Career" : "Kariyer"}
              subtitle={
                isEnglish
                  ? "Professional Experience and Appointments"
                  : "Mesleki Deneyim ve Görevler"
              }
            />

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Academic Appointments" : "Akademik Görev"}
              />
              <RecordCards items={academicRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Administrative Roles" : "İdari Görev"}
              />
              <RecordCards items={adminRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish
                    ? "Non-University Experience"
                    : "Üniversite Dışı Deneyim"
                }
              />
              <RecordCards items={externalExperiences} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Courses Taught" : "Verdiği Dersler"}
              />
              <div className="space-y-7">
                {[
                  {
                    label: isEnglish ? "Undergraduate" : "Lisans",
                    data: lisansCourses,
                  },
                  {
                    label: isEnglish ? "Master’s" : "Yüksek Lisans",
                    data: yuksekLisansCourses,
                  },
                  {
                    label: isEnglish ? "Doctoral" : "Doktora",
                    data: doktoraCourses,
                  },
                ].map(group => (
                  <div key={group.label}>
                    <h4
                      className="mb-3 text-xl font-semibold text-[#1e3a5f] dark:text-white"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {group.label}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {group.data.map((course, courseIndex) => (
                        <div
                          key={`${course.title}-${course.academicYear}-${course.term}-${courseIndex}`}
                          className="rounded-xl border border-gray-100 bg-[#f8f9fc] p-3 transition-colors dark:border-white/10 dark:bg-[#151f2d]"
                        >
                          <p className="break-words text-base font-medium leading-snug text-[#1e3a5f] dark:text-[#dce8f5]">
                            {course.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {isEnglish
                              ? course.language === "Türkçe"
                                ? "Turkish"
                                : "English"
                              : course.language}{" "}
                            ·{" "}
                            {isEnglish
                              ? course.term === "Güz"
                                ? "Fall"
                                : "Spring"
                              : course.term}{" "}
                            · {course.academicYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-8 md:mt-10">
              <SubsectionTitle
                title={isEnglish ? "Project Roles" : "Proje Görevleri"}
              />
              <RecordCards items={projectRoles} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        id="yayinlar"
        className="scroll-mt-24 bg-[#f8f9fc] py-20 transition-colors dark:bg-[#111a27]"
      >
        <div className="container space-y-14">
          <AnimatedSection className="space-y-10 md:space-y-12">
            <SectionTitle
              title={isEnglish ? "Publications" : "Yayınlar"}
              subtitle={isEnglish ? "Academic Work" : "Akademik Çalışmalar"}
            />

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish
                    ? "Articles in International Peer-Reviewed Journals"
                    : "Uluslararası Hakemli Dergilerde Yayımlanan Makaleler"
                }
              />
              <RecordCards items={internationalArticles} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish
                    ? "Articles in National Peer-Reviewed Journals"
                    : "Ulusal Hakemli Dergilerde Yayımlanan Makaleler"
                }
              />
              <RecordCards items={nationalArticles} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Other Publications" : "Diğer Yayınlar"}
              />
              <RecordCards items={otherPublications} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={isEnglish ? "Books" : "Kitaplarım"} />
              <RecordCards items={authoredBooks} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Book Chapters" : "Kitap Bölümleri"}
              />
              <RecordCards items={bookChapters} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish
                    ? "International Conference Papers"
                    : "Uluslararası Bildiriler"
                }
              />
              <RecordCards
                items={internationalPapers}
                venueLabel="Etkinlik"
                showRoleLabel={false}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish ? "National Conference Papers" : "Ulusal Bildiriler"
                }
              />
              <RecordCards
                items={nationalPapers}
                venueLabel="Etkinlik"
                showRoleLabel={false}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Editorial Work" : "Editörlük"}
              />
              <RecordCards items={editors} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={isEnglish ? "Talks" : "Konuşmalar"} />
              <RecordCards items={speeches} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={isEnglish ? "Workshops" : "Çalıştaylar"}
              />
              <RecordCards items={workshops} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={isEnglish ? "Seminars" : "Seminerler"} />
              <RecordCards items={seminars} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish ? "Conference Organization" : "Kongre Düzenleme"
                }
              />
              <RecordCards items={conferenceOrganizations} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle
                title={
                  isEnglish
                    ? "Research, Courses, and Certificates"
                    : "Araştırma, Kurs, Sertifika"
                }
              />
              <RecordCards items={certificates} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={isEnglish ? "Memberships" : "Üyelik"} />
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
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {isEnglish ? "World-Champion Project" : "Dünya Birincisi Proje"}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {isEnglish ? (
                <>
                  The Special Provincial Administration Vocational Courses
                  project, which provided employment for approximately{" "}
                  <strong className="text-[#c9a227]">20,000 people</strong>, was
                  named the world’s best project at the{" "}
                  <strong className="text-[#c9a227]">
                    World Chambers Competition
                  </strong>{" "}
                  held in Malaysia.
                </>
              ) : (
                <>
                  Yaklaşık{" "}
                  <strong className="text-[#c9a227]">20.000 kişiye</strong>{" "}
                  istihdam sağlayan Özel İdare Meslek Kursları projesi,
                  Malezya'da düzenlenen{" "}
                  <strong className="text-[#c9a227]">
                    Dünya Ticaret Odaları Proje Yarışması
                  </strong>
                  'nda dünya birincisi seçilmiştir.
                </>
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section
        id="iletisim"
        className="scroll-mt-24 bg-white py-20 transition-colors dark:bg-[#0b111b]"
      >
        <div className="container">
          <AnimatedSection>
            <SectionTitle
              title={isEnglish ? "Contact" : "İletişim"}
              subtitle={
                isEnglish
                  ? "Academic Collaboration and Enquiries"
                  : "Akademik İşbirliği ve Ulaşım"
              }
            />
            <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr] lg:items-start">
              <div className="rounded-3xl border border-gray-100 bg-[#f8f9fc] p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-[#111a27] md:p-8">
                <Tabs
                  value={contactTab}
                  onValueChange={value =>
                    setContactTab(value as "contact" | "cv")
                  }
                >
                  <TabsList className="mb-7 grid h-auto w-full grid-cols-2 rounded-full bg-white p-1.5 shadow-sm dark:bg-[#151f2d]">
                    <TabsTrigger
                      value="contact"
                      className="rounded-full py-2.5 data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white"
                    >
                      {isEnglish ? "Contact Form" : "İletişim Formu"}
                    </TabsTrigger>
                    <TabsTrigger
                      value="cv"
                      className="rounded-full py-2.5 data-[state=active]:bg-[#7a2948] data-[state=active]:text-white"
                    >
                      {isEnglish ? "Request CV" : "CV Talep Et"}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact">
                    <ContactForm />
                  </TabsContent>
                  <TabsContent value="cv">
                    <CvRequestForm />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-5">
                <a
                  href="mailto:orhan.albayrak@bezmialem.edu.tr"
                  className="group block rounded-3xl bg-[#1e3a5f] p-6 text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
                        {isEnglish ? "Direct contact" : "Doğrudan iletişim"}
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

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-[#151f2d]">
                  <h3
                    className="mb-5 text-lg font-semibold text-[#1e3a5f] dark:text-white"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {isEnglish
                      ? "Memberships & Affiliations"
                      : "Üyelikler & Bağlantılar"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: isEnglish
                          ? "Bezmialem Vakif University"
                          : "Bezmialem Vakıf Üniversitesi",
                        role: isEnglish
                          ? "Associate Professor"
                          : "Doçent Doktor",
                        url: "https://bezmialem.edu.tr",
                      },
                      {
                        name: isEnglish
                          ? "TDED – Turkish Language and Literature Association"
                          : "TDED – Türkiye Dil ve Edebiyat Derneği",
                        role: isEnglish
                          ? "Board Member"
                          : "Yönetim Kurulu Üyesi",
                        url: "https://www.tded.org.tr",
                      },
                      {
                        name: isEnglish
                          ? "Istanbul Chamber of Commerce"
                          : "İstanbul Ticaret Odası",
                        role: isEnglish ? "Assembly Member" : "Meclis Üyesi",
                        url: "https://www.ito.org.tr",
                      },
                      {
                        name: "İTÜ 1773 Teknopark A.Ş.",
                        role: isEnglish
                          ? "Board Member"
                          : "Yönetim Kurulu Üyesi",
                        url: "#",
                      },
                      {
                        name: isEnglish ? "FGA Foundation" : "FGA Vakfı",
                        role: isEnglish
                          ? "Chair of the Board of Trustees"
                          : "Mütevelli Heyet Başkanı",
                        url: "#",
                      },
                    ].map(aff => (
                      <div
                        key={aff.name}
                        className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0 dark:border-white/10"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#1e3a5f] dark:text-[#dce8f5]">
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

      <footer className="bg-[#1e3a5f] text-white py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="font-semibold text-lg"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {isEnglish ? "Assoc. Prof. Dr." : "Doç. Dr."} Orhan Albayrak
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a227] transition-colors text-sm"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a227] transition-colors text-sm"
              >
                <Instagram size={15} />
                Instagram
              </a>
              <a
                href="https://x.com/OrAlbayrak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a227] transition-colors text-sm"
              >
                <Twitter size={15} />
                Twitter
              </a>
              <a
                href="https://www.researchgate.net/profile/Orhan-Albayrak-6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a227] transition-colors text-sm"
              >
                <ExternalLink size={14} />
                ResearchGate
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
            © 2026 {isEnglish ? "Assoc. Prof. Dr." : "Doç. Dr."} Orhan
            Albayrak.{" "}
            {isEnglish ? "All rights reserved." : "Tüm hakları saklıdır."}
          </div>
        </div>
      </footer>
    </div>
  );
}
