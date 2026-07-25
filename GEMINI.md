# Project Guidelines & Rules for Agent

These rules MUST be followed by any AI agent working on this repository (`faikenesalbayrak/oalbayrak`):

1. **User Communication & Technical Level:**
   - The user using this repository does not have a background in Git or technical version control terminology (e.g., git history, commit, push, pull, branch, merge).
   - ALWAYS explain what you are doing in plain, simple, friendly, and step-by-step Turkish without using raw git jargon.

2. **Deployment & Branching Strategy:**
   - This repository is connected to the user's son's Vercel account.
   - Any commit pushed to the `main` branch automatically deploys to live at `orhanalbayrak.com`.
   - All production releases MUST go to `main`.
   - **For major or risky changes:** Create a separate working branch first. Explicitly and politely explain to the user why a separate workspace/branch is being created, what it does, and how it will be safely merged into `main` after verification.

3. **End of Task Confirmation:**
   - Upon completing any task/fix/feature, ALWAYS ask the user explicitly:
     *"İşimiz bitti, orhanalbayrak.com sitesinde yeni versiyonun canlıya çıkması için değişiklikleri kaydedip yayınlayayım (commit & push) mı?"*

4. **Local Development & Preview:**
   - When previewing or testing changes locally, use `localhost:3000` (or `npm run dev` / `pnpm dev` equivalent).
   - If the user wants to preview the site on their own computer, or BEFORE and AFTER making any changes, ALWAYS offer to run the local server (`localhost:3000`) so the user can inspect it locally first.

---

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

## 3. Renk Paleti ve Kullanım Mantığı

### Ana Renkler

- **Deep Navy (`#0A192F` / `slate-950` türevi):** Temel zemin, koyu kartlar, footer, masaüstü dock ve ana navigasyon kimliği.
- **Warm Cream (`#FDFBF7` / `stone-50` türevi):** Açık zeminler ve okuma alanları.
- **Pure White (`#FFFFFF`):** Kart zeminleri, form girdileri ve yüksek kontrast gerektiren alanlar.

### Vurgu Renkleri

- **Academic Burgundy (`#800020` / `#7A1C2C` türevi):** “CV Talep Et” gibi ikincil ama kritik dönüşüm butonları, rozetler ve vurgu noktaları.
- **Muted Gold (`#D4AF37` / `#C5A059` türevi):** Hero metin gradient'i, altın ışıltılar, hover sınırları ve küçük etiketler.

### Yardımcı Tonlar

- **Slate Grays:** Gövde metinleri, ikincil başlıklar ve pasif sınırlar.
- **Glass/Border Colors:** `white/10`, `white/20`, `slate-200/60` gibi transparan katmanlar.

### Kullanım Kuralları

- Burgundy ve Gold aynı öğede yarışmamalıdır. Gold estetik ve hafif vurgudur; Burgundy işlevsel ve aksiyon odaklıdır.
- Arka planda karanlık/aydınlık geçişleri bölüm sınırlarıyla hizalanmalıdır.

## 4. Tipografi Sistemi

- **Serif Font (Playfair Display / Merriweather / Noto Serif):** Hero başlığı, bölüm ana başlıkları, editoryal alıntılar.
- **Sans-Serif Font (Inter / Plus Jakarta Sans):** Navigasyon, etiketler, kart başlıkları, gövde metinleri, form alanları ve footer.

### Hiyerarşi

- `Hero Title`: Masaüstünde `text-5xl` ile `text-7xl` arası, mobilde `text-3xl` ile `text-4xl`.
- `Section Title`: `text-3xl` ile `text-4xl`, serif, harf aralığı sıkı (`tracking-tight`).
- `Card Title`: `text-xl`, font-semibold, sans-serif.
- `Body Text`: `text-base` veya `text-sm`, okunurluk için `leading-relaxed` veya `leading-7`.
- `Caption / Eyebrow`: `text-xs` veya `text-sm`, `uppercase`, `tracking-wider`, genellikle gold veya burgundy tonunda.

## 5. Layout ve Boşluk Sistemi

- **Sayfa Tipi:** Tek sayfa (`Single Page Application` / `Landing`).
- **Maksimum Genişlik:** İçerik konteyneri `max-w-6xl` veya `max-w-7xl` sınırını aşmamalıdır.
- **Dikey Boşluk:** Bölümler arası dikey iç boşluk mobilde `py-16`, masaüstünde `py-24` veya `py-32` olmalıdır.
- **Grid Yapısı:** Masaüstünde 12 kolonlu esnek grid veya `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` mantığı kullanılır.
- **Kenar Boşlukları:** Mobil cihazlarda yan iç boşluklar en az `px-4` / `px-6` korunmalıdır.

## 6. Navigasyon Mimarısı

### Masaüstü Navigasyonu (`SinglePageDock`)

- Ekranın alt-orta kısmında yüzen, cam efektli (`backdrop-blur`) ve koyu zeminli dock bileşenidir.
- Aktif bölüm görünürlük seviyesine göre (`IntersectionObserver`) otomatik güncellenir.
- Tıklamada ilgili `section id` değerine `smooth scroll` ile kayar.
- İçerik öğeleri: Hakkında, Deneyim, Yayınlar, İletişim.
- İkincil eylem: Bordo vurgulu “CV Talep” butonu.

