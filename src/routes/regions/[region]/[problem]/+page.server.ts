import { REGIONS } from "$lib/regions";
import { data, type Database } from "$lib/server/db.js";
import { getProblemList } from "$lib/server/problems";
import { error } from "@sveltejs/kit";
import katex from "katex";

export async function load({ params, cookies, depends }) {
	const regionId = params.region;
	const problemId = params.problem;
	const map = await getProblemList();

	const token = cookies.get("token");
	depends("cookies:token");
	let user: Database["users"][number] | undefined;
	if (token) {
		user = data.users.find(x => x.token === token);
	}

	const regionData = map.get(regionId);
	if (!regionData)
		throw error(404);

	const problemData = regionData.find(x => String(x.id) === problemId);
	if (!problemData)
		throw error(404);

	return {
		regionData: REGIONS[regionId],
		alreadySolved: user?.solvedProblems.includes(Number(problemId)),
		problemData: {
			...problemData,
			statementHtml: problemData.statementHtml.replace(/<span class="math inline">(.*?)<\/span>/g, (_, val) => {
				return katex.renderToString(val);
			}),
		},
	};
}