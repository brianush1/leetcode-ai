import { REGIONS } from "$lib/regions";
import { data, type Database } from "$lib/server/db.js";
import { getProblemList } from "$lib/server/problems";
import { error } from "@sveltejs/kit";

export async function load({ params, cookies, depends }) {
	return {
		leaderboard: data.users.map((x, i) => ({
			username: x.username,
			numSolved: x.solvedProblems.length,
		})).toSorted((a, b) => b.numSolved - a.numSolved),
	};
}