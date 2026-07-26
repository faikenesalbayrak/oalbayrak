import { useState } from "react";
import { Calendar, CalendarX, Building2, Image as ImageIcon, Copy, Check, Share2 } from "lucide-react";

export type MeetingContent = {
  images?: string[];
  paragraphs: {
    tr: string[];
    en: string[];
  };
};

export type ItoMonthlyReport = {
  year: number;
  month: number; // 1 to 12
  councilMeeting: MeetingContent; // Meclis Toplantısı
  committeeMeeting: MeetingContent; // Komite Toplantısı
};

const MONTHS_TR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022];

// Türkçe & İngilizce Sosyal Medya Paylaşım Metinleri
const INITIAL_REPORTS: ItoMonthlyReport[] = [
  {
    year: 2026,
    month: 7, // Temmuz 2026
    councilMeeting: {
      images: ["/images/ito-temmuz-2026-meclis-toplu-foto.jpg"],
      paragraphs: {
        tr: [
          "🏛️ Bugün İstanbul Ticaret Odamızın Temmuz 2026 Meclis Oturumu'nu meclis üyesi dostlarımız ve yönetim kurulumuzun katılımıyla gerçekleştirdik. İTO çatısı altında tüccarımızın, sanayicimizin ve eğitim dünyamızın güncel konularını detaylarıyla ele aldık.",
          "📊 Meclis gündemimizde temsilcisi olduğum Eğitim Komitesi bünyesinde yürüttüğümüz mesleki eğitim projelerini, nitelikli istihdam adımlarını ve sanayi-okul iş birliği çalışmalarını değerli meclis üyelerimizle paylaştık.",
          "🤝 Alınan kararların İstanbul'umuza ve iş dünyamıza hayırlı olmasını diliyorum. Üretmeye, eğitimin gücüyle yarınlarımızı inşa etmeye kararlılıkla devam ediyoruz. #İTO #İstanbulTicaretOdası #MeclisToplantısı #Eğitim",
        ],
        en: [
          "🏛️ Today, we held the July 2026 Assembly Session of the Istanbul Chamber of Commerce with the participation of our assembly members and board of directors. Under the ITO umbrella, we discussed key issues regarding our business community, economy, and education sector.",
          "📊 On our assembly agenda, we presented our ongoing vocational education projects, skilled workforce initiatives, and industry-school cooperation efforts carried out under the Education Committee.",
          "🤝 I hope the decisions taken will be beneficial to Istanbul and our business community. We continue to build our future through the power of education. #ITO #IstanbulChamberOfCommerce #AssemblyMeeting #Education",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-temmuz-2026-komite.jpg",
        "/images/ito-komite-kursu-140yil.jpg",
        "/images/ito-komite-duvar-logo.jpg",
        "/images/ito-komite-masasi-toplanti.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 İstanbul Ticaret Odası Eğitim Komitesi olarak Temmuz 2026 olağan toplantımızı komite üyelerimiz ve sektör temsilcilerimizin katılımıyla tamamladık.",
          "💡 Toplantımızda özel ve kamusal eğitim kurumlarımızın ihtiyaçlarını, müfredattaki dijital dönüşüm adımlarını ve genç nüfusumuzun geleceğin yetkinlikleriyle donatılmasına yönelik projelerimizi istişare ettik.",
          "🚀 Sektörümüzün sesini gür bir şekilde duyurmaya, nitelikli eğitimi ve üretken girişimciliği desteklemeye ara vermeden devam edeceğiz. Katkı sağlayan tüm komite üyelerimize teşekkür ediyorum. #İTO #EğitimKomitesi #MeslekiEğitim #İstanbul",
        ],
        en: [
          "🎓 As the Education Committee of the Istanbul Chamber of Commerce, we completed our July 2026 regular meeting with our committee members and sector representatives.",
          "💡 During our meeting, we evaluated the needs of our private and public educational institutions, digital transformation steps in curriculum, and projects aimed at equipping our youth with future competencies.",
          "🚀 We will continue to give a strong voice to our sector and support quality education and productive entrepreneurship. I thank all committee members for their contributions. #ITO #EducationCommittee #VocationalEducation #Istanbul",
        ],
      },
    },
  },
  {
    year: 2026,
    month: 6, // Haziran 2026
    councilMeeting: {
      images: ["/images/ito-meclis-salonu-oturum.jpg"],
      paragraphs: {
        tr: [
          "🏛️ İstanbul Ticaret Odası Haziran 2026 Meclis Toplantımızda küresel ticaret dinamiklerini ve kentimiz ekonomisine etkilerini değerlendirdik.",
          "📚 Eğitim ve istihdam alanında geliştirdiğimiz yeni stratejilerimizi meclis üyelerimizin takdirine sunduk. Hayırlara vesile olsun. #İTO #MeclisToplantısı",
        ],
        en: [
          "🏛️ At our Istanbul Chamber of Commerce June 2026 Assembly Meeting, we evaluated global trade dynamics and their impact on our city's economy.",
          "📚 We presented our new strategies in education and employment to the appreciation of our assembly members. #ITO #AssemblyMeeting",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-haziran-2026-komite.jpg",
        "/images/ito-komite-kursu-hitap.jpg",
        "/images/ito-komite-salonu-koltuklar.jpg",
        "/images/ito-sabri-orman-anma-programi.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 Eğitim Komitemizin Haziran 2026 toplantısında eğitim sektöründeki dijitalleşme ve yenilikçi müfredat çalışmalarını ele aldık.",
          "🤝 Sektör paydaşlarımızla el ele vererek eğitimde niteliği artırmak adına kararlılıkla çalışıyoruz. #İTO #EğitimKomitesi",
        ],
        en: [
          "🎓 At the June 2026 meeting of our Education Committee, we addressed digitalization in the education sector and innovative curriculum studies.",
          "🤝 We are working resolutely with our sector stakeholders to enhance quality in education. #ITO #EducationCommittee",
        ],
      },
    },
  },
  {
    year: 2026,
    month: 5, // Mayıs 2026
    councilMeeting: {
      images: ["/images/ito-meclis-calistay-oturum.jpg"],
      paragraphs: {
        tr: [
          "🏛️ İTO Mayıs 2026 Meclis Oturumu ve Eğitim Çalıştayı'nda mesleki ve teknik eğitimin niteliğini artırma odaklı oturumlarımızı tamamladık.",
          "🤝 Değerli meclis üyelerimiz ve akademisyenlerimizle birlikte geleceğin istihdam gereksinimlerini müzakere ettik. #İTO #MeclisToplantısı #EğitimÇalıştayı",
        ],
        en: [
          "🏛️ At the ITO May 2026 Assembly Session and Education Workshop, we completed our sessions focused on increasing the quality of vocational and technical education.",
          "🤝 Together with our esteemed assembly members and academics, we deliberated the future employment requirements. #ITO #AssemblyMeeting #EducationWorkshop",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-mayis-2026-komite.jpg",
        "/images/ito-komite-masasi-toplanti.jpg",
        "/images/ito-komite-duvar-logo.jpg",
        "/images/ito-komite-oturum-ikili.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 Eğitim Komitemizin Mayıs 2026 oturumunda sektörün beklentilerini ve dijital beceri dönüşüm projelerini değerlendirdik.",
          "🚀 Katkı sunan tüm dostlarımıza teşekkür ederiz. #İTO #EğitimKomitesi",
        ],
        en: [
          "🎓 At the May 2026 meeting of our Education Committee, we evaluated sector expectations and digital skill transformation projects.",
          "🚀 Thank you to all contributing members. #ITO #EducationCommittee",
        ],
      },
    },
  },
  {
    year: 2025,
    month: 12, // Aralık 2025
    councilMeeting: {
      images: ["/images/ito-meclis-toplanti-salonu-umasa.jpg"],
      paragraphs: {
        tr: [
          "🏛️ İTO Aralık 2025 Meclis Oturumu'nda kentimizin ticaret vizyonunu ve mesleki eğitim yatırımlarını ele aldık. #İTO #MeclisToplantısı",
        ],
        en: [
          "🏛️ At the ITO December 2025 Assembly Session, we discussed our city's trade vision and vocational education investments. #ITO #AssemblyMeeting",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-hamilik-projesi-10-aralik-2025.jpg",
        "/images/ito-komite-kursu-hitap.jpg",
        "/images/ito-sabri-orman-anma-programi.jpg",
        "/images/ito-komite-duvar-logo.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 10 Aralık 2025 tarihinde Milli Eğitim Bakanlığı ve İstanbul Milli Eğitim Müdürlüğü iş birliğiyle düzenlenen 'Mesleki Eğitim İş Birliği Protokolü - İTO Hamilik Projesi Müdürler Toplantısı'nda hitaplarımızı gerçekleştirdik.",
          "💡 Okul-sanayi entegrasyonu, hamilerimiz ile okullarımız arasındaki projeler ve mesleki eğitimin geleceği konularını değerli okul müdürlerimizle müzakere ettik. Ayrıca Prof. Dr. Sabri Orman'ı Anma Programı kapsamında hatırasını yad ettik. #İTO #İTOHamilikProjesi #MeslekiEğitim #EğitimKomitesi",
        ],
        en: [
          "🎓 On December 10, 2025, we delivered our speech at the 'Vocational Education Cooperation Protocol - ITO Mentorship Project Principals Meeting' held in cooperation with the Ministry of National Education and the Istanbul Provincial Directorate of National Education.",
          "💡 We evaluated school-industry integration and the future of vocational education with our school principals. We also commemorated Prof. Dr. Sabri Orman. #ITO #ITOMentorshipProject #VocationalEducation",
        ],
      },
    },
  },
  {
    year: 2026,
    month: 4, // Nisan 2026
    councilMeeting: {
      images: ["/images/ito-nisan-2026-meclis.png"],
      paragraphs: {
        tr: [
          "🏛️ İstanbul Ticaret Odası Nisan 2026 Meclis Oturumu'nu meclis üyelerimizin yoğun katılımıyla Meclis Salonumuzda gerçekleştirdik.",
          "📊 Kent ekonomisi, ticaret ve mesleki eğitim konularında komite çalışmalarımızı meclisimizin bilgisine sunduk. #İTO #MeclisToplantısı",
        ],
        en: [
          "🏛️ We held the Istanbul Chamber of Commerce April 2026 Assembly Session with full attendance of our assembly members in our Assembly Hall.",
          "📊 We presented our committee efforts on city economy, trade, and vocational education. #ITO #AssemblyMeeting",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-komite-salonu-koltuklar.jpg",
        "/images/ito-komite-kursu-140yil.jpg",
        "/images/ito-komite-masasi-toplanti.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 Eğitim Komitemizin Nisan 2026 toplantısında mesleki eğitim standartlarını ve üniversite-sanayi iş birliğini ele aldık.",
          "💡 Kararlarımızın sektörümüze hayırlı olmasını dileriz. #İTO #EğitimKomitesi",
        ],
        en: [
          "🎓 At the April 2026 meeting of our Education Committee, we discussed vocational education standards and university-industry cooperation.",
          "💡 We wish the decisions taken to be beneficial for our sector. #ITO #EducationCommittee",
        ],
      },
    },
  },

];

