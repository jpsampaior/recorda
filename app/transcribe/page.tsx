"use client";

import { useState, useRef } from "react";
import { Upload, Link, Key, Palette, FileAudio, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  TranscriptionResponse, 
  TranscriptionTheme, 
  ApiTranscriptionResponse 
} from "@/models/transcription";

export default function TranscribePage() {
  const [accessCode, setAccessCode] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("general");
  const [transcription, setTranscription] = useState<TranscriptionResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const themes: TranscriptionTheme[] = [
    { value: "general", label: "Geral" },
    { value: "medical", label: "Médico" },
    { value: "business", label: "Negócios" },
    { value: "education", label: "Educação" },
    { value: "legal", label: "Jurídico" },
    { value: "technical", label: "Técnico" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        setAudioUrl(""); // Limpar URL se arquivo for selecionado
        toast.success("Arquivo de áudio selecionado!");
      } else {
        toast.error("Por favor, selecione um arquivo de áudio válido");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        setAudioUrl(""); // Limpar URL se arquivo for selecionado
        toast.success("Arquivo de áudio selecionado!");
      } else {
        toast.error("Por favor, selecione um arquivo de áudio válido");
      }
    }
  };

  const transcribeAudio = async (formData: FormData): Promise<TranscriptionResponse> => {
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data: ApiTranscriptionResponse = await response.json();

    if (!response.ok) {
      throw new Error('error' in data ? data.error : "Erro ao transcrever áudio");
    }

    if (!data.success) {
      throw new Error('error' in data ? data.error : "Falha na transcrição");
    }

    return data as TranscriptionResponse;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode) {
      toast.error("Access code é obrigatório");
      return;
    }

    if (!selectedFile && !audioUrl) {
      toast.error("Arquivo de áudio ou URL é obrigatório");
      return;
    }

    setIsLoading(true);
    setTranscription(null);

    const formData = new FormData();
    formData.append('accessCode', accessCode);
    formData.append('theme', selectedTheme);
    
    if (selectedFile) {
      formData.append('audioFile', selectedFile);
    } else if (audioUrl) {
      formData.append('audioUrl', audioUrl);
    }

    toast.promise(
      transcribeAudio(formData),
      {
        loading: 'Transcrevendo áudio...',
        success: (data: TranscriptionResponse) => {
          setTranscription(data);
          setIsLoading(false);
          return 'Transcrição realizada com sucesso!';
        },
        error: (error) => {
          console.error('Erro:', error);
          setIsLoading(false);
          return error.message || 'Erro ao processar transcrição';
        },
      }
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Texto copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar texto");
    }
  };

  const clearForm = () => {
    setAccessCode("");
    setAudioUrl("");
    setSelectedFile(null);
    setSelectedTheme("general");
    setTranscription(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/50 via-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Transcrição de Áudio
          </h1>
          <p className="text-muted-foreground text-lg">
            Transcreva seus áudios usando IA avançada
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Access Code */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <Key className="w-4 h-4" />
                <span>Access Code</span>
              </Label>
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Digite o access code"
                required
                disabled={isLoading}
              />
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <Palette className="w-4 h-4" />
                <span>Tema</span>
              </Label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme} disabled={isLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tema" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audio Input Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Áudio para Transcrição</h3>
              
              {/* File Upload */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Upload className="w-4 h-4" />
                  <span>Arquivo de Áudio</span>
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <FileAudio className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground mb-2">
                    {selectedFile ? selectedFile.name : "Arraste um arquivo de áudio aqui ou clique para selecionar"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Suporta MP3, WAV, M4A e outros formatos de áudio
                  </p>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                    disabled={isLoading}
                  >
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Link className="w-4 h-4" />
                  <span>OU URL do Áudio</span>
                </Label>
                <Input
                  type="url"
                  value={audioUrl}
                  onChange={(e) => {
                    setAudioUrl(e.target.value);
                    setSelectedFile(null); // Limpar arquivo se URL for inserida
                  }}
                  placeholder="https://exemplo.com/audio.mp3"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transcrevendo...</span>
                  </>
                ) : (
                  <span>Transcrever Áudio</span>
                )}
              </Button>
              
              <Button
                type="button"
                onClick={clearForm}
                variant="outline"
                size="lg"
                disabled={isLoading}
              >
                Limpar
              </Button>
            </div>
          </form>
        </div>

        {/* Results */}
        {transcription && (
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Resultado da Transcrição</h2>
              <Button
                onClick={() => copyToClipboard(transcription.fullText)}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">ID da Transcrição</h3>
                <p className="text-foreground font-mono text-sm bg-muted p-2 rounded">{transcription.transcriptId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tipo de Input</h3>
                <p className="text-foreground capitalize">{transcription.inputType}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Texto Transcrito</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {transcription.fullText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 