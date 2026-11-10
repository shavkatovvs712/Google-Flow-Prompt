export interface VideoPrompt {
  id: string;
  titleUz: string;
  titleEn: string;
  category: 'cinematic' | 'nature' | 'commercial' | 'surreal' | 'reels';
  styleTag: string;
  englishPrompt: string;
  uzbekExplanation: string;
  cameraDirection: string;
  lightingAndMood: string;
  lensAndCamera: string;
  negativePrompt: string;
  veoDirectorTip: string;
  aspectRatio: '16:9' | '9:16' | '21:9' | '1:1';
  fps?: string;
  previewGradient?: string;
  isFavorite?: boolean;
}

export interface CinemaTerm {
  term: string;
  meaningUz: string;
  exampleEn?: string;
}

export interface PromptGenerationResponse {
  conceptSummaryUz: string;
  prompts: {
    titleUz: string;
    titleEn: string;
    styleTag: string;
    englishPrompt: string;
    uzbekExplanation: string;
    cameraDirection: string;
    lightingAndMood: string;
    lensAndCamera: string;
    negativePrompt: string;
    veoDirectorTip: string;
  }[];
  keyCinemaTerms: CinemaTerm[];
}
