import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
import { TranscriptionResponse, TranscriptionError } from "@/models/transcription";

const assemblyAiApiKey = process.env.ASSEMBLYAI_API_KEY;
const accessCodeKey = process.env.ACCESS_CODE;

export async function POST(request: NextRequest) {
  try {
    if (!assemblyAiApiKey) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Credenciais do AssemblyAI não configuradas"
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const formData = await request.formData();
    const accessCode = formData.get("accessCode") as string;
    const audioFile = formData.get("audioFile") as File;
    const audioUrl = formData.get("audioUrl") as string;
    const theme = formData.get("theme") as string;

    if (!accessCode) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Access code é obrigatório"
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (accessCode !== accessCodeKey) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Access code inválido"
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!audioFile && !audioUrl) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Arquivo de áudio ou URL do áudio é obrigatório"
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const assemblyAiClient = new AssemblyAI({
      apiKey: assemblyAiApiKey,
    });

    let transcript;

    if (audioFile) {
      const audioBuffer = await audioFile.arrayBuffer();
      const audioUint8Array = new Uint8Array(audioBuffer);
      const uploadUrl = await assemblyAiClient.files.upload(audioUint8Array);

      transcript = await assemblyAiClient.transcripts.transcribe({
        audio: uploadUrl,
        speech_model: "best",
        language_code: "pt",
      });
    } else if (audioUrl) {
      transcript = await assemblyAiClient.transcripts.transcribe({
        audio: audioUrl,
        speech_model: "best",
        language_code: "pt",
      });
    }

    if (!transcript) {
      throw new Error("Falha ao processar transcrição");
    }

    const fullText = transcript.text;

    const successResponse: TranscriptionResponse = {
      success: true,
      accessCode,
      transcriptId: transcript.id,
      fullText: fullText?.trim() || "",
      inputType: audioFile ? "file" : "url",
      theme: theme || "general",
    };

    return NextResponse.json(successResponse);

  } catch (error) {
    console.error("Erro ao processar transcrição:", error);
    const errorResponse: TranscriptionError = {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transcriptId = searchParams.get("transcriptId");

    if (!transcriptId) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Transcript ID é obrigatório"
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!assemblyAiApiKey) {
      const errorResponse: TranscriptionError = {
        success: false,
        error: "Credenciais do AssemblyAI não configuradas"
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const assemblyAiClient = new AssemblyAI({
      apiKey: assemblyAiApiKey,
    });

    const transcript = await assemblyAiClient.transcripts.get(transcriptId);

    const successResponse = {
      success: true,
      transcriptId,
      status: transcript.status,
      text: transcript.text,
      utterances: transcript.utterances,
    };

    return NextResponse.json(successResponse);

  } catch (error) {
    console.error("Erro ao buscar transcrição:", error);
    const errorResponse: TranscriptionError = {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
