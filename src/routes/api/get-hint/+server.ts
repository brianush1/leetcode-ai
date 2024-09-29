import type { APIErrors } from "$lib/api.js";
import { data, saveData, type Database } from "$lib/server/db.js";
import { JudgeVerdict, Language, compile, run } from "$lib/server/judge.js";
import {
  getProblemList,
  judgeSubmission,
  type ProblemStatement,
} from "$lib/server/problems.js";
import { json } from "@sveltejs/kit";
import z from "zod";
import OpenAI from "openai";

const schema = z.object({
  verdict: JudgeVerdict,
  title: z.string(),
  description: z.string(),
  language: Language,
  filename: z.string(),
  code: z.string(),
});

export type HintResponse =
  | {
      success: true;
      hint: string;
    }
  | APIErrors;

export async function POST({ request, fetch, cookies }) {
  const input = schema.safeParse(await request.json());
  if (!input.success) {
    return json({
      success: false,
      errors: input.error.flatten(),
    });
  }

  const token = cookies.get("token");
  let user: Database["users"][number] | undefined;
  if (token) {
    user = data.users.find((x) => x.token === token);
  }
  if (!user) {
    return json({
      success: false,
      errors: {
        formErrors: ["This endpoint requires you to be logged in"],
        fieldErrors: {},
      },
    });
  }

  console.log(process.env.OPENROUTER_API_KEY);

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const { verdict, title, description, language, filename, code } = input.data;

  const prompt = `As a code assistant, please provide hints given the following information below"
    Problem description: ${description}
    User code: ${code}
    Programming Language: ${language}`;

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  console.log(completion.choices[0].message);

  return json({
    success: true,
    hint: completion.choices[0].message,
  });
}
