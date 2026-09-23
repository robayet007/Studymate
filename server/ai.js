import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStudyAdvice({ prompt, context = {} }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "You are StudyMate AI, a concise and supportive study assistant. Give practical, safe, and structured study guidance.",
      },
      {
        role: "user",
        content: JSON.stringify({ prompt, context }),
      },
    ],
  });

  return response.output_text;
}
