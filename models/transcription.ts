// Types for transcription domain

export interface TranscriptionRequest {
  accessCode: string;
  audioFile?: File;
  audioUrl?: string;
  theme: string;
}

export interface TranscriptionResponse {
  success: boolean;
  accessCode: string;
  transcriptId: string;
  fullText: string;
  inputType: 'file' | 'url';
  theme: string;
}

export interface TranscriptionError {
  success: false;
  error: string;
}

export interface TranscriptionStatusResponse {
  success: boolean;
  transcriptId: string;
  status: string;
  text?: string;
  utterances?: TranscriptionUtterance[];
}

export interface TranscriptionUtterance {
  confidence: number;
  end: number;
  speaker: string;
  start: number;
  text: string;
}

export interface TranscriptionTheme {
  value: string;
  label: string;
}

export interface TranscriptionFormData {
  accessCode: string;
  audioUrl: string;
  selectedTheme: string;
  selectedFile: File | null;
  isLoading: boolean;
  transcription: TranscriptionResponse | null;
}

// API Response types
export type ApiTranscriptionResponse = TranscriptionResponse | TranscriptionError;
export type ApiTranscriptionStatusResponse = TranscriptionStatusResponse | TranscriptionError;

// Form validation types
export interface TranscriptionFormValidation {
  accessCode: string;
  audioInput: string;
  theme: string;
} 