import type { APIErrors } from "$lib/api.js";
import { JudgeVerdict, Language, compile, run } from "$lib/server/judge.js";
import { getProblemList, judgeSubmission } from "$lib/server/problems.js";
import { json } from "@sveltejs/kit";
import z from "zod";

const schema = z.object({
	language: Language,
	filename: z.string(),
	code: z.string(),
});

export type JudgeResponse = {
	success: true;
	verdict: JudgeVerdict;
} | APIErrors;

export async function POST({ request, fetch, cookies }) {
	const input = schema.safeParse(await request.json());
	if (!input.success) {
		return json({
			success: false,
			errors: input.error.flatten(),
		});
	}

	const { code, filename, language } = input.data;

	// console.log();

	const stat = (await getProblemList()).get("Geometry")![0];
	console.log(stat);
	console.log(await judgeSubmission(stat, language, filename, code));

	return json({
		success: true,
	});
}
