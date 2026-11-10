export interface GuideSection {
  id: string;
  titleUz: string;
  summaryUz: string;
  bullets: string[];
  codeExample?: string;
  tip?: string;
}

export const MASTER_GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'intro',
    titleUz: '1. Google Flow va Google Veo nima?',
    summaryUz:
      'Google Veo va Google Flow (VideoFX) — bu Google tomonidan yaratilgan eng ilg\'or generativ AI video modellari bo\'lib, matn (prompt) orqali Gollivud darajasidagi 1080p va 4K formatdagi yuqori aniqlikdagi videolarni fizik qonuniyatlarga va kinematografiya qoidalariga to\'liq amal qilgan holda hosil qiladi.',
    bullets: [
      'Kinematik boshqaruv: Kamera harakatlarini (Pan, Tilt, Zoom, Dolly, Orbit, FPV) aniq tushunadi.',
      'Fizik haqiqiylik: Suyuqlik dinamikasi, shamol, tortishish kuchi va yorug\'lik nurlarining akslanishini tabiiy hisoblaydi.',
      'Uzoq davomiylik va barqarorlik: Kadrlar orasida obyektlarning g\'oyib bo\'lishi yoki noo\'rin deformatsiyalanishi (morphing) minimum darajaga tushirilgan.',
      'Turli tomonlar nisbati: 16:9 (kino/YouTube), 9:16 (TikTok/Reels/Shorts) va 21:9 (Cinemascope) formatlarini qo\'llab-quvvatlaydi.',
    ],
    tip: 'Google Flow ingliz tilidagi kinematik atamalarni juda chuqur tushunadi. Shuning uchun o\'zbekcha g\'oyangizni professional inglizcha kinematik promptga aylantirib kiritish eng ajoyib natijani beradi.',
  },
  {
    id: 'formula',
    titleUz: '2. Mukammal Video Prompt Formulasi (5 ta Qadam)',
    summaryUz:
      'Oddiy rasm yaratishdan farqli o\'laroq, videoda HARAKAT (Motion) eng asosiy omildir. Oddiygina "mashina ketayapti" deb yozilsa, model statik yoki g\'alati kadr beradi. Ushbu formulaga rioya qiling:',
    bullets: [
      '1. [Asosiy Obyekt va Harakat] (Subject & Specific Action): Kim yoki nima qanday aniq harakat qilyapti?',
      '2. [Kamera Harakati va Rakursi] (Camera Motion & Angle): Kamera qayerga va qanday tezlikda siljiyapti?',
      '3. [Yorug\'lik va Atmosfera] (Lighting & Atmosphere): Qanday chiroq, tuman, ob-havo, tilla soat yoki neon?',
      '4. [Kamera Texnikasi va Ob\'yektiv] (Camera & Lens): ARRI Alexa 65, 35mm Anamorphic, Macro Probe lens, chuqur/sayoz fokus?',
      '5. [Rang Korreksiyasi va Kadr Tezligi] (Color Grading & FPS): DaVinci teal & orange, 24fps film shutter yoki 120fps slow-motion?',
    ],
    codeExample:
      '[Subject & Action]: Futuristic samurai in carbon-fiber armor parrying a blow\n+ [Camera]: High-speed 360-degree orbit shot dropping into low angle\n+ [Lighting]: Rainy midnight alley with reflected crimson neon signs\n+ [Lens]: 35mm anamorphic lens, shallow depth of field, subtle film grain\n+ [Dynamics]: 60fps slow-motion, water droplets scattering off the sword blade',
    tip: 'Har doim sahnada mikro-harakatlarni eslatib o\'ting: masalan, "sochlarning shamolda hilpirashi", "chang zarralarining quyosh nurida uchishi", "suv sachrashi". Bu AI ga kadr qotib qolmasligini bildiradi.',
  },
  {
    id: 'camera-moves',
    titleUz: '3. Kamera Harakatlari Lug\'ati (Cheat-Sheet)',
    summaryUz:
      'Google Flow ga aynan qanday harakat kerakligini ko\'rsatish uchun quyidagi atamalarni promptga qo\'shing:',
    bullets: [
      'FPV Drone Dive: Tog\' yoki binodan tik pastga yuqori tezlikda sho\'ng\'uvchi dron harakati.',
      'Dolly In / Dolly Out: Kameraning aravachada obyekt tomon silliq yaqinlashishi yoki uzoqlashishi.',
      '360-Degree Orbit: Obyekt markazda turgan holda kamera uning atrofida aylanib chiqadi.',
      'Tracking Shot: Harakatlanayotgan mashina, odam yoki hayvon yonida birga yuguruvchi kamera.',
      'Crane / Jib Boom Shot: Pastdan boshlanib birdaniga osmonga ko\'tariluvchi epik kran kadri.',
      'Whip Pan: Bir obyektidan ikkinchisiga chaqmoqdek tezlikda buriluvchi dinamik kadr.',
      'Dolly Zoom (Vertigo Effect): Fon cho\'zilayotgan paytda obyekt hajmi o\'zgarmay qoluvchi dramatik effekt.',
      'Low-Angle Hero Shot: Pastdan tepaga qaralgan, qahramonni bahaybat va kuchli ko\'rsatuvchi burchak.',
    ],
    tip: 'Promptingizda "Camera moves smoothly" deb yozmang. Buning o\'rniga: "Slow cinematic dolly-in at eye-level" deb yozing.',
  },
  {
    id: 'negative-prompts',
    titleUz: '4. Salbiy Promptlar (Negative Prompts) Sirlari',
    summaryUz:
      'Negative prompt — bu modelga videoda NIMALAR BO\'LMASLIGI kerakligini buyurishdir. Ular sun\'iy deformatsiya va nuqsonlarni bartaraf qiladi.',
    bullets: [
      'Harakat xatolari: jittery motion, morphing artifacts, erratic camera shaking, stuttering framerate.',
      'Sifat xatolari: blurry, pixelated, 3D video game look, low poly, oversaturated, amateur footage.',
      'Fizik xatolar: floating limbs, melting objects, unrealistic physics, duplicated subjects.',
      'Tavsiya etilgan universal salbiy prompt: "jittery motion, morphing faces, duplicate limbs, cartoon, 3D render artifact, low resolution, blurry, erratic camera shaking, blown-out highlights, amateur phone video".',
    ],
    tip: 'Google Flow / Veo da salbiy promptni alohida "Negative prompt" maydoniga kiritish kadr tozaligini 70% ga oshiradi.',
  },
];