### Mobil Navigasyon (`MobileSidebar`)

- Masaüstü dock mobilde gizlenir (`hidden md:flex`).
- Ekranın üst-sağında cam efektli dairesel hamburger menü düğmesi yer alır.
- Menü açıldığında ekranı kaplayan, yumuşak animasyonlu dikey sidebar belirir.
- Bağlantıya tıklandığında menü kendiliğinden kapanır ve hedefe kayar.

## 7. Sayfa Bölümleri ve Kompozisyon

### Hero Bölümü

- Sayfanın ilk ekranıdır; masaüstünde 2 kolonlu yapıdadır.
- Sol kolon: Akademik unvan, isim, editoryal gold-gradient başlık, özet biyografi, e-posta ve hızlı aksiyonlar.
- Sağ kolon: Profesyonel akademisyen portresi (çerçeveli, yumuşak gölgeli veya kırpılmış editoryal alan).
- Alt kısımda hafif aşağı kaydırma göstergesi yer alabilir.

### Hakkında ve Biyografi

- Çift kolonlu veya kartlı editoryal düzen.
- Önemli odak alanları (Yapay Zekâ, Veri Bilimi vb.) küçük rozetler veya simgelerle desteklenir.

### Akademik Deneyim ve Görevler

- Kronolojik dikey zaman çizelgesi (`Timeline`) veya kart yapısı.
- Kurum adı, unvan, tarih aralığı ve açıklama net ayrılmalıdır.

### Yayınlar ve Araştırmalar

- Kategori veya yıla göre filtrelenebilir/düzenlenebilir yapı.
- Makale adı, dergi/konferans bilgisi, yayın yılı ve erişim bağlantıları.
- Öne çıkan yayınlar özel rozet ile vurgulanabilir.

### İletişim ve CV Talep Paneli

- İki sekmeden (`Tabs`) oluşur: **İletişim Formu** ve **CV Talep Formu**.
- Bordo/altın aksiyon renkleri burada aktif kullanılır.
- Sol veya üst kısımda doğrudan iletişim bilgileri (E-posta, Kurum Adresi) yer alır.

## 8. Formlar, Güvenlik ve API Yapısı

- Formlar Vercel Serverless Functions (`/api/contact`, `/api/cv-request`) üzerinden çalışır.
- `Resend` veya SMTP e-posta servisi ile mesajları iletir.

### İşlevsel kurallar

- `react-hook-form` ve Zod şemaları kullanılmalıdır.
- İstemci ve sunucu aynı doğrulama şemalarını paylaşır.
- Honeypot alanı korunmalıdır.
- Origin kontrolü, içerik filtresi ve rate limit kaldırılmamalıdır.
- Hata mesajları kullanıcıya teknik detay sızdırmamalıdır.
- SMTP ayarları kod içine yazılmaz; `.env.example` anahtarları kullanılır.
- Form API'leri yalnızca `POST` kabul eder.
- Yeni kişisel veri alanı eklenirse onay metni ve e-posta şablonu da güncellenmelidir.

## 9. Footer ve Sosyal Bağlantılar

- Footer ana lacivert zemin üzerindedir.
- İsim ve akademik rol solda; sosyal bağlantılar masaüstünde sağda, mobilde ortalıdır.
- Sosyal bağlantı sırası: LinkedIn, Instagram, Twitter, ResearchGate.
- İkonlar küçük ve metinle birlikte gösterilir.
- Normal durum `white/60`, hover altın rengidir.
- ORCID bağlantısı eklenmemelidir.
- Sosyal bağlantıları hero veya iletişim kartlarında tekrar ederek görsel gürültü oluşturmayın.

## 10. Hareket ve Mikro Etkileşim

Hareket dili sakin ve fiziksel hissettirmelidir.

- Bölüm görünme animasyonu: opacity + yaklaşık `translateY(20–32px)`, `600–700ms`.
- Dock aktif öğesi: spring, yaklaşık `stiffness: 380`, `damping: 30`.
- Mobil sidebar: yaklaşık `500ms`, `cubic-bezier(.22,1,.36,1)`.
- Hamburger → X: `200–300ms`.
- Buton hover: en fazla `translateY(-2px)`.
- Kart hover: en fazla `translateY(-4px)`.
- Renk me border geçişleri çoğunlukla `200–300ms`.

`prefers-reduced-motion: reduce` durumunda yumuşak scroll ve gereksiz hareketler azaltılmalıdır.

## 11. Responsive Kuralları

- **Mobil (< md):** Hamburger menü, tek kolonlu kartlar, sarılabilir footer.
- **Tablet (md - lg):** Masaüstü dock aktifleşir, çift kolonlu kartlar.
- **Masaüstü (lg+):** Çift kolonlu hero, tam editoryal genişlik.

## 12. Yerel Çalıştırma ve Önizleme

- Kullanıcı değişiklikleri kendi bilgisayarında görmek istediğinde veya herhangi bir geliştirme öncesi/sonrasında `localhost:3000` (veya `pnpm dev` / `npm run dev`) ile yerel sunucu açma teklif edilmelidir.
