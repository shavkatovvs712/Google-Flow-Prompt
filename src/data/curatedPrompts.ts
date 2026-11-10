import { VideoPrompt } from '../types';

export const CURATED_PROMPTS: VideoPrompt[] = [
  {
    id: 'cyberpunk-samarkand',
    titleUz: 'Kiberpank Samarqand 2099',
    titleEn: 'Cyberpunk Samarkand 2099',
    category: 'cinematic',
    styleTag: 'Sci-Fi IMAX 70mm',
    englishPrompt:
      'Ultra-wide cinematic shot of futuristic Samarkand in 2099, ancient Registan madrasahs retrofitted with glowing holographic neon blue and gold calligraphy, autonomous flying vehicles weaving through rainy mist, reflective wet cobblestones mirroring neon lights, slow smooth forward tracking shot moving at eye-level, ARRI Alexa 65, 35mm anamorphic lens, shallow depth of field, subtle film grain, volumetric fog, photorealistic 8K, 24fps cinematic motion blur.',
    uzbekExplanation:
      '2099-yildagi kelajak Samarqandi: Registon madrasalari neon ko\'k va oltin holografik yozuvlar bilan uyg\'unlashgan, yomg\'irli tumanda uchar mashinalar harakatlanadi, ho\'l toshko\'chada chiroqlar aksi jilolanadi.',
    cameraDirection: 'Sekin va ravon oldinga tracking harakati, pastki burchakdan Registon minoralarini ko\'rsatish',
    lightingAndMood: 'Tungi yomg\'ir, neon ko\'k va tilla rangli volumetrik tuman, akslanuvchi yuzalar',
    lensAndCamera: 'ARRI Alexa 65, 35mm Anamorphic ob\'yektiv, f/1.8, 24fps',
    negativePrompt:
      'cartoon, blurry, low resolution, jittery motion, morphing architecture, plastic skin, oversaturated, amateur footage, flickering',
    veoDirectorTip:
      'Google Veo ga berishda "slow smooth tracking shot" so\'zini qo\'shish kadrning silkinmasdan bir tekis chiqishini ta\'minlaydi.',
    aspectRatio: '16:9',
    fps: '24fps cinematic',
    previewGradient: 'from-blue-900 via-indigo-950 to-purple-900',
  },
  {
    id: 'interstellar-voyage',
    titleUz: 'Qora tuynuk va Fazo Sayyohi',
    titleEn: 'Supermassive Black Hole Horizon Explorer',
    category: 'cinematic',
    styleTag: 'Cosmic Hard Sci-Fi',
    englishPrompt:
      'Cinematic IMAX shot from inside the cockpit of an advanced deep-space exploration ship approaching a colossal spinning black hole with a blinding golden accretion disk, lensing of distant stars warping around the event horizon, zero-gravity floating dust motes illuminated by ambient light inside the cabin, slow push-in zoom towards the observation viewport, 70mm Panavision lens, hyper-detailed cosmic physics, Hans Zimmer atmosphere, epic 24fps.',
    uzbekExplanation:
      'Interstellar uslubidagi koinot kemasi gigant qora tuynuk tomon yaqinlashadi. Oltin nurlar sochuvchi akkretsion disk, fazo va vaqt egilishi, kabina ichidagi nol gravitatsiyada muallaq chang zarralari.',
    cameraDirection: 'Kabina ichidan tashqi qora tuynukka qarab sekin doli (push-in) yaqinlashuvi',
    lightingAndMood: 'Qora tuynukning kuchli oltin va oq gravitatsion nurlari, kabina ichidagi sust qorong\'i yorug\'lik',
    lensAndCamera: 'IMAX 70mm Panavision, f/2.8, chuqur fokus',
    negativePrompt:
      'cheap CGI, cartoonish, low frame rate, shaky cam, static image, blown-out flat lighting',
    veoDirectorTip:
      '"Zero-gravity floating dust" iborasi Google Flow ga sahnada chuqurlik va real harakat borligini tushunishga yordam beradi.',
    aspectRatio: '21:9',
    fps: '24fps',
    previewGradient: 'from-amber-950 via-neutral-950 to-black',
  },
  {
    id: 'snow-leopard-hunt',
    titleUz: 'Qor qoploni (Himolay cho\'qqilari)',
    titleEn: 'Snow Leopard in Himalayan Blizzard',
    category: 'nature',
    styleTag: 'BBC Planet Earth Ultra Slow-Mo',
    englishPrompt:
      'Extreme close-up macro portrait of an elusive snow leopard perched on a sheer rocky cliff in a swirling Himalayan snowstorm, crystalline snowflakes melting on its thick silver-grey fur, piercing amber eyes locking onto the lens, breath vapor rising in freezing air, ultra slow-motion 120fps, shot on RED V-Raptor 8K, 600mm telephoto lens, shallow depth of field, photorealistic wildlife documentary, raw natural sound feeling.',
    uzbekExplanation:
      'Qor bo\'ronida qoyada turgan qor qoploni. Uning qalin kumushrang juniga tushayotgan qor parchalari, o\'tkir zangori-sariq ko\'zlari va sovuqda chiqayotgan nafas bug\'i 120fps sekin harakatda.',
    cameraDirection: 'Statik makro teleob\'yektiv, fon yumshoq xiralashtirilgan (bokeh), sekin qor yog\'ishi',
    lightingAndMood: 'Tog\' sovuq oppoq tabiiy tarqoq nuri, mayin muz zarralari',
    lensAndCamera: 'RED V-Raptor 8K, 600mm f/4 telephoto lens, 120fps ultra slow-mo',
    negativePrompt:
      'taxidermy, CG animal, blurry eyes, deformed paws, unrealistic fur, jerky motion, warm lighting',
    veoDirectorTip:
      '"Breath vapor rising in freezing air" so\'zlari hayvonning tirik va tabiiy ekanligini AI ga eng zo\'r tarzda yetkazadi.',
    aspectRatio: '16:9',
    fps: '120fps slow-motion',
    previewGradient: 'from-slate-800 via-sky-950 to-slate-900',
  },
  {
    id: 'bioluminescent-ocean',
    titleUz: 'Bioluminessent Okean Tubi',
    titleEn: 'Deep Sea Bioluminescent Jellyfish Ballet',
    category: 'nature',
    styleTag: 'Underwater Macro 4K',
    englishPrompt:
      'Subaquatic cinematic footage in Mariana Trench abyss, ethereal translucent jellyfish pulsing rhythmically with bioluminescent neon cyan, purple, and electric green lights glowing through its tentacles, marine snow drifting slowly through pitch-black water, smooth ascending camera crane motion wrapping gently around the creature, probe macro underwater lens, pristine fluid dynamics, 60fps.',
    uzbekExplanation:
      'Okeanning eng tubida moviy, binafsharang va elektr yashil nurlar taratib ritmik suzayotgan meduzalar. Qop-qorong\'i suvda muallaq suzuvchi mikroorganizm zarralari va kameraning aylana harakati.',
    cameraDirection: 'Meduza atrofida sekin yuqoriga spiral ko\'tariluvchi suv osti kamerasi',
    lightingAndMood: 'Chuqur qora fonda organizmning o\'zidan taralayotgan neon nurlar',
    lensAndCamera: 'Laowa 24mm Probe Macro Lens, suv osti g\'ilofi, 60fps',
    negativePrompt:
      'murky water, overexposed, plastic looking, sudden cuts, pixelated, air bubbles everywhere',
    veoDirectorTip:
      'Meduza harakati uchun "pulsing rhythmically" so\'zini ishlatish animatsiyadagi g\'alati deformatsiyalarni yo\'qotadi.',
    aspectRatio: '16:9',
    fps: '60fps',
    previewGradient: 'from-teal-950 via-emerald-950 to-blue-950',
  },
  {
    id: 'luxury-midnight-perfume',
    titleUz: 'Eksklyuziv Parfyum Tijorat Klipi',
    titleEn: 'Midnight Noir Luxury Perfume Commercial',
    category: 'commercial',
    styleTag: 'High-End Studio Commercial',
    englishPrompt:
      'Commercial grade product video of a heavy crystal perfume bottle embossed with gold filigree resting on black obsidian stone, thick fragrant smoke and gold dust swirling gracefully around the glass, droplets of amber liquid splashing in hyper slow-motion 240fps against the flacon, dramatic chiaroscuro studio lighting, key light skimming faceted glass edges creating chromatic dispersion, anamorphic cinema lens, commercial luxury advertising aesthetics.',
    uzbekExplanation:
      'Qimmatbaho kristall parfyum shishasi ustiga tushayotgan tilla zarralari va tutunlar. Qora obsidian tosh ustida tilla suyuqlik tomchilari 240fps sekin harakatda shishaga uriladi.',
    cameraDirection: 'Mahsulot atrofida silliq 45 gradus aylanma doli va pastdan yuqoriga panoramalash',
    lightingAndMood: 'Dramatik studiya chiaroscuro nuri, shisha chetlarida kamalak dispersiyasi',
    lensAndCamera: 'Cooke Anamorphic /i Full Frame Plus 85mm, f/2.0',
    negativePrompt:
      'cheap plastic, rough edges, low resolution, fingerprint smudges, messy liquid, amateur lighting',
    veoDirectorTip:
      'Tijorat videolari uchun "chromatic dispersion" va "chiaroscuro studio lighting" terminlari aqlbovar qilmas premium effekt beradi.',
    aspectRatio: '16:9',
    fps: '240fps hyper slow-mo',
    previewGradient: 'from-amber-950 via-stone-900 to-black',
  },
  {
    id: 'cyber-hypercar-drift',
    titleUz: 'Elektr Giperkar Tungi Poygasi',
    titleEn: 'Futuristic Electric Hypercar Night Drift',
    category: 'commercial',
    styleTag: 'Dynamic Automotive Commercial',
    englishPrompt:
      'Low-slung matte black electric hypercar drifting through a rain-drenched neon illuminated underground tunnel, red LED taillight light trails painting long streaks across the frame, glowing ceramic brake rotors radiating heat, camera mounted inches above the asphalt tracking alongside the rear wheel in a high-speed pursuit shot, water spray atomizing off tires, anamorphic lens flares, 60fps dynamic motion blur.',
    uzbekExplanation:
      'Yomg\'irli neon tunnelda drift qilayotgan mot qora giperkar. Orqa qizil chiroqlarning uzun yorug\'lik chiziqlari, qizib qizarib turgan tormoz disklari va g\'ildirakdan sachrayotgan suv parchalari.',
    cameraDirection: 'Asfalt ustidan bir necha santimetr balandlikda mashina g\'ildiragi bilan parallel quvish kamerasi',
    lightingAndMood: 'Tunnel neon naychalari, qizil LED chiziqlar, qorong\'i asfaltda kuchli kontrast',
    lensAndCamera: 'Arri Alexa Mini LF, 28mm Anamorphic, past rakursli quvish rigi, 60fps',
    negativePrompt:
      'unrealistic physics, floating car, deformed wheels, low FPS, toy car, daytime, jittery road',
    veoDirectorTip:
      '"Tracking alongside the rear wheel" iborasi avtomobil harakatining dinamik va tezkor chiqishini kafolatlaydi.',
    aspectRatio: '16:9',
    fps: '60fps',
    previewGradient: 'from-red-950 via-zinc-900 to-neutral-950',
  },
  {
    id: 'liquid-gold-morphing',
    titleUz: 'Suyuq Oltin va Qora Marmar Simfoniyasi',
    titleEn: 'Abstract Liquid Gold & Obsidian Morphing',
    category: 'surreal',
    styleTag: '3D Procedural Art Cinema',
    englishPrompt:
      'Hypnotic macro video of molten liquid 24k gold colliding with black liquid obsidian in zero gravity, complex fluid dynamics creating mesmerizing rippling waves and cellular tendrils, iridescent metallic sheen shifting with light angle, seamless organic morphing movement, macro probe lens push-in, octane render quality, subsurface scattering, 8K ultra fine physics simulation, serene zen pace.',
    uzbekExplanation:
      'Nol gravitatsiyada to\'qnashayotgan suyuq 24 karatli oltin va qora obsidian. To\'lqinli naqshlar, metall jilosi va tinchlantiruvchi meditatsion harakat.',
    cameraDirection: 'Suyuqlik to\'lqinlari ichiga kiruvchi doli makro-zoom harakati',
    lightingAndMood: 'Mayin studiya reflektorlari, metall ustida oqib o\'tuvchi tilla akslar',
    lensAndCamera: 'Laowa 24mm Probe Lens, f/8, 4K 60fps',
    negativePrompt:
      'pixelated, muddy colors, jerky fluid, static image, cartoonish, low poly mesh, flat texture',
    veoDirectorTip:
      'Google Flow da bu kabi mavhum (abstract) videolarni yaratishda "zero gravity fluid dynamics" ajoyib silliq natija beradi.',
    aspectRatio: '16:9',
    fps: '60fps',
    previewGradient: 'from-yellow-900 via-amber-950 to-neutral-950',
  },
  {
    id: 'ghibli-floating-castle',
    titleUz: 'Bulutlar ustidagi Afsonaviy Qasr',
    titleEn: 'Celestial Floating Castle Above Clouds',
    category: 'surreal',
    styleTag: 'Makoto Shinkai & Ghibli Cinematic',
    englishPrompt:
      'Breathtaking aerial flythrough past an ancient moss-covered floating castle drifting serenely above a sea of fluffy cumulus clouds during magical golden hour, cascading waterfalls tumbling off floating rock islands evaporating into rainbow mist, ancient airships tethered to stone docks with gently fluttering sails, gentle sun flare leaking into the lens, wide angle drone camera gliding slowly forward, picturesque anime realism, 24fps.',
    uzbekExplanation:
      'Oltin quyosh botishida bulutlar dengizi uzra muallaq suzib yurgan qadimiy tosh qasr. Orollardan pastga oqayotgan va kamalakka aylanayotgan sharsharalar, havo kemalari.',
    cameraDirection: 'Bulutlar oralab qasr tomon oldinga ravon uchib boruvchi dron harakati',
    lightingAndMood: 'Sehrli oltin soat (golden hour), bulutlar ostidan taralayotgan iliq quyosh nurlari',
    lensAndCamera: 'Wide Angle Cinematic Drone Camera, 24mm, yumshoq yorug\'lik filtri',
    negativePrompt:
      'dark gloomy, ugly clouds, jittery flying, flat 2D sketch, modern buildings, modern cars',
    veoDirectorTip:
      '"Cascading waterfalls evaporating into rainbow mist" kadrga hayot va mikrodinamika qo\'shadi.',
    aspectRatio: '16:9',
    fps: '24fps',
    previewGradient: 'from-amber-800 via-orange-950 to-sky-950',
  },
  {
    id: 'viral-tokyo-streetwear',
    titleUz: 'Tokio Ko\'chasi Moda Yurishi (Reels/Shorts)',
    titleEn: 'Tokyo Harajuku Cyber-Streetwear Walk',
    category: 'reels',
    styleTag: '9:16 Vertical Fashion Film',
    englishPrompt:
      'Vertical 9:16 high-energy fashion runway tracking shot through illuminated rain-slicked alleys of Shibuya Tokyo, stylish Japanese model wearing an avant-garde iridescent holographic puffer jacket walking purposefully toward the camera, camera backpedaling seamlessly on a steadycam gimbal maintaining perfect framing, neon signs glowing in Japanese kanji reflected in sunglasses, snappy whip pans and speed ramping, 60fps cinematic 4K.',
    uzbekExplanation:
      'Instagram Reels va YouTube Shorts uchun vertikal format: Tokioda golografik kurtka kiygan modelning kameraga qarab ishonchli qadam tashlashi, neon chiroqlar va silliq stedicam quvishi.',
    cameraDirection: 'Model oldidan orqaga qarab yuruvchi ravon stedicam, dinamik yaqinlashuv',
    lightingAndMood: 'Shibuya ko\'chalarining qizil va ko\'k neonlari, ko\'zoynakda aks etgan kanji yozuvlari',
    lensAndCamera: 'Sony FX3 + 35mm f/1.4 GM, vertikal rig, 60fps',
    negativePrompt:
      'horizontal, 16:9, shaky footage, blurry face, static walking, low quality, bad clothing wrinkles',
    veoDirectorTip:
      'Vertikal videolar uchun har doim prompt boshiga "Vertical 9:16" yoki Google Flow parametrlari orasida 9:16 nisbatini belgilang.',
    aspectRatio: '9:16',
    fps: '60fps',
    previewGradient: 'from-fuchsia-950 via-purple-900 to-indigo-950',
  },
  {
    id: 'fpv-alpine-forest-dive',
    titleUz: 'Alp O\'rmonlari FPV Dron Sho\'ng\'ishi',
    titleEn: 'Acrobatic FPV Drone Dive Through Alpine Forest',
    category: 'reels',
    styleTag: '9:16 Adrenaline FPV Action',
    englishPrompt:
      'Vertical 9:16 ultra high-speed acrobatic FPV drone flight diving straight down a sheer snow-covered mountain ridge, skimming inches above towering pine tree canopies, carving through sunlit gaps between branches at 100mph, banking sharp 90-degree roll above a rushing turquoise glacial river, crystal clear motion blur, 4K 60fps GoPro 12 color science, horizon-locked, intense kinetic energy.',
    uzbekExplanation:
      '9:16 vertikal formatda tog\' cho\'qqisidan qarag\'aylar o\'rmoniga 160 km/soat tezlikda sho\'ng\'iyotgan FPV dron parvozi. Muzdek moviy daryo ustida keskin burilish.',
    cameraDirection: 'Tezkor FPV akrobatik sho\'ng\'ish va daraxtlar oralab 90 gradus burilish',
    lightingAndMood: 'Qarag\'aylar orasidan tushayotgan erta tonggi quyosh nurlari, toza tog\' havosi',
    lensAndCamera: 'GoPro Hero 12 Flat Profile, Ultra-Wide 155° FOV, 60fps',
    negativePrompt:
      'slow motion, stuttering framerate, indoor, washed out, low resolution, flat colors',
    veoDirectorTip:
      '"Banking sharp 90-degree roll" so\'zi drom kamerasining tabiiy fizika qonunlariga mos egilishini yaratadi.',
    aspectRatio: '9:16',
    fps: '60fps dynamic',
    previewGradient: 'from-emerald-950 via-teal-950 to-slate-900',
  },
  {
    id: 'medieval-dragon-fjord',
    titleUz: 'Tumanli Fjordlar Ustida Ajdaho',
    titleEn: 'Colossal Dragon Gliding Over Nordic Fjords',
    category: 'cinematic',
    styleTag: 'Dark Epic Fantasy',
    englishPrompt:
      'Sweeping cinematic helicopter shot revealing a colossal ancient black dragon with massive leathery wings gliding silently through dramatic sea fog above towering Norwegian fjords, cold northern wind parting the mist, dragon breath glowing like dying embers inside its throat, water ripples spreading as wingtips graze the fjord surface, ARRI Alexa 65, IMAX aspect ratio, photorealistic scales and muscular anatomy, Lord of the Rings scale, 24fps.',
    uzbekExplanation:
      'Norvegiya fyordlari uzra tumanlar oralab suzayotgan qadimiy bahaybat ajdaho. Qanotlari uchi suvga tegib to\'lqin hosil qiladi, tomog\'ida yonayotgan cho\'g\' nurlari.',
    cameraDirection: 'Vertolyot kamerasi kabi tuman ortidan ajdaho tomon panoramali yaqinlashish',
    lightingAndMood: 'Shimolning sovuq mavhum nuri, quyuq dengiz tumani, ajdaho ichidagi qizil cho\'g\' effekti',
    lensAndCamera: 'ARRI Alexa 65, Panavision 50mm Anamorphic, 24fps',
    negativePrompt:
      'cartoon dragon, plastic wings, flat ocean, low detail, bright colorful, Disney style',
    veoDirectorTip:
      '"Wingtips graze the water surface creating ripples" iborasi qahramonning atrof-muhit bilan real fizik aloqasini yaratadi.',
    aspectRatio: '21:9',
    fps: '24fps',
    previewGradient: 'from-slate-900 via-neutral-900 to-cyan-950',
  },
  {
    id: 'cybernetic-android-wake',
    titleUz: 'Kibernetik Android Uyg\'onishi',
    titleEn: 'Bioluminescent Cybernetic Android Awakening',
    category: 'surreal',
    styleTag: 'Sci-Fi Body Horror / Cyberpunk',
    englishPrompt:
      'Extreme close-up macro of an ultra-realistic cybernetic female android awakening in a sterile cryo-chamber, optical sensors dilating from deep obsidian black into vibrant neon violet concentric rings, translucent porcelain skin revealing intricate micro-fiber optic conduits pulsing with energy beneath, a single synthetic tear rolling down the cheek, slow 120fps macro dolly-out, Blade Runner 2049 aesthetic, master cinematography.',
    uzbekExplanation:
      'Kriokamerada ko\'zlarini ochayotgan kibernetik android. Ko\'z qorachiqlarida binafsharang neon doiralar harakati, yarim shaffof teri ostidagi optik tolalarning miltillashi va sintetik ko\'z yoshi.',
    cameraDirection: 'Ko\'z qorachig\'idan butun yuzga qarab sekin doli-aut (uzoqlashish)',
    lightingAndMood: 'Steril laboratoriya ko\'k-oq chiroqlari va binafsharang optik nurlar',
    lensAndCamera: 'Master Prime 100mm Macro, f/2.0, 120fps sekin harakat',
    negativePrompt:
      'mannequin, bad eyes, blurred pupils, video game graphic, low poly, noisy background',
    veoDirectorTip:
      '"Concentric rings dilating" ko\'z harakatiga hayratlanarli darajada real mexanik dinamika beradi.',
    aspectRatio: '16:9',
    fps: '120fps',
    previewGradient: 'from-purple-950 via-slate-950 to-indigo-950',
  },
];
