# Orhan Albayrak Web Sitesi — Tasarım ve Geliştirme Rehberi

Bu dosya, Gemini/Antigravity ve projede çalışan diğer geliştirme ajanları için kalıcı proje bağlamıdır. Yeni bir özellik, sayfa bölümü veya bileşen üretirken bu rehber tasarım kararlarının ana kaynağı kabul edilmelidir.

Amaç yalnızca mevcut görünümü taklit etmek değildir. Amaç; sitenin sakin, akademik, güvenilir ve çağdaş karakterini koruyarak aynı görsel dilde yeni geliştirmeler yapmaktır.

## 1. Projenin Karakteri

Site, Doç. Dr. Orhan Albayrak'ın akademik kimliğini sunan tek sayfalı kişisel web sitesidir. Tasarım aşağıdaki dört özelliği aynı anda taşımalıdır:

1. **Akademik güven:** Bilgi hiyerarşisi açık, içerik okunaklı ve gösterişten uzak olmalıdır.
2. **Editoryal zarafet:** Büyük serif başlıklar, kontrollü boşluklar ve dergi hissi veren kompozisyonlar kullanılmalıdır.
3. **Çağdaş teknoloji:** Cam yüzeyler, yumuşak grid deseni, kontrollü gradient ve akıcı mikro etkileşimler tasarıma güncellik katmalıdır.
4. **İnsani sıcaklık:** Krem arka plan, altın vurgu ve bordo tonları kurumsal lacivertin soğukluğunu dengelemelidir.

Tasarım “kurumsal üniversite şablonu” gibi görünmemelidir. Aynı şekilde neon renkli, aşırı animasyonlu veya yapay zekâ ürünü olduğu belli olan jenerik bir portfolyo estetiğine de kaymamalıdır.

## 2. Değişmez Tasarım İlkeleri

- Ana kimlik rengi laciverttir; vurgu için bordo ve altın kullanılır.
- Başlıklar editoryal serif, gövde metinleri sade sans-serif olmalıdır.
- Açık zeminlerde saf beyaz yerine sıcak krem veya çok açık soğuk gri tercih edilir.
- Yuvarlatılmış yüzeyler kullanılabilir ancak her kutuyu karta çevirmekten kaçınılmalıdır.
- Büyük içerik grupları bol nefes alan dikey ritimle ayrılmalıdır.
- Etkileşimler kısa, yumuşak ve anlamlı olmalıdır; hareket içerikten rol çalmamalıdır.
- Masaüstünde yüzen dock, mobilde hamburger ikonlu tam ekran sidebar kullanılır.
- Site tek sayfadır. Navigasyon yeni route açmak yerine ilgili `id` değerine yumuşak kaydırma yapar.
- Sosyal bağlantılar footer'da birlikte tutulur. LinkedIn, Instagram, Twitter/X ve ResearchGate bu grubun parçalarıdır. ORCID arayüzde kullanılmaz.
- “CV Talep Et” bordo ile ayrıştırılan ikincil ama görünür bir dönüşüm aksiyonudur.

## 3. Renk Sistemi

### Temel palet

| Rol | Renk | Kullanım |
| --- | --- | --- |
| Ana lacivert | `#1e3a5f` | Ana butonlar, dock monogramı, başlıklar, footer |
| Koyu mürekkep | `#14243b` | Büyük hero başlığı, yüksek kontrastlı metin |
| Koyu lacivert hover | `#142b49` | Ana buton hover durumu |
| Bordo | `#7a2948` | CV aksiyonu, hero gradient'i, özel vurgu |
| Koyu bordo hover | `#5d1e37` | Bordo buton hover durumu |
| Orta bordo | `#a23b5e` | Gradient geçişleri |
| Altın | `#c9a227` | İnce çizgiler, durum işaretleri, premium vurgu |
| Sıcak krem | `#f5f2eb` | Hero ve mobil sidebar arka planı |
| Soğuk açık zemin | `#f8f9fc` | Alternatif bölümler ve form paneli |
| Beyaz | `#ffffff` | Kartlar, dock yüzeyi, form alanları |
| Gövde metni | `#42506a` | Hero açıklaması ve önemli ikincil metin |
| Nötr metin | Tailwind `gray-500/600` | Açıklamalar, meta bilgiler |

