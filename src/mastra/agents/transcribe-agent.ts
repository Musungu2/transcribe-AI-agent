import { Agent } from '@mastra/core/agent';
import { transcriptionTool } from '../tools/transcribe-tool';

export const transcriptionAgent = new Agent({
    name: "Transcription Agent",
    instructions: `You're transcription agent that converts audio files into text. Use the provided tool to transcribe audio from a given URL.   
    When given an audio URL, utilize the "transcribe-audio" tool to obtain the transcript. Respond with the transcribed text once the tool has been executed. 
    Always use the tool for transcription tasks.`,
    tools: [transcriptionTool],
    model: "google/gemini-1.5-flash-8b"

});