import type { APIErrors } from "$lib/api.js";
import { data, saveData, type Database } from "$lib/server/db.js";
import { JudgeVerdict, Language, compile, run } from "$lib/server/judge.js";
import { getProblemList, judgeSubmission, type ProblemStatement } from "$lib/server/problems.js";
import { json } from "@sveltejs/kit";
import z from "zod";

const schema = z.object({
  problemId: z.number().int(),
  language: Language,
  filename: z.string(),
  code: z.string(),
});

export type JudgeResponse =
  | {
      success: true;
      verdict: JudgeVerdict;
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

  const { problemId, code, filename, language } = input.data;

  const map = await getProblemList();
  const allStatements: ProblemStatement[] = [];
  for (const v of map.values()) allStatements.push(...v);
  const stmt = allStatements.find(x => x.id === problemId);
  if (!stmt) {
    return json({
      success: false,
      errors: {
        formErrors: [],
        fieldErrors: {
          problemId: "That problem ID doesn't exist",
        },
      },
    });
  }

  const verdict = await judgeSubmission(stmt, language, filename, code);

  if (verdict === "accepted") {
    if (!user.solvedProblems.includes(problemId))
      user.solvedProblems = [...user.solvedProblems, problemId];
    saveData();
  }

  return json({
    success: true,
    verdict,
  });
}