### Renk kullanım kuralları

- Bir ekranda lacivert, bordo ve altın aynı ağırlıkta kullanılmamalıdır. Lacivert ana taşıyıcı; bordo aksiyon veya editoryal vurgu; altın ise küçük detaydır.
- Altın geniş yüzey rengi değildir. İnce çizgi, nokta, küçük etiket veya kısa gradient bitişi olarak kullanılmalıdır.
- Bordo, “CV Talep Et” gibi özel aksiyonlarda tutarlı biçimde kullanılmalıdır.
- Uzun metinlerde saf siyah kullanılmamalıdır. Koyu lacivert veya nötr gri tercih edilmelidir.
- Opaklıklarla çalışırken mevcut karakter korunmalıdır: sınırlar genellikle ana rengin `%10–20`, dekoratif ışımalar `%15`, ikincil metinler `%55–70` yoğunluğundadır.
- Yeni renk eklemek son çaredir. Önce bu paletin ton ve opaklıklarını kullanın.

## 4. Tipografi

### Font aileleri

- **Başlık:** `DM Serif Display`, serif
- **Gövde ve arayüz:** `DM Sans`, sans-serif

Fontlar `client/index.html` ve `client/src/index.css` üzerinden yüklenir. Yeni bir font ailesi eklemeyin.

### Hiyerarşi

- Hero adı: çok büyük, sıkı tracking ve yaklaşık `0.86–0.92` line-height.
- Sayfa bölümü başlıkları: `text-3xl` / `md:text-4xl`, lacivert, serif.
- Alt bölüm başlıkları: `text-2xl`, lacivert, serif.
- Kart başlıkları: okunaklı, belirgin fakat hero ile yarışmayacak ölçüde.
- Gövde: çoğunlukla `text-base`, uzun açıklamalarda `leading-relaxed`.
- Üst etiketler: `text-[10px]`–`text-xs`, uppercase, yüksek tracking.
- Meta bilgiler: `text-xs`–`text-sm`, nötr gri.

### Editoryal vurgu

Hero'da soyad bordo-altın gradient, serif ve italik kullanılır. Bu güçlü stil yalnızca birincil kimlik anlarında kullanılmalıdır. Her başlığı gradient veya italik yapmak tasarımın etkisini zayıflatır.

## 5. Yerleşim Sistemi

### Container

Ana içerik `.container` sınıfını kullanır:

- Mobil: `1rem` yatay boşluk
- Küçük ekran: `1.5rem`
- Masaüstü: `2rem`
- Maksimum genişlik: `1280px`

Yeni bölümler bu container dışında bağımsız yatay hizalar üretmemelidir.

### Dikey ritim

- Standart ana bölüm: `py-20`
- Vurgu bandı: `py-16`
- Bölüm başlığı sonrası boşluk: yaklaşık `2.5rem`
- Büyük alt gruplar: `2.5–3.5rem` aralık
- Kart grid boşlukları: çoğunlukla `gap-4`, `gap-6` veya `gap-8`

### Grid davranışı

- Mobilde tek kolon temel varsayımdır.
- İçerik kartları `md:grid-cols-2` ile iki kolona geçer.
- Hero masaüstünde metin ve portre olmak üzere yaklaşık `1.08fr / 0.92fr` oranındadır.
- İletişim bölümü masaüstünde formu öne çıkaran yaklaşık `1.55fr / 0.75fr` oranını kullanır.
- Kolonlar arasında yapay dikey çizgiler yerine boşluk ve yüzey farkı tercih edilir.

## 6. Navigasyon Dili

### Masaüstü dock

Kaynak: `client/src/components/nav/SinglePageDock.tsx`

- `md` ve üzeri ekranlarda görünür.
- Ekranın üst orta noktasında yüzer.
- Beyaz, yarı saydam, blur uygulanmış ve hafif gölgeli kapsül yüzeydir.
- Sol tarafta lacivert daire içinde `OA` monogramı bulunur.
- Aktif bölüm yumuşak lacivert arka plan kapsülüyle belirtilir.
- Aktif kapsül Framer Motion `layoutId` ile bölümler arasında akıcı hareket eder.
- Navigasyon öğeleri butondur; route linki değildir.
- Bölüm sırası korunmalıdır: Hakkında, Eğitim, Kariyer, Yayınlar, İletişim.

### Mobil hamburger ve sidebar

Kaynak: `client/src/components/nav/MobileSidebar.tsx`

- `md` altı ekranlarda görünür; masaüstü dock bu aralıkta gizlidir.
- Hamburger sol üstte, `44 × 44px`, cam görünümlü yuvarlatılmış kare içindedir.
- Açılışta üç çizgi yumuşak animasyonla X ikonuna dönüşür.
- Sidebar tam ekran açılır ve soldan kayar.
- Arka plan sıcak krem, grid desenli ve çok hafif altın/bordo ışımaları içerir.
- Menü başlıkları büyük serif tipografiyle ve sıra numaralarıyla gösterilir.
- Aktif bölüm bordo metin, altın sıra numarası ve kısa altın çizgiyle belirtilir.
- Menü açıkken `body` scroll kilitlenir.
- Escape tuşu menüyü kapatır ve odağı hamburger düğmesine döndürür.
- Bölüm seçimi sidebar'ı kapatır ve ilgili bölüme yumuşak kaydırır.
- Alt satırda kurumsal e-posta ve bordo `CV Talep Et` aksiyonu bulunur.

Mobil navigasyonu tekrar küçük bir dock'a çevirmeyin. Hamburger/sidebar, dar ekranlardaki kalıcı navigasyon desenidir.

## 7. Hero Tasarım Dili

Kaynak: `client/src/pages/Home.tsx`

Hero, sitenin en güçlü görsel kompozisyonudur.

### Arka plan

- Sıcak krem `#f5f2eb` kullanılır.
- `hero-grid` sınıfıyla düşük kontrastlı, yaklaşık `54px` aralıklı grid deseni uygulanır.
- Grid aşağı doğru maskelenerek kaybolur.
- Sol üstte altın, sağ altta bordo çok düşük opaklıklı blur ışımaları yer alır.
- Büyük stok fotoğraf veya yoğun illüstrasyon arka plan kullanılmaz.

### Metin alanı

- Küçük kapsül etiket: “Akademisyen · Araştırmacı · Yazar”.
- İsim büyük ve editoryal serif karakterdedir.
- “Orhan” koyu mürekkep; “Albayrak” bordo-altın gradient ve italiktir.
- Açıklama bir veya iki kısa düşünce halinde, maksimum yaklaşık `36rem` genişlikte tutulur.
- CTA sırası: Yayınları İncele, İletişim, CV Talep Et.
- CTA'ların altında üç kısa güven/etki metriği yer alır.

### Portre alanı

- Portre organik, asimetrik ve büyük radius'lu bir maske içinde sunulur.
- Arkasında lacivert-bordo gradient şekil ve yumuşak, geniş gölge bulunur.
- Portre üstten kırpılmamalı; yüz her breakpoint'te net görünmelidir.
- Alt köşede cam yüzeyli “Akademik odak” bilgi kartı bulunur.
- Mobilde portre önce, metin sonra gelir.

### Hero'da kaçınılacaklar

- Düz koyu renk kaplayan arka plan
- Okunurluğu bozan fotoğraf overlay'leri
- Birbirine eşit ağırlıkta dört veya daha fazla CTA
- Neon glow, sert parallax veya sürekli dikkat çeken animasyon
- Portreyi küçük, standart daire avatarına indirmek

## 8. Bölüm ve Kart Tasarımı

### Bölüm başlıkları

`SectionTitle` deseni korunmalıdır:

- Lacivert serif başlık
- Altında kısa açıklama
- En altta yaklaşık `4rem` genişliğinde altın gradient çizgi

### Arka plan ritmi

Uzun tek sayfa yapısında bölümler dönüşümlü olarak beyaz ve `#f8f9fc` zemin kullanır. Arka arkaya çok sayıda aynı zemin, içerik gruplarını birbirine karıştırır.

### Kartlar

- Kart yüzeyi çoğunlukla beyazdır.
- Border çok açık gri ve `1px` olmalıdır.
- Radius çoğunlukla `rounded-xl` veya `rounded-2xl`.
- Normal durumda gölge çok hafiftir.
- Hover gerekiyorsa `translateY(-4px)` ve geniş, düşük opaklıklı lacivert gölge kullanılır.
- Kart içi metin uzun olabileceği için `min-w-0`, `break-words` ve rahat line-height korunmalıdır.
- Akademik kayıt kartlarında dekorasyon bilgi okunurluğunun önüne geçmemelidir.

Her paragrafı veya liste öğesini ayrı karta dönüştürmeyin. Kart yalnızca anlamlı bir içerik birimini sınırlandırmak için kullanılmalıdır.

## 9. Formlar ve Dönüşüm Aksiyonları

Kaynaklar:

- `client/src/components/site/ContactForm.tsx`
- `client/src/components/site/CvRequestForm.tsx`
- `client/src/lib/forms/`
- `api/contact.ts`
- `api/cv-request.ts`

### Görsel kurallar

- İletişim ve CV formları aynı panelde iki sekme olarak sunulur.
- Panel açık gri zeminli, geniş radius'lu ve hafif gölgelidir.
- İletişim sekmesi lacivert; CV sekmesi bordo aktif durumu kullanır.
- Form alanları beyaz, açık gri border'lı ve odakta ilgili sekmenin rengiyle vurgulanır.
- Etiketler görünürdür; placeholder, etiket yerine kullanılmaz.
- Gönderim butonu formun tema rengini kullanır.
- Yüklenme sırasında spinner ve açıklayıcı durum metni gösterilir.

### İşlevsel kurallar

- `react-hook-form` ve Zod şemaları kullanılmalıdır.
- İstemci ve sunucu aynı doğrulama şemalarını paylaşır.
- Honeypot alanı korunmalıdır.
- Origin kontrolü, içerik filtresi ve rate limit kaldırılmamalıdır.
- Hata mesajları kullanıcıya teknik detay sızdırmamalıdır.
- SMTP ayarları kod içine yazılmaz; `.env.example` anahtarları kullanılır.
- Form API'leri yalnızca `POST` kabul eder.
- Yeni kişisel veri alanı eklenirse onay metni ve e-posta şablonu da güncellenmelidir.

## 10. Footer ve Sosyal Bağlantılar

- Footer ana lacivert zemin üzerindedir.
- İsim ve akademik rol solda; sosyal bağlantılar masaüstünde sağda, mobilde ortalıdır.
- Sosyal bağlantı sırası: LinkedIn, Instagram, Twitter, ResearchGate.
- İkonlar küçük ve metinle birlikte gösterilir.
- Normal durum `white/60`, hover altın rengidir.
- ORCID bağlantısı eklenmemelidir.
- Sosyal bağlantıları hero veya iletişim kartlarında tekrar ederek görsel gürültü oluşturmayın.

## 11. Hareket ve Mikro Etkileşim

Hareket dili sakin ve fiziksel hissettirmelidir.

- Bölüm görünme animasyonu: opacity + yaklaşık `translateY(20–32px)`, `600–700ms`.
- Dock aktif öğesi: spring, yaklaşık `stiffness: 380`, `damping: 30`.
- Mobil sidebar: yaklaşık `500ms`, `cubic-bezier(.22,1,.36,1)`.
- Hamburger → X: `200–300ms`.
- Buton hover: en fazla `translateY(-2px)`.
- Kart hover: en fazla `translateY(-4px)`.
- Renk ve border geçişleri çoğunlukla `200–300ms`.

