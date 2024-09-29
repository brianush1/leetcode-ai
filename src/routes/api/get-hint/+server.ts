import type { APIErrors } from "$lib/api.js";
import { data, saveData, type Database } from "$lib/server/db.js";
import { JudgeVerdict, Language, compile, run } from "$lib/server/judge.js";
import { getProblemList, judgeSubmission, type ProblemStatement } from "$lib/server/problems.js";
import { json } from "@sveltejs/kit";
import z from "zod";

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
		user = data.users.find(x => x.token === token);
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

  const { verdict, title, description, language, filename, code } = input.data;

  const hint = "this is the hint: stop using " + language;

  return json({
    success: true,
    hint,
  });
}