type ItoMonthlySectionProps = {
  lang: "tr" | "en";
};

export function ItoMonthlySection({ lang }: ItoMonthlySectionProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(6);

  // Kopyalama bildirim durumları (Metin ve Resim)
  const [copiedCouncilText, setCopiedCouncilText] = useState(false);
  const [copiedCouncilImages, setCopiedCouncilImages] = useState(false);

  const [copiedCommitteeText, setCopiedCommitteeText] = useState(false);
  const [copiedCommitteeImages, setCopiedCommitteeImages] = useState(false);

  const months = lang === "en" ? MONTHS_EN : MONTHS_TR;
  const monthName = months[selectedMonth - 1];

  const currentReport = INITIAL_REPORTS.find(
    r => r.year === selectedYear && r.month === selectedMonth
  );

  // Sol Kolon Başlığı: İTO Temmuz 2026 Meclis Toplantısı
  const councilTitle =
    lang === "en"
      ? `ITO ${monthName} ${selectedYear} Assembly Meeting`
      : `İTO ${monthName} ${selectedYear} Meclis Toplantısı`;

  // Sağ Kolon Başlığı: İTO Temmuz 2026 Eğitim Komite Toplantısı
  const committeeTitle =
    lang === "en"
      ? `ITO ${monthName} ${selectedYear} Education Committee Meeting`
      : `İTO ${monthName} ${selectedYear} Eğitim Komite Toplantısı`;

  // Sosyal medya metnini kopyalama fonksiyonu
  const handleCopyText = (paragraphs: string[], isCouncil: boolean) => {
    const textToCopy = paragraphs.join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    if (isCouncil) {
      setCopiedCouncilText(true);
      setTimeout(() => setCopiedCouncilText(false), 2000);
    } else {
      setCopiedCommitteeText(true);
      setTimeout(() => setCopiedCommitteeText(false), 2000);
    }
  };

  // Sosyal medya resimlerini kopyalama / panoya veya indirmeye alma fonksiyonu
  const handleCopyImages = async (images?: string[], isCouncil: boolean = true) => {
    if (isCouncil) {
      setCopiedCouncilImages(true);
      setTimeout(() => setCopiedCouncilImages(false), 2000);
    } else {
      setCopiedCommitteeImages(true);
      setTimeout(() => setCopiedCommitteeImages(false), 2000);
    }

    if (!images || images.length === 0) return;

    try {
      const imgUrl = images[0];
      const response = await fetch(imgUrl);
      const blob = await response.blob();

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type || "image/png"]: blob }),
        ]);
      }
    } catch {
      const links = images.map(img => window.location.origin + img).join("\n");
      await navigator.clipboard.writeText(links);
    }
  };

  // Dinamik Resim Izgara Düzeni (2, 3 veya 4 Resim)
  const renderImageGrid = (images?: string[]) => {
    const count = images ? images.length : 0;

    if (count > 0 && images) {
      let gridColsClass = "grid-cols-2";
      if (count === 3) gridColsClass = "grid-cols-3";
      if (count >= 4) gridColsClass = "grid-cols-2 sm:grid-cols-4";

      return (
        <div className={`grid ${gridColsClass} gap-2.5 mb-6`}>
          {images.slice(0, 4).map((imgUrl, idx) => (
            <div
              key={idx}
              className="aspect-4/3 rounded-xl overflow-hidden bg-gray-50 border border-gray-200/80 p-1.5 shadow-xs group relative"
            >
              <img
                src={imgUrl}
                alt={`${lang === "en" ? "Image" : "Görsel"} ${idx + 1}`}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Görsel yoksa esnek 2-4 yer tutucu kutu göster
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {[1, 2, 3, 4].map(num => (
          <div
            key={num}
            className="aspect-4/3 rounded-xl bg-[#f8f9fc] border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-2 text-center"
          >
            <ImageIcon size={22} className="mb-1 text-gray-300" />
            <span className="text-[11px] font-medium">
              {lang === "en" ? `Image ${num}` : `Resim ${num}`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Meclis toplantısı varsayılan paragrafları (TR / EN)
  const defaultCouncilParas =
    lang === "en"
      ? [
          `🏛️ Today, we conducted the ${monthName} ${selectedYear} Assembly Meeting of the Istanbul Chamber of Commerce. We deliberated critical topics regarding our city's economy and education sector.`,
          `📊 On our assembly agenda, we presented our ongoing vocational education projects carried out under the Education Committee with our assembly members.`,
          `🤝 We remain committed to supporting quality education and serving Istanbul. #ITO #IstanbulChamberOfCommerce #${monthName}${selectedYear}`,
        ]
      : [
          `🏛️ Bugün İstanbul Ticaret Odamızın ${monthName} ${selectedYear} Meclis Toplantısı'nı gerçekleştirdik. Kentimiz ekonomisine, iş dünyamıza ve eğitim sektörümüze dair kritik başlıkları meclis gündemimizde müzakere ettik.`,
          `📊 Eğitim Komitesi bünyesinde yürüttüğümüz çalışmalarımızı ve mesleki eğitim projelerimizi meclis üyelerimizin bilgisine sunduk.`,
          `🤝 Üretmeye, nitelikli eğitimi desteklemeye ve İstanbul'umuz için çalışmaya kararlılıkla devam ediyoruz. #İTO #İstanbulTicaretOdası #MeclisToplantısı #${monthName}${selectedYear}`,
        ];

  // Komite toplantısı varsayılan paragrafları (TR / EN)
  const defaultCommitteeParas =
    lang === "en"
      ? [
          `🎓 As the Education Committee of the Istanbul Chamber of Commerce, we completed our ${monthName} ${selectedYear} regular meeting.`,
          `💡 We evaluated our sector's demands, digital transformation steps in education, and future skill requirements.`,
          `🚀 We will continue to build the future through education and add value to our sector. #ITO #EducationCommittee #${monthName}${selectedYear}`,
        ]
      : [
          `🎓 İstanbul Ticaret Odası Eğitim Komitesi olarak ${monthName} ${selectedYear} olağan toplantımızı değerli komite üyelerimizle birlikte tamamladık.`,
          `💡 Sektörümüzün talep ve beklentilerini, eğitimde dijital dönüşüm adımlarını ve geleceğin mesleki becerilerini detaylarıyla değerlendirdik.`,
          `🚀 Eğitimin gücüyle geleceği inşa etmeye ve sektörümüze değer katmaya devam edeceğiz. Katkı sunan tüm dostlarımıza teşekkür ediyorum. #İTO #EğitimKomitesi #MeslekiEğitim #${monthName}${selectedYear}`,
        ];

  const councilParagraphs =
    currentReport?.councilMeeting.paragraphs[lang] || defaultCouncilParas;
  const committeeParagraphs =
    currentReport?.committeeMeeting.paragraphs[lang] || defaultCommitteeParas;

  return (
    <section id="ito-bu-ay" className="py-20 bg-[#f8f9fc] scroll-mt-24">
      <div className="container">
        {/* Başlık ve Ay/Yıl Seçici */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200/80">
          <div>
            <div className="flex items-center gap-2 text-[#c9a227] text-sm font-semibold tracking-wider uppercase mb-2">
              <Building2 size={18} />
              <span>{lang === "en" ? "Istanbul Chamber of Commerce" : "İstanbul Ticaret Odası"}</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1e3a5f]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {lang === "en"
                ? "This Month in ITO Assembly & Education Committee"
                : "İTO Meclis ve Eğitim Komitesinde Bu Ay"}
            </h2>
            <p className="text-gray-500 mt-1 text-base">
              {lang === "en"
                ? "Select a month and year to view the reports and evaluations for assembly and committee meetings."
                : "Seçtiğiniz ay ve yıla ait meclis ve komite toplantısına ait değerlendirmeleri okuyabilirsiniz."}
            </p>
          </div>

          {/* Ay & Yıl Dönem Seçim Alanı */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-2xl border border-gray-200/80 shadow-sm">
            {/* Ay Seçimi Dropdown */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f9fc] rounded-xl text-sm font-medium text-[#1e3a5f]">
              <Calendar size={16} className="text-[#c9a227]" />
              <span>{lang === "en" ? "Month:" : "Ay:"}</span>
            </div>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
              aria-label={lang === "en" ? "Select Month" : "Ay Seçiniz"}
              className="px-3.5 py-2 bg-[#f8f9fc] hover:bg-gray-100 text-[#1e3a5f] font-semibold text-sm rounded-xl border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 cursor-pointer transition-all"
            >
              {months.map((m, idx) => (
                <option key={m} value={idx + 1}>
                  {m}
                </option>
              ))}
            </select>

            {/* Yıl Seçimi Dropdown */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f9fc] rounded-xl text-sm font-medium text-[#1e3a5f]">
              <span>{lang === "en" ? "Year:" : "Yıl:"}</span>
            </div>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              aria-label={lang === "en" ? "Select Year" : "Yıl Seçiniz"}
              className="px-3.5 py-2 bg-[#f8f9fc] hover:bg-gray-100 text-[#1e3a5f] font-semibold text-sm rounded-xl border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 cursor-pointer transition-all"
            >
              {YEARS.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Seçili Dönem Rozeti */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#1e3a5f] text-white text-xs font-bold rounded-xl shadow-xs">
              <span>{monthName} {selectedYear}</span>
            </div>
          </div>
        </div>

        {/* Hızlı Dönem Butonları (Aktif İçeriği Olan Aylar) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {INITIAL_REPORTS.map(rep => {
            const isSel = selectedMonth === rep.month && selectedYear === rep.year;
            const mLabel = months[rep.month - 1];
            return (
              <button
                key={`${rep.month}-${rep.year}`}
                type="button"
                onClick={() => {
                  setSelectedMonth(rep.month);
                  setSelectedYear(rep.year);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isSel
                    ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1e3a5f]/40 hover:text-[#1e3a5f]"
                }`}
              >
                {mLabel} {rep.year}
              </button>
            );
          })}
        </div>

        {/* İÇERİK ALANI: Dolu veya Boş Görünüm */}
        {currentReport ? (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* SOL KOLON: İTO [Ay [Yıl]] Meclis Toplantısı */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="px-3 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 size={13} />
                    <span>{lang === "en" ? "Assembly Post" : "Meclis Paylaşımı"}</span>
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {monthName} {selectedYear}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#1e3a5f] leading-snug"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {councilTitle}
                  </h3>

                  {/* ÇİFT KOPYALAMA BUTONU: Metni Kopyala & Resimleri Kopyala */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Metni Kopyala */}
                    <button
                      type="button"
                      onClick={() => handleCopyText(councilParagraphs, true)}
                      title={lang === "en" ? "Copy text" : "Metni kopyala"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#1e3a5f]/10 text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCouncilText ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span className="text-green-600 font-bold">{lang === "en" ? "Copied!" : "Kopyalandı!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>{lang === "en" ? "Copy Text" : "Metni Kopyala"}</span>
                        </>
                      )}
                    </button>

                    {/* Resimleri Kopyala */}
                    <button
                      type="button"
                      onClick={() => handleCopyImages(currentReport?.councilMeeting.images, true)}
                      title={lang === "en" ? "Copy images" : "Resimleri kopyala"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#c9a227]/15 text-[#8c6f14] hover:bg-[#c9a227] hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCouncilImages ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span className="text-green-600 font-bold">
                            {lang === "en" ? "Copied!" : "Resim Kopyalandı!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} />
                          <span>{lang === "en" ? "Copy Images" : "Resimleri Kopyala"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Görseller (2-4 Resim Alanı) */}
                {renderImageGrid(currentReport?.councilMeeting.images)}

                {/* Paragraflar (Sosyal Medya Mesaj Formatında) */}
                <div className="space-y-3.5 bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed">
                  {councilParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* SAĞ KOLON: İTO [Ay [Yıl]] Eğitim Komite Toplantısı */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <span className="px-3 py-1 bg-[#c9a227]/15 text-[#8c6f14] text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 size={13} />
                    <span>{lang === "en" ? "Committee Post" : "Komite Paylaşımı"}</span>
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {monthName} {selectedYear}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#1e3a5f] leading-snug"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {committeeTitle}
                  </h3>

                  {/* ÇİFT KOPYALAMA BUTONU: Metni Kopyala & Resimleri Kopyala */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Metni Kopyala */}
                    <button
                      type="button"
                      onClick={() => handleCopyText(committeeParagraphs, false)}
                      title={lang === "en" ? "Copy text" : "Metni kopyala"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#1e3a5f]/10 text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCommitteeText ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span className="text-green-600 font-bold">{lang === "en" ? "Copied!" : "Kopyalandı!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>{lang === "en" ? "Copy Text" : "Metni Kopyala"}</span>
                        </>
                      )}
                    </button>

                    {/* Resimleri Kopyala */}
                    <button
                      type="button"
                      onClick={() => handleCopyImages(currentReport?.committeeMeeting.images, false)}
                      title={lang === "en" ? "Copy images" : "Resimleri kopyala"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#c9a227]/15 text-[#8c6f14] hover:bg-[#c9a227] hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCommitteeImages ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span className="text-green-600 font-bold">
                            {lang === "en" ? "Copied!" : "Resim Kopyalandı!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} />
                          <span>{lang === "en" ? "Copy Images" : "Resimleri Kopyala"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Görseller (2-4 Resim Alanı) */}
                {renderImageGrid(currentReport?.committeeMeeting.images)}

                {/* Paragraflar (Sosyal Medya Mesaj Formatında) */}
                <div className="space-y-3.5 bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed">
                  {committeeParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* BOŞ GÖRÜNÜM (Ağustos 2026 vb. henüz içerik olmayan aylar için) */
          <div className="bg-white rounded-2xl p-10 md:p-14 border border-dashed border-gray-300 text-center flex flex-col items-center justify-center my-4 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f] mb-4">
              <CalendarX size={32} className="text-[#c9a227]" />
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-[#1e3a5f] mb-2"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {lang === "en"
                ? `${monthName} ${selectedYear} Evaluation Not Available Yet`
                : `${monthName} ${selectedYear} Toplantı Değerlendirmesi Bulunmamaktadır`}
            </h3>
            <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
              {lang === "en"
                ? "No assembly or committee meeting evaluations have been uploaded for this period yet. New meeting reports will appear here as they take place."
                : "Seçtiğiniz dönem için henüz meclis veya komite toplantı değerlendirmesi eklenmemiştir. Yeni toplantı raporları gerçekleştiğinde bu alanda yayınlanacaktır."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