`prefers-reduced-motion: reduce` durumunda yumuşak scroll ve gereksiz hareketler azaltılmalıdır. Sürekli dönen, zıplayan veya arka planda yoğun hesaplama yapan efektlerden kaçının.

## 12. Responsive Kuralları

### Mobil (`< md`)

- Hamburger/sidebar navigasyonu kullanılır.
- Hero'da portre önce, metin sonra gelir.
- CTA'lar gerektiğinde iki satıra sarılır; minimum dokunma yüksekliği korunur.
- Kartlar tek kolondur.
- Form alanları tek kolondur.
- Footer içeriği ortalanır ve sosyal bağlantılar sarılabilir.
- Yatay overflow kesinlikle oluşmamalıdır.
- Sabit öğelerde safe-area inset'leri dikkate alınmalıdır.

### Tablet (`md`–`lg`)

- Masaüstü dock görünür.
- İçerik kartları uygun olduğunda iki kolona geçer.
- Hero, alan yetmiyorsa mobil sıralamaya yakın davranabilir; portre ve metin sıkıştırılmamalıdır.

### Masaüstü (`lg+`)

- Hero iki kolonlu kompozisyona geçer.
- Portre sağa, metin sola hizalanır.
- İletişim paneli form ağırlıklı iki kolon olur.
- Maksimum içerik genişliği korunur; çok geniş ekranda metin satırları gereksiz uzamaz.

En az `390 × 844` ve `1440 × 900` viewport'larında görsel kontrol yapılmalıdır.

## 13. Erişilebilirlik

- Navigasyon ve aksiyonlar semantik `button`, `a`, `nav`, `section`, `footer` öğeleri olmalıdır.
- İkon-only düğmeler açıklayıcı `aria-label` taşımalıdır.
- Aktif navigasyon öğesi `aria-current="location"` kullanmalıdır.
- Açılır menü düğmesi `aria-expanded` ve `aria-controls` taşımalıdır.
- Dekoratif grid, glow ve şekiller `aria-hidden="true"` olmalıdır.
- Tüm görseller anlamlı `alt` metnine sahip olmalıdır.
- Klavye odağı görünür olmalı, Escape ile açılır yüzeyler kapanmalıdır.
- Form alanları görünür label ve açıklayıcı hata mesajı taşımalıdır.
- Renk tek başına durum bilgisi vermemelidir; aktif durumda çizgi, zemin veya metin değişimi de kullanılmalıdır.
- Dokunma hedefleri mümkünse en az `44 × 44px` olmalıdır.

## 14. İçerik Dili

- Dil Türkçedir; ton profesyonel, açık ve ölçülüdür.
- Akademik unvanlar ve kurum adları doğru yazılmalıdır.
- Gösterişli pazarlama söylemi yerine somut görev, yayın ve etki bilgisi kullanılmalıdır.
- Cümlelerde gereksiz İngilizce arayüz terimlerinden kaçınılmalıdır.
- “Yapay zekâ”, “iş birliği”, “e-posta” gibi Türkçe yazımlar tutarlı olmalıdır.
- CTA metinleri fiil odaklı ve kısadır: “Yayınları İncele”, “Mesajı Gönder”, “CV Talep Et”.

## 15. React ve Bileşen Kuralları

- Yeni bağımsız görsel davranış için ayrı bir bileşen dosyası oluşturun.
- Named export tercih edin.
- Props tipi bileşenle aynı dosyada tanımlansın.
- State, kullanıldığı en yakın bileşende tutulmalıdır.
- Türetilmiş değer için ek state/effect üretmeyin.
- Effect içinde event listener, timer veya scroll kilidi varsa cleanup zorunludur.
- Liste anahtarları benzersiz ve kararlı olmalıdır.
- Mevcut shadcn bileşenleri (`Tabs`, `Input`, `Textarea`, `Checkbox`, `Form`) varken aynı primitive'i yeniden yazmayın.
- Sınıf birleştirme için `cn()` kullanın.
- Inline style yalnızca font ailesi veya dinamik CSS değişkeni gibi Tailwind ile anlamlı biçimde ifade edilemeyen durumlarda kullanılmalıdır.
- Yeni global CSS eklemeden önce Tailwind utility ile çözüm arayın.

