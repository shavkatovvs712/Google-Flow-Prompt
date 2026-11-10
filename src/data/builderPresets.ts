export interface BuilderOption {
  id: string;
  labelUz: string;
  labelEn: string;
  valueEn: string;
  iconName?: string;
  category: string;
}

export const CAMERA_MOTIONS: BuilderOption[] = [
  {
    id: 'orbit',
    labelUz: '360° Aylana (Orbit)',
    labelEn: '360° Orbit Shot',
    valueEn: 'smooth 360-degree orbital camera movement circling around the subject at constant speed',
    category: 'motion',
  },
  {
    id: 'dolly_in',
    labelUz: 'Sekin Yaqinlashish (Dolly In)',
    labelEn: 'Slow Dolly In',
    valueEn: 'slow cinematic push-in dolly shot moving directly toward the central subject',
    category: 'motion',
  },
  {
    id: 'fpv_drone',
    labelUz: 'FPV Dron Sho\'ng\'ishi',
    labelEn: 'FPV Drone Dive',
    valueEn: 'dynamic high-speed FPV drone dive soaring down with smooth roll and bank maneuvers',
    category: 'motion',
  },
  {
    id: 'tracking',
    labelUz: 'Yonma-yon Quvish (Tracking)',
    labelEn: 'Parallel Tracking',
    valueEn: 'high-speed parallel tracking shot keeping pace with the moving subject alongside the action',
    category: 'motion',
  },
  {
    id: 'crane_boom',
    labelUz: 'Yuqoriga Ko\'tarilish (Crane Up)',
    labelEn: 'Crane Boom Up',
    valueEn: 'grand sweeping crane boom shot rising from ground level high into an epic aerial vantage point',
    category: 'motion',
  },
  {
    id: 'macro_probe',
    labelUz: 'Ichkariga Makro Kirish',
    labelEn: 'Macro Probe Push',
    valueEn: 'extreme probe macro lens gliding slowly through intricate textures with intense depth',
    category: 'motion',
  },
  {
    id: 'dolly_zoom',
    labelUz: 'Vertigo Effekti (Dolly Zoom)',
    labelEn: 'Vertigo Dolly Zoom',
    valueEn: 'dramatic vertigo dolly zoom effect with warping background perspective while subject stays locked',
    category: 'motion',
  },
  {
    id: 'static_lock',
    labelUz: 'Statik Gollivud Shtativi',
    labelEn: 'Locked Tripod Shot',
    valueEn: 'steady locked-off cinematic tripod shot with natural motion flowing across the static frame',
    category: 'motion',
  },
];

export const LIGHTING_STYLES: BuilderOption[] = [
  {
    id: 'golden_hour',
    labelUz: 'Oltin Soat (Quyosh botishi)',
    labelEn: 'Golden Hour Sunset',
    valueEn: 'magical golden hour natural sunlight with warm lens flares and long soft shadows',
    category: 'lighting',
  },
  {
    id: 'cyberpunk_neon',
    labelUz: 'Kiberpank Neon (Ko\'k & Pushti)',
    labelEn: 'Cyberpunk Neon Glow',
    valueEn: 'moody cyberpunk rain lighting with high-contrast neon cyan and magenta reflections',
    category: 'lighting',
  },
  {
    id: 'volumetric_fog',
    labelUz: 'Volumetrik Tuman & Nur Chiziqlari',
    labelEn: 'Volumetric Rays & Fog',
    valueEn: 'atmospheric volumetric god rays slicing through heavy misty haze and dust motes',
    category: 'lighting',
  },
  {
    id: 'chiaroscuro',
    labelUz: 'Chiaroscuro (Dramatik Soya)',
    labelEn: 'Dramatic Chiaroscuro',
    valueEn: 'deep dramatic chiaroscuro Rembrandt studio lighting with intense rim light and pitch shadows',
    category: 'lighting',
  },
  {
    id: 'bioluminescent',
    labelUz: 'Bioluminessent (O\'zidan yonuvchi)',
    labelEn: 'Bioluminescent Glow',
    valueEn: 'pitch-black ambient with organic bioluminescent neon blue and emerald self-illuminating glow',
    category: 'lighting',
  },
  {
    id: 'studio_softbox',
    labelUz: 'Studiya Softbox (Tijorat)',
    labelEn: 'Studio Softbox Clean',
    valueEn: 'pristine commercial studio lighting with giant diffused softbox and crisp edge reflection highlights',
    category: 'lighting',
  },
];

