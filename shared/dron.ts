export const DRON_QUESTIONS = [
  "Ad-Soyad",
  "En Son Bitirdiğiniz Okul Adı",
  "Bitirdiğiniz Tarih",
  "Şirketinizin Tam Adı",
  "Şirketinizin Kayıtlı Olduğu Ticaret Odası",
  "Şirketinizin İştigal Konusu ve NACE numarası",
  "Şirketinizin Ticaret Sicil Numarası",
  "Şirketinizin Kayıtlı Sermayesi",
  "Şirketinizdeki Yetkili Kişi ya da Kişiler",
  "Daha önce savunma sanayi ile ilişkili Türkiye’den başka bir ülkeye bir ürün satışı gerçekleştirdiniz mi?",
  "Türkiye’de veya başka bir ülkede ilişkide olduğunuz veya temsilciğini yaptığınız başka dron üreticileri var mı?",
  "Dron satmayı düşündüğünüz ülkede şirketiniz var mı? (Evet-Hayır)",
  "Bu ülkedeki Şirketinizin Tam Adı",
  "Bu ülkede Şirketinizin Kayıtlı Olduğu Ticaret Odası",
  "Dron satmayı düşündüğünüz ülkenin dilini biliyor musunuz?",
  "Dron satmayı düşündüğünüz ülke adı",
  "Dron satmayı düşündüğünüz ülkede kaç yıldır yaşıyorsunuz?",
  "Bu ülke ile olan ilişkileriniz hangi seviyede (İleri-Orta-Zayıf):",
  "Bu ülkede kimi tanıyorsunuz ve yakınlık dereceniz? (Başkan, Başbakan, Savunma Bakanı, Genel Kurmay Bşk, Kara Kuvvetleri Komutanı vs - Çok iyi, iyi, Orta vs)",
  "Daha önce dron satışı yaptınız mı? (Evet Hayır):",
  "Evet ise hangi ülke ya da ülkelere:",
  "Dron satmayı düşündüğünüz ülkede dron pazarı hakkında somut bir bilgiye sahip misiniz? (Evet-Hayır)",
  "Sahipseniz bu bilgiyi nasıl elde ettiniz?",
  "Dron satmayı düşündüğünüz ülkede dron üretim imkanları var mıdır? (evet-hayır)",
  "NW ile şirketiniz arasında nasıl bir ilişki kurmayı planlıyorsunuz:",
  "Sadece dron satmak ile mi ilgileniyorsunuz?",
  "İlgilendiğiniz ülkenin tahmini yıllık veya aylık dron alım miktarı hakkında bir fikriniz var mı?",
  "Dron satmayı düşündüğünüz ülkenin dron satın alma bütçesi hakkında bilginiz var mı?",
  "Dron satın alma konusunda sizce asıl karar vericiler kimlerdir ve bu kişilerle ilişki seviyeniz nedir?",
] as const;

export type DronQuestionKey = `q${number}`;

export type DronSubmissionInput = Record<DronQuestionKey, string>;

export type DronSubmission = DronSubmissionInput & {
  id: number;
  created_at: string;
};

export const DRON_QUESTION_COUNT = DRON_QUESTIONS.length;

export function emptyDronSubmissionInput(): DronSubmissionInput {
  return Object.fromEntries(
    Array.from({ length: DRON_QUESTION_COUNT }, (_, index) => [`q${index + 1}`, ""]),
  ) as DronSubmissionInput;
}