## 16. Dosya Haritası

| Dosya | Sorumluluk |
| --- | --- |
| `client/src/pages/Home.tsx` | Tek sayfanın içerik kompozisyonu, section'lar ve scroll state |
| `client/src/index.css` | Tema tokenları, container, global tipografi ve ortak efektler |
| `client/src/components/nav/SinglePageDock.tsx` | Masaüstü yüzen dock |
| `client/src/components/nav/MobileSidebar.tsx` | Mobil hamburger ve tam ekran sidebar |
| `client/src/components/site/ContactForm.tsx` | İletişim formu arayüzü |
| `client/src/components/site/CvRequestForm.tsx` | CV talep formu arayüzü |
| `client/src/lib/forms/` | Paylaşılan doğrulama, güvenlik ve gönderim yardımcıları |
| `api/contact.ts` | İletişim formu serverless API'si |
| `api/cv-request.ts` | CV talep serverless API'si |
| `api/_lib/` | HTTP, ortam ve e-posta yardımcıları |
| `.env.example` | SMTP yapılandırma anahtarları |

## 17. Yeni Bir Özellik Eklerken Karar Sırası

1. Özellik mevcut tek sayfa akışında hangi bölüme aittir?
2. Yeni route gerçekten gerekli mi, yoksa mevcut section içinde çözülebilir mi?
3. Mevcut kart, form, tab veya navigasyon desenlerinden biri yeniden kullanılabilir mi?
4. Ana vurgu rengi lacivert mi olmalı, yoksa özellik CV gibi özel bir bordo aksiyon mu?
5. Mobilde içerik sırası ve dokunma hedefleri nasıl davranacak?
6. Klavye, screen reader ve reduced-motion davranışı tanımlandı mı?
7. Yeni bileşen masaüstü ve mobil viewport'ta görsel olarak doğrulandı mı?

## 18. Kaçınılacak Tasarım Sapmaları

- Jenerik mavi-mor SaaS gradient'i
- Neon renkler ve sert glow efektleri
- Her bölümde farklı radius, gölge veya buton biçimi
- Hero'daki gradient serif stilini her başlıkta tekrar etmek
- Mobilde masaüstü dock'u sıkıştırarak kullanmak
- Aşırı cam efekti; okunurluğu düşüren transparan yüzeyler
- Uzun metinleri dar veya merkez hizalı kolonlara zorlamak
- İçeriğe katkı sağlamayan sayaç, carousel veya otomatik kayan alanlar
- Hover'a bağımlı temel etkileşimler
- Yeni bağımlılık ekleyerek mevcut primitive'i yeniden üretmek
- Hard-coded gizli anahtar, SMTP şifresi veya kişisel veri

## 19. Doğrulama ve Teslim Kontrol Listesi

Her anlamlı arayüz değişikliğinden sonra:

```bash
pnpm check
pnpm build
git diff --check
```

Tarayıcı kontrolü:

- `390 × 844`: hamburger görünür, dock gizli, sidebar taşmıyor.
- `1440 × 900`: dock görünür, hamburger gizli, hero ilk viewport'ta dengeli.
- Navigasyon doğru section'a kaydırıyor.
- Mobil sidebar Escape ile kapanıyor.
- CV butonu iletişim bölümündeki CV sekmesini açıyor.
- Form label, validation ve disabled durumları çalışıyor.
- Footer sosyal bağlantıları doğru sırada.
- Yatay overflow yok.
- Browser console'da React key, hydration veya runtime hatası yok.

## 20. Son Kural

Yeni geliştirme mevcut arayüzle yan yana konduğunda başka bir şablondan kopyalanmış gibi görünmemelidir. Aynı renklerden daha önemlisi; aynı hiyerarşi, boşluk, tipografi, hareket ölçüsü ve akademik sakinlik korunmalıdır.

Şüphe durumunda daha az efekt, daha net bilgi hiyerarşisi ve daha fazla nefes alanı tercih edin.
