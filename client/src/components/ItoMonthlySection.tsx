import { useState } from "react";
import { Calendar, CalendarX, Building2, Image as ImageIcon, Copy, Check, Share2, Download } from "lucide-react";

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
    month: 8, // Ağustos 2026
    councilMeeting: {
      images: [
        "/images/ito-agustos-2026-sekip-avdagic.jpg",
        "/images/ito-agustos-2026-meclis-salonu.jpg",
      ],
      paragraphs: {
        tr: [
          "🏛️ İstanbul Ticaret Odamızın Ağustos 2026 Meclis Oturumu'nu İTO Başkanımız Şekip Avdagiç'in hitapları ve meclis üyelerimizin katılımıyla gerçekleştirdik. Oturumumuzda Türkiye'nin ekonomik vizyonu, dezenflasyon süreci ve güncel stratejik meselelerimizi kapsayıcı bir şekilde değerlendirdik.",
          "🇹🇷 Malazgirt Zaferi ve Büyük Taarruz gibi tarihi dönüm noktalarımızı yad ederek milli birlik ile ekonomik bağımsızlık arasındaki güçlü bağı vurguladık. Enflasyonla mücadelede üretim kapasitesini korumanın önemine dikkat çekilerek ihracatçılarımızın finansmana erişimi ve artan maliyetler karşısında desteklenmesi çağrısında bulunuldu.",
          "📊 Küresel finansal riskler, enerji piyasaları ve dijitalleşen üretim modellerinin yanı sıra eğitim ve sanayi alanındaki yapısal reformların önemi üzerinde duruldu. Ülkemizin küresel tedarik zincirindeki avantajlı konumunu korumak için kararlılıkla çalışmaya devam ediyoruz. #İTO #İstanbulTicaretOdası #MeclisToplantısı #ŞekipAvdagiç #Ekonomi",
        ],
        en: [
          "🏛️ We conducted the August 2026 Assembly Session of the Istanbul Chamber of Commerce with the opening address of ITO President Şekip Avdagiç and the participation of our assembly members. We comprehensively evaluated Türkiye's economic vision and strategic affairs.",
          "🇹🇷 Commemorating historic milestones such as the Victory of Manzikert and the Great Offensive, the strong link between national unity and economic independence was emphasized. Supporting exporters' access to finance and protecting production capacity were highlighted.",
          "📊 Global financial dynamics, structural reforms in education and industry, and Türkiye's advantageous position in global supply chains were addressed. #ITO #IstanbulChamberOfCommerce #AssemblyMeeting #Economy",
        ],
      },
    },
    committeeMeeting: {
      images: [
        "/images/ito-komite-masasi-toplanti.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 İstanbul Ticaret Odası Eğitim Komitesi Ağustos 2026 olağan toplantısı 26 Ağustos 2026 tarihinde gerçekleştirilecektir. Toplantı henüz yapılmamıştır. #İTO #EğitimKomitesi",
        ],
        en: [
          "🎓 The August 2026 meeting of the Istanbul Chamber of Commerce Education Committee will be held on August 26, 2026. The meeting has not taken place yet. #ITO #EducationCommittee",
        ],
      },
    },
  },
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
        "/images/ito-temmuz-2026-komite-toplanti.jpg",
        "/images/ito-temmuz-2026-komite-zoom.jpg",
        "/images/ito-temmuz-2026-komite.jpg",
        "/images/ito-komite-masasi-toplanti.jpg",
      ],
      paragraphs: {
        tr: [
          "🎓 İstanbul Ticaret Odası Eğitim Komitesi olarak Temmuz 2026 olağan toplantımızı komite üyelerimizin katılımıyla gerçekleştirdik.",
          "💡 Toplantımızda mahkemelerden gelen yazıların görüşülmesinin yanı sıra, BTM (Bilgiyi Ticarileştirme Merkezi) tarafından Yapay Zeka ile çocuklara uygun metinler ve hikayeler üretilmesi ile ilgili kapsamlı bir sunum dinledik.",
          "📚 Ayrıca gündemimizde Üniversite seçme sınavları ve tercih süreçleri detaylarıyla ele alındı. Kararlarımızın eğitim dünyamıza hayırlı olmasını diliyorum. #İTO #EğitimKomitesi #BTM #YapayZeka #YKS",
        ],
        en: [
          "🎓 As the Education Committee of the Istanbul Chamber of Commerce, we completed our July 2026 meeting with our committee members.",
          "💡 In addition to discussing official correspondence from courts, a presentation was delivered by BTM (Commercialization Center of Istanbul) on generating child-friendly texts and stories using Artificial Intelligence.",
          "📚 We also focused on university entrance examinations and preference processes. #ITO #EducationCommittee #BTM #ArtificialIntelligence #UniversityExams",
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
  // Mevcut takvim yılı ve ayı (Otomatik güncel aydan başlatmak için)
  const currentDate = new Date();
  const currentRealYear = currentDate.getFullYear();
  const currentRealMonth = currentDate.getMonth() + 1; // 1 to 12

  // Meclis (Council) bağımsız Ay / Yıl seçimi
  const [councilYear, setCouncilYear] = useState<number>(currentRealYear);
  const [councilMonth, setCouncilMonth] = useState<number>(currentRealMonth);

  // Komite (Committee) bağımsız Ay / Yıl seçimi
  const [committeeYear, setCommitteeYear] = useState<number>(currentRealYear);
  const [committeeMonth, setCommitteeMonth] = useState<number>(currentRealMonth);

  // Kopyalama bildirim durumları (Metin ve Resim)
  const [copiedCouncilText, setCopiedCouncilText] = useState(false);
  const [copiedCouncilImages, setCopiedCouncilImages] = useState(false);

  const [copiedCommitteeText, setCopiedCommitteeText] = useState(false);
  const [copiedCommitteeImages, setCopiedCommitteeImages] = useState(false);

  const months = lang === "en" ? MONTHS_EN : MONTHS_TR;

  const councilMonthName = months[councilMonth - 1];
  const committeeMonthName = months[committeeMonth - 1];

  const councilReport = INITIAL_REPORTS.find(
    r => r.year === councilYear && r.month === councilMonth
  );

  const committeeReport = INITIAL_REPORTS.find(
    r => r.year === committeeYear && r.month === committeeMonth
  );

  // Sol Kolon Başlığı: İTO [Ay Yıl] Meclis Toplantısı
  const councilTitle =
    lang === "en"
      ? `ITO ${councilMonthName} ${councilYear} Assembly Meeting`
      : `İTO ${councilMonthName} ${councilYear} Meclis Toplantısı`;

  // Sağ Kolon Başlığı: İTO [Ay Yıl] Eğitim Komite Toplantısı
  const committeeTitle =
    lang === "en"
      ? `ITO ${committeeMonthName} ${committeeYear} Education Committee Meeting`
      : `İTO ${committeeMonthName} ${committeeYear} Eğitim Komite Toplantısı`;

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

  // Resmi bilgisayara doğrudan indirme fonksiyonu
  const handleDownloadImage = (imgUrl: string) => {
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = imgUrl.split("/").pop() || "ito-gorsel.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Tüm görselleri Canvas ile PNG'ye çevirip hepsini tek seferde Panoya Kopyalama
  const copyAllImagesToClipboard = async (images: string[]): Promise<boolean> => {
    if (!images || images.length === 0) return false;

    try {
      const clipboardItems: ClipboardItem[] = [];

      for (const imgUrl of images) {
        try {
          const response = await fetch(imgUrl);
          const blob = await response.blob();

          const img = document.createElement("img");
          const url = URL.createObjectURL(blob);

          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = url;
          });

          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          const pngBlob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, "image/png")
          );

          if (pngBlob) {
            clipboardItems.push(new ClipboardItem({ "image/png": pngBlob }));
          }
        } catch (e) {
          console.warn("Görsel dönüştürülürken hata:", imgUrl, e);
        }
      }

      if (clipboardItems.length > 0 && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write(clipboardItems);
        return true;
      }
    } catch (err) {
      console.warn("Tüm görseller panoya yazılırken hata:", err);
    }
    return false;
  };

  // Sosyal medya resimlerinin HEPSİNİ kopyalama veya indirme fonksiyonu
  const handleCopyImages = async (images?: string[], isCouncil: boolean = true) => {
    if (isCouncil) {
      setCopiedCouncilImages(true);
      setTimeout(() => setCopiedCouncilImages(false), 2000);
    } else {
      setCopiedCommitteeImages(true);
      setTimeout(() => setCopiedCommitteeImages(false), 2000);
    }

    if (!images || images.length === 0) return;

    // Tüm görselleri panoya kopyalamayı dene; kopyalama desteklenmezse hepsini sırayla indir
    const success = await copyAllImagesToClipboard(images);
    if (!success) {
      images.forEach((imgUrl, i) => {
        setTimeout(() => handleDownloadImage(imgUrl), i * 300);
      });
    }
  };

  // Dinamik Resim Izgara Düzeni (2, 3 veya 4 Resim) + Her Resim Üzerinde Hızlı Kopyalama/İndirme
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
              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono z-10">
                #{idx + 1}
              </span>

              {/* Hover Eylemleri: Kopyala & İndir Butonları */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAllImagesToClipboard([imgUrl]).then((ok: boolean) => {
                      if (!ok) handleDownloadImage(imgUrl);
                    });
                  }}
                  title={lang === "en" ? "Copy Image" : "Resmi Kopyala"}
                  className="p-1.5 bg-white text-[#1e3a5f] rounded-lg shadow-sm hover:bg-[#1e3a5f] hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1 font-semibold"
                >
                  <Copy size={12} />
                  <span>{lang === "en" ? "Copy" : "Kopyala"}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadImage(imgUrl);
                  }}
                  title={lang === "en" ? "Download" : "İndir"}
                  className="p-1.5 bg-[#c9a227] text-white rounded-lg shadow-sm hover:bg-[#8c6f14] transition-all cursor-pointer text-xs flex items-center gap-1 font-semibold"
                >
                  <Download size={12} />
                  <span>{lang === "en" ? "Download" : "İndir"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

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

  // Seçili ayın ikinci perşembesini hesaplama fonksiyonu
  const getSecondThursday = (year: number, month: number) => {
    let thursdayCount = 0;
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      if (date.getDay() === 4) { // 4: Perşembe
        thursdayCount++;
        if (thursdayCount === 2) {
          return date;
        }
      }
      date.setDate(date.getDate() + 1);
    }
    return new Date(year, month - 1, 14); // Varsayılan yedek
  };

  // Seçili ayın ikinci perşembesi henüz gelmedi mi kontrolü
  const isBeforeSecondThursday = (year: number, month: number) => {
    if (year > currentRealYear) return true;
    if (year < currentRealYear) return false;
    if (month > currentRealMonth) return true;
    if (month < currentRealMonth) return false;
    
    // Aynı yıl ve aynı ay içindeyiz
    const secondThursday = getSecondThursday(year, month);
    // Saat/dakika farkından etkilenmemek için gün başlangıcını kıyasla
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    return today < secondThursday;
  };

  // Meclis toplantısı varsayılan paragrafları (TR / EN)
  const defaultCouncilParas = isBeforeSecondThursday(councilYear, councilMonth)
    ? lang === "en"
      ? [
          `📅 The Assembly Meeting for ${councilMonthName} ${councilYear} has not been held yet as the second Thursday of the month has not arrived.`,
          `ℹ️ Assembly meetings are held on the second Thursday of every month. News and details will be shared here after the meeting.`
        ]
      : [
          `📅 ${councilMonthName} ${councilYear} ayının henüz ikinci perşembesi gelmediği için meclis toplantısı henüz yapılmamıştır.`,
          `ℹ️ Her ayın ikinci perşembesi gerçekleştirilen meclis toplantısının ardından detaylar ve kararlar burada yayınlanacaktır.`
        ]
    : lang === "en"
      ? [
          `🏛️ Today, we conducted the ${councilMonthName} ${councilYear} Assembly Meeting of the Istanbul Chamber of Commerce. We deliberated critical topics regarding our city's economy and education sector.`,
          `📊 On our assembly agenda, we presented our ongoing vocational education projects carried out under the Education Committee with our assembly members.`,
          `🤝 We remain committed to supporting quality education and serving Istanbul. #ITO #IstanbulChamberOfCommerce #${councilMonthName}${councilYear}`,
        ]
      : [
          `🏛️ Bugün İstanbul Ticaret Odamızın ${councilMonthName} ${councilYear} Meclis Toplantısı'nı gerçekleştirdik. Kentimiz ekonomisine, iş dünyamıza ve eğitim sektörümüze dair kritik başlıkları meclis gündemimizde müzakere ettik.`,
          `📊 Eğitim Komitesi bünyesinde yürüttüğümüz çalışmalarımızı ve mesleki eğitim projelerimizi meclis üyelerimizin bilgisine sunduk.`,
          `🤝 Üretmeye, nitelikli eğitimi desteklemeye ve İstanbul'umuz için çalışmaya kararlılıkla devam ediyoruz. #İTO #İstanbulTicaretOdası #MeclisToplantısı #${councilMonthName}${councilYear}`,
        ];

  // Komite toplantısı varsayılan paragrafları (TR / EN)
  const defaultCommitteeParas = isBeforeSecondThursday(committeeYear, committeeMonth)
    ? lang === "en"
      ? [
          `📅 The Education Committee Meeting for ${committeeMonthName} ${committeeYear} has not been held yet as the second Thursday of the month has not arrived.`,
          `ℹ️ Committee meetings are held on the second Thursday of every month. Agenda items and decisions will be updated after the meeting.`
        ]
      : [
          `📅 ${committeeMonthName} ${committeeYear} ayının henüz ikinci perşembesi gelmediği için komite toplantısı henüz yapılmamıştır.`,
          `ℹ️ Her ayın ikinci perşembesi gerçekleştirilen Eğitim Komitesi toplantısının ardından alınan kararlar ve gelişmeler burada yer alacaktır.`
        ]
    : lang === "en"
      ? [
          `🎓 As the Education Committee of the Istanbul Chamber of Commerce, we completed our ${committeeMonthName} ${committeeYear} regular meeting.`,
          `💡 We evaluated our sector's demands, digital transformation steps in education, and future skill requirements.`,
          `🚀 We will continue to build the future through education and add value to our sector. #ITO #EducationCommittee #${committeeMonthName}${committeeYear}`,
        ]
      : [
          `🎓 İstanbul Ticaret Odası Eğitim Komitesi olarak ${committeeMonthName} ${committeeYear} olağan toplantımızı değerli komite üyelerimizle birlikte tamamladık.`,
          `💡 Sektörümüzün talep ve beklentilerini, eğitimde dijital dönüşüm adımlarını ve geleceğin mesleki becerilerini detaylarıyla değerlendirdik.`,
          `🚀 Eğitimin gücüyle geleceği inşa etmeye ve sektörümüze değer katmaya devam edeceğiz. Katkı sunan tüm dostlarımıza teşekkür ediyorum. #İTO #EğitimKomitesi #MeslekiEğitim #${committeeMonthName}${committeeYear}`,
        ];

  const councilParagraphs =
    councilReport?.councilMeeting.paragraphs[lang] || defaultCouncilParas;
  const committeeParagraphs =
    committeeReport?.committeeMeeting.paragraphs[lang] || defaultCommitteeParas;

  return (
    <section id="ito-bu-ay" className="py-20 bg-[#f8f9fc] scroll-mt-24">
      <div className="container">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-gray-200/80">
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
                ? "ITO Assembly & Education Committee Meetings"
                : "İTO Meclis ve Eğitim Komitesi Toplantıları"}
            </h2>
            <p className="text-gray-500 mt-1 text-base">
              {lang === "en"
                ? "Select a month and year independently for assembly and committee meetings to view reports."
                : "Meclis ve Eğitim Komitesi toplantıları için ayrı ayrı ay ve yıl seçerek ilgili raporları inceleyebilirsiniz."}
            </p>
          </div>

          {/* Hızlı İki Dönem Eşleme Butonları */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-gray-400 font-medium shrink-0 flex items-center gap-1">
              <Calendar size={13} className="text-[#c9a227]" />
              {lang === "en" ? "Quick Select:" : "Hızlı Seç:"}
            </span>
            {INITIAL_REPORTS.map(rep => {
              const isSelBoth =
                councilMonth === rep.month &&
                councilYear === rep.year &&
                committeeMonth === rep.month &&
                committeeYear === rep.year;
              const mLabel = months[rep.month - 1];
              return (
                <button
                  key={`${rep.month}-${rep.year}`}
                  type="button"
                  onClick={() => {
                    setCouncilMonth(rep.month);
                    setCouncilYear(rep.year);
                    setCommitteeMonth(rep.month);
                    setCommitteeYear(rep.year);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer shrink-0 ${
                    isSelBoth
                      ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-xs"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#1e3a5f]/40 hover:text-[#1e3a5f]"
                  }`}
                >
                  {mLabel} {rep.year}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 KOLONLU BAĞIMSIZ MECLİS VEYA KOMİTE İÇERİK ALANI */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* SOL KOLON: MECLİS TOPLANTISI (Bağımsız Dönem Seçimi) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {/* Kart Üst Bilgi ve Seçici */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="px-3 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 size={13} />
                  <span>{lang === "en" ? "Assembly Post" : "Meclis Paylaşımı"}</span>
                </span>

                {/* Meclis Ay & Yıl Dropdown Seçimi */}
                <div className="flex items-center gap-1.5 bg-[#f8f9fc] p-1 rounded-xl border border-gray-200/80">
                  <span className="text-[11px] font-semibold text-gray-500 pl-1.5 flex items-center gap-1">
                    <Calendar size={12} className="text-[#c9a227]" />
                    {lang === "en" ? "Assembly:" : "Meclis:"}
                  </span>
                  <select
                    value={councilMonth}
                    onChange={e => setCouncilMonth(Number(e.target.value))}
                    aria-label={lang === "en" ? "Select Assembly Month" : "Meclis Ay Seçiniz"}
                    className="px-2 py-1 bg-white hover:bg-gray-100 text-[#1e3a5f] font-semibold text-xs rounded-lg border border-gray-200 focus:outline-none cursor-pointer"
                  >
                    {months.map((m, idx) => (
                      <option key={m} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={councilYear}
                    onChange={e => setCouncilYear(Number(e.target.value))}
                    aria-label={lang === "en" ? "Select Assembly Year" : "Meclis Yıl Seçiniz"}
                    className="px-2 py-1 bg-white hover:bg-gray-100 text-[#1e3a5f] font-semibold text-xs rounded-lg border border-gray-200 focus:outline-none cursor-pointer"
                  >
                    {YEARS.map(y => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Meclis Kart Başlığı ve Kopyalama Butonları */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <h3
                  className="text-xl md:text-2xl font-bold text-[#1e3a5f] leading-snug"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {councilTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
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

                  <button
                    type="button"
                    onClick={() => handleCopyImages(councilReport?.councilMeeting.images, true)}
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

              {/* Meclis Görselleri */}
              {renderImageGrid(councilReport?.councilMeeting.images)}

              {/* Meclis Metni */}
              <div className="space-y-3.5 bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed">
                {councilParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ KOLON: KOMİTE TOPLANTISI (Bağımsız Dönem Seçimi) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {/* Kart Üst Bilgi ve Seçici */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="px-3 py-1 bg-[#c9a227]/15 text-[#8c6f14] text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 size={13} />
                  <span>{lang === "en" ? "Committee Post" : "Komite Paylaşımı"}</span>
                </span>

                {/* Komite Ay & Yıl Dropdown Seçimi */}
                <div className="flex items-center gap-1.5 bg-[#f8f9fc] p-1 rounded-xl border border-gray-200/80">
                  <span className="text-[11px] font-semibold text-gray-500 pl-1.5 flex items-center gap-1">
                    <Calendar size={12} className="text-[#c9a227]" />
                    {lang === "en" ? "Committee:" : "Komite:"}
                  </span>
                  <select
                    value={committeeMonth}
                    onChange={e => setCommitteeMonth(Number(e.target.value))}
                    aria-label={lang === "en" ? "Select Committee Month" : "Komite Ay Seçiniz"}
                    className="px-2 py-1 bg-white hover:bg-gray-100 text-[#1e3a5f] font-semibold text-xs rounded-lg border border-gray-200 focus:outline-none cursor-pointer"
                  >
                    {months.map((m, idx) => (
                      <option key={m} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={committeeYear}
                    onChange={e => setCommitteeYear(Number(e.target.value))}
                    aria-label={lang === "en" ? "Select Committee Year" : "Komite Yıl Seçiniz"}
                    className="px-2 py-1 bg-white hover:bg-gray-100 text-[#1e3a5f] font-semibold text-xs rounded-lg border border-gray-200 focus:outline-none cursor-pointer"
                  >
                    {YEARS.map(y => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Komite Kart Başlığı ve Kopyalama Butonları */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <h3
                  className="text-xl md:text-2xl font-bold text-[#1e3a5f] leading-snug"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {committeeTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
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

                  <button
                    type="button"
                    onClick={() => handleCopyImages(committeeReport?.committeeMeeting.images, false)}
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

              {/* Komite Görselleri */}
              {renderImageGrid(committeeReport?.committeeMeeting.images)}

              {/* Komite Metni */}
              <div className="space-y-3.5 bg-[#f8f9fc] p-4 rounded-xl border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed">
                {committeeParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
