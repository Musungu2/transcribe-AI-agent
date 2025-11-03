import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const transcriptionTool = createTool({
  id: "transcribe-audio",
  description: "Transcribes audio files into text using OpenAI Whisper",

  inputSchema: z.object({
    audioUrl: z.string().describe("URL of the audio file"),
  }),

  outputSchema: z.object({
    transcript: z.string(),
  }),


  execute: async ({ context }) => {
    const { audioUrl } = context;

    const formData = new FormData();
    formData.append("model", "whisper-1");

    const audioBlob = await fetch(audioUrl).then((res) => res.blob());
    formData.append("file", audioBlob, "audio.mp3");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { transcript: data.text };
  },
});
