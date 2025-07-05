import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

const assemblyAiApiKey = process.env.ASSEMBLYAI_API_KEY;
const accessCode = process.env.ACCESS_CODE;

export async function POST(request: NextRequest) {
  try {
    if (!assemblyAiApiKey) {
      return NextResponse.json(
        { error: "Credenciais do AssemblyAI não configuradas" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const accessCode = formData.get("accessCode") as string;
    const audioFile = formData.get("audioFile") as File;
    const audioUrl = formData.get("audioUrl") as string;

    if (!accessCode) {
      return NextResponse.json(
        { error: "Access code é obrigatório" },
        { status: 400 }
      );
    }

    if (accessCode !== accessCode) {
      return NextResponse.json(
        { error: "Access code inválido" },
        { status: 400 }
      );
    }

    if (!audioFile && !audioUrl) {
      return NextResponse.json(
        { error: "Arquivo de áudio ou URL do áudio é obrigatório" },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      accessCode,
      transcriptId: transcript.id,
      fullText: fullText?.trim(),
      inputType: audioFile ? "file" : "url",
    });

  } catch (error) {
    console.error("Erro ao processar transcrição:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transcriptId = searchParams.get("transcriptId");

    if (!transcriptId) {
      return NextResponse.json(
        { error: "Transcript ID é obrigatório" },
        { status: 400 }
      );
    }

    if (!assemblyAiApiKey) {
      return NextResponse.json(
        { error: "Credenciais do AssemblyAI não configuradas" },
        { status: 500 }
      );
    }

    const assemblyAiClient = new AssemblyAI({
      apiKey: assemblyAiApiKey,
    });

    const transcript = await assemblyAiClient.transcripts.get(transcriptId);

    return NextResponse.json({
      success: true,
      transcriptId,
      status: transcript.status,
      text: transcript.text,
      utterances: transcript.utterances,
    });

  } catch (error) {
    console.error("Erro ao buscar transcrição:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
