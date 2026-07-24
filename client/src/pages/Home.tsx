import { translations, type Language } from "@/lib/i18n";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BOOKS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411377049/a6eGbShWTkuDAbFHmsAocG/books_bg-mJy7EiwSBa2fHWSKnAz6t2.webp";
const PROFILE_IMG = "/images/oalbayrakprofil_kolaj.png";

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
    title: "International Political Science Association (IPSA)",
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
        className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2"
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
      className="text-2xl font-semibold text-[#1e3a5f] mb-4 mt-1"
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
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(item => {
        // Yayınevi, basım ve sayfa bilgisi tek satırda toplanır; boş olanlar araya nokta koymadan atlanır.
        const imprint = [
          item.publisher,
          item.edition && `${item.edition}. Basım`,
          item.pages && `${item.pages} sayfa`,
        ]
          .filter(Boolean)
          .join(" · ");

        return (
          <div
            key={`${item.title}-${item.chapter ?? item.year ?? item.startDate ?? "x"}`}
            className="w-full min-w-0 overflow-hidden bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm"
          >
            <p className="font-semibold text-[#1e3a5f] leading-snug break-words min-w-0">
              {item.title}
            </p>
            {item.chapter && (
              <p className="text-sm text-gray-600 mt-1 italic leading-relaxed break-words min-w-0">
                Bölüm: {item.chapter}
              </p>
            )}
            {item.organization && (
              <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words min-w-0">
                {item.organization}
              </p>
            )}
            <div className="mt-2 space-y-1 text-sm text-gray-500 leading-relaxed break-words min-w-0">
              {item.role && (
                <p>{showRoleLabel ? `Görev: ${item.role}` : item.role}</p>
              )}
              {item.venue && (
                <p>
                  {venueLabel}: {item.venue}
                </p>
              )}
              {item.citation && <p>Cilt/Sayı-Sayfa: {item.citation}</p>}
              {imprint && <p>{imprint}</p>}
              {item.editor && <p>Editör: {item.editor}</p>}
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
              {item.language && <p>Dil: {item.language}</p>}
              {item.scope && <p>Kapsam: {item.scope}</p>}
              {item.year && <p>Tarih/Yıl: {item.year}</p>}
              {(item.startDate || item.endDate) && (
                <p>
                  Süre: {item.startDate ?? "-"}{" "}
                  {item.endDate ? `- ${item.endDate}` : ""}
                </p>
              )}
              {item.details && <p>{item.details}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("tr");
  const [activeSection, setActiveSection] = useState<SectionId>("hakkinda");
  const [contactTab, setContactTab] = useState<"contact" | "cv">("contact");

  const t = translations[lang];

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

  return (
    <div
      className="min-h-screen bg-white"
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
        onOpenCvRequest={openCvRequest}
        lang={lang}
        onLanguageChange={setLang}
      />

      <section
        id="hakkinda"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#f5f2eb] pb-16 pt-28 scroll-mt-24 md:pb-20"
      >
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-28 top-28 size-80 rounded-full bg-[#c9a227]/15 blur-3xl" />
        <div className="absolute -right-20 bottom-12 size-96 rounded-full bg-[#7a2948]/15 blur-3xl" />

        <div className="container relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <h1
                className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[#14243b]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#42506a] md:text-xl">
                {t.heroDesc}
              </p>
              <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  onClick={() => scrollTo("yayinlar")}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1e3a5f] px-4 py-3 font-semibold text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-0.5 hover:bg-[#142b49]"
                >
                  <BookOpen className="shrink-0" size={18} />
                  {t.explorePubs}
                </button>
                <button
                  onClick={() => {
                    setContactTab("contact");
                    scrollTo("iletisim");
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#1e3a5f]/20 bg-white/65 px-4 py-3 font-semibold text-[#1e3a5f] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#1e3a5f]/40 hover:bg-white"
                >
                  <Mail className="shrink-0" size={18} />
                  {t.contactBtn}
                </button>
                <button
                  onClick={openCvRequest}
                  className="flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#7a2948] px-4 py-3 font-semibold text-white shadow-lg shadow-[#7a2948]/15 transition hover:-translate-y-0.5 hover:bg-[#5d1e37]"
                >
                  <FileText className="shrink-0" size={18} />
                  {t.requestCv}
                </button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#1e3a5f]/10 pt-5 text-sm text-[#5c6678]">
                <span>
                  <strong className="text-[#1e3a5f]">2023</strong> Doçentlik
                </span>
                <span>
                  <strong className="text-[#1e3a5f]">20K+</strong> İstihdam
                  etkisi
                </span>
                <span>
                  <strong className="text-[#1e3a5f]">3</strong> Disiplin
                </span>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute inset-x-8 bottom-0 h-[78%] rounded-[5rem_5rem_8rem_2.5rem] bg-gradient-to-br from-[#14243b] via-[#1e3a5f] to-[#7a2948] shadow-[0_40px_80px_rgba(20,36,59,0.28)]" />
                <div className="absolute inset-x-2 bottom-4 h-[72%] rounded-[5rem_5rem_8rem_2.5rem] border border-white/25" />
                <div className="relative mx-auto aspect-square w-[88%] overflow-hidden rounded-[3rem] border border-white/30 bg-white p-2 shadow-2xl">
                  <img
                    src={PROFILE_IMG}
                    alt="Doç. Dr. Orhan Albayrak"
                    className="h-full w-full rounded-[2.5rem] object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14243b]/80 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-2 max-w-[280px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:-left-8">
                  <p className="text-sm font-medium italic leading-relaxed text-[#1e3a5f]">
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

      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2">
                <SectionTitle title={t.aboutTitle} />
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {t.aboutParagraphs.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                <h3
                  className="font-semibold text-[#1e3a5f] mb-4 text-lg"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {t.basicInfo.title}
                </h3>
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
              {educationCards.map(edu => (
                <div
                  key={`${edu.degree}-${edu.years}`}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
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
                </div>
              ))}
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
              <RecordCards items={academicRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.adminRole} />
              <RecordCards items={adminRoles} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.externalExp} />
              <RecordCards items={externalExperiences} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.coursesTaught} />
              <div className="space-y-7">
                {[
                  { label: "Lisans", data: lisansCourses },
                  { label: "Yüksek Lisans", data: yuksekLisansCourses },
                  { label: "Doktora", data: doktoraCourses },
                ].map(group => (
                  <div key={group.label}>
                    <h4
                      className="text-xl font-semibold text-[#1e3a5f] mb-3"
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
              <RecordCards items={projectRoles} />
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
              <RecordCards items={internationalArticles} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.natArticles} />
              <RecordCards items={nationalArticles} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.otherPubs} />
              <RecordCards items={otherPublications} venueLabel="Dergi" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.myBooks} />
              <RecordCards items={authoredBooks} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.bookChapters} />
              <RecordCards items={bookChapters} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.intPapers} />
              <RecordCards
                items={internationalPapers}
                venueLabel="Etkinlik"
                showRoleLabel={false}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.natPapers} />
              <RecordCards
                items={nationalPapers}
                venueLabel="Etkinlik"
                showRoleLabel={false}
              />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.editorship} />
              <RecordCards items={editors} />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.speeches} />
              <RecordCards items={speeches} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.workshops} />
              <RecordCards items={workshops} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.seminars} />
              <RecordCards items={seminars} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.conferences} />
              <RecordCards items={conferenceOrganizations} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.certificates} />
              <RecordCards items={certificates} venueLabel="Yer" />
            </div>

            <div className="space-y-4">
              <SubsectionTitle title={t.subsections.memberships} />
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
              {t.awardSection.title}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t.awardSection.desc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section id="iletisim" className="py-20 bg-white scroll-mt-24">
        <div className="container">
          <AnimatedSection>
            <SectionTitle title={t.contactBtn} />
            <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr] lg:items-start">
              <div className="rounded-3xl border border-gray-100 bg-[#f8f9fc] p-5 shadow-sm md:p-8">
                <Tabs
                  value={contactTab}
                  onValueChange={value =>
                    setContactTab(value as "contact" | "cv")
                  }
                >
                  <TabsList className="mb-7 grid h-auto w-full grid-cols-2 rounded-full bg-white p-1.5 shadow-sm">
                    <TabsTrigger
                      value="contact"
                      className="rounded-full py-2.5 data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white"
                    >
                      {t.contactFormTab}
                    </TabsTrigger>
                    <TabsTrigger
                      value="cv"
                      className="rounded-full py-2.5 data-[state=active]:bg-[#7a2948] data-[state=active]:text-white"
                    >
                      {t.cvFormTab}
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
                  <h3
                    className="mb-5 text-lg font-semibold text-[#1e3a5f]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {t.membershipsTitle}
                  </h3>
                  <div className="space-y-3">
                    {[
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
                        url: "#",
                      },
                      {
                        name: "FGA Vakfı",
                        role: "Mütevelli Heyet Başkanı",
                        url: "#",
                      },
                    ].map(aff => (
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

      <footer className="bg-[#1e3a5f] text-white py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="font-semibold text-lg"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Doç. Dr. Orhan Albayrak
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
            © 2026 Doç. Dr. Orhan Albayrak. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
