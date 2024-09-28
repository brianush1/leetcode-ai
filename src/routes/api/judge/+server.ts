import type { APIErrors } from "$lib/api.js";
import { JudgeVerdict, Language, compile, run } from "$lib/server/judge.js";
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

	const compilation = await compile(language, filename, code);
	console.log(compilation);
	if (compilation !== "error") {
		console.log(await run(compilation, "dhdfdfdfg"));
	}

	return json({
		success: true,
	});
}