export const LENS_OPTIONS: BuilderOption[] = [
  {
    id: 'arri_anamorphic',
    labelUz: 'ARRI Alexa 65 + 35mm Anamorphic',
    labelEn: 'ARRI 35mm Anamorphic',
    valueEn: 'shot on ARRI Alexa 65 with 35mm Panavision anamorphic lens, shallow depth of field, subtle chromatic flare',
    category: 'lens',
  },
  {
    id: 'imax_70mm',
    labelUz: 'IMAX 70mm Format',
    labelEn: 'IMAX 70mm Grand Scale',
    valueEn: 'shot on IMAX 70mm film camera, breathtaking ultra-sharp resolution, deep depth of field, colossal scope',
    category: 'lens',
  },
  {
    id: 'probe_macro',
    labelUz: 'Laowa 24mm Probe Makro Ob\'yektiv',
    labelEn: '24mm Probe Macro',
    valueEn: 'shot on Laowa 24mm Probe Macro Lens, extreme microscopic intimacy, f/14 deep focus on tiny details',
    category: 'lens',
  },
  {
    id: 'vintage_16mm',
    labelUz: 'Vintage 16mm Retro Film',
    labelEn: '16mm Vintage Film Grain',
    valueEn: 'shot on vintage 16mm Bolex camera, authentic organic film grain, warm nostalgic tones, light halation',
    category: 'lens',
  },
  {
    id: 'portrait_85mm',
    labelUz: '85mm f/1.2 Portret Bokeh',
    labelEn: '85mm f/1.2 Portrait Bokeh',
    valueEn: 'shot on 85mm f/1.2 prime lens, razor-sharp subject with creamy buttery background bokeh blur',
    category: 'lens',
  },
];

export const MOTION_DYNAMICS: BuilderOption[] = [
  {
    id: 'slow_120fps',
    labelUz: '120fps Ultra Sekin Harakat (Slow-Mo)',
    labelEn: '120fps Ultra Slow-Mo',
    valueEn: 'ultra slow-motion 120fps capture, every particle and droplet suspended in mesmerizing time',
    category: 'dynamics',
  },
  {
    id: 'cinema_24fps',
    labelUz: '24fps Gollivud Standarti',
    labelEn: '24fps Cinematic Standard',
    valueEn: 'cinematic 24fps film shutter with natural 180-degree motion blur and authentic cinema pacing',
    category: 'dynamics',
  },
  {
    id: 'hyperlapse',
    labelUz: 'Giperlaps (10x Tezlashtirilgan Harakat)',
    labelEn: 'Kinetic Hyperlapse 10x',
    valueEn: 'kinetic hyperlapse camera moving smoothly through space with accelerated time-lapse of surrounding elements',
    category: 'dynamics',
  },
  {
    id: 'fluid_physics',
    labelUz: 'Tabiiy Suyuqlik & Shamol Fizikasi',
    labelEn: 'Fluid & Wind Physics',
    valueEn: 'realistic fluid dynamics, wind ripples propagating across surfaces with accurate physical momentum',
    category: 'dynamics',
  },
];

export const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9', descriptionUz: 'YouTube, Kino, Kompyuter', aspectClass: 'aspect-video' },
  { id: '9:16', label: '9:16', descriptionUz: 'TikTok, Reels, Shorts', aspectClass: 'aspect-[9/16]' },
  { id: '21:9', label: '21:9', descriptionUz: 'Cinemascope Keng Kadr', aspectClass: 'aspect-[21/9]' },
  { id: '1:1', label: '1:1', descriptionUz: 'Instagram Post / Kvadrat', aspectClass: 'aspect-square' },
];

export const QUICK_IDEA_TAGS = [
  'Kiberpank Toshkent 2099',
  'Interstellar qora tuynuk',
  'Muzli tog\'da qor qoploni',
  'Qadimiy Registon oltin soatda',
  'Bioluminessent okean tubi',
  'Hashamatli parfyum reklamasi',
  'Yomg\'irli tunda drift giperkar',
  'Gravitatsiyasiz suyuq oltin',
  'Bulutlar ustidagi qadimiy qasr',
  'Alp tog\'larida FPV dron',
  'Kelajak robotining uyg\'onishi',
];
