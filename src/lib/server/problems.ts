import { compile, run, type JudgeVerdict, type Language } from "./judge";

const BASE_URL = "https://brian.ac/cses-problems";

export interface ProblemStatement {
	id: number;
	name: string;
	numCases: number;
	statementHtml: string;
}

const problemsCache = new Map<number, Promise<ProblemStatement>>();

export async function fetchProblemStatement(id: number): Promise<ProblemStatement> {
	if (!problemsCache.has(id)) {
		problemsCache.set(id, (async () => {
			const metadata = await fetch(`${BASE_URL}/${id}/metadata.json`).then(x => x.json()) as {
				name: string;
				timeLimit: number;
				memoryLimit: number;
				numCases: number;
			};
			const statement = await fetch(`${BASE_URL}/${id}/statement.html`).then(x => x.text());
			return {
				id,
				name: metadata.name,
				numCases: metadata.numCases,
				statementHtml: statement,
			};
		})());
	}
	return await problemsCache.get(id)!;
}

export async function getProblemList(): Promise<Map<string, ProblemStatement[]>> {
	const map = new Map<string, ProblemStatement[]>();

	const handle = async (category: string, ids: number[]) => {
		map.set(category, await Promise.all(ids.map(x => fetchProblemStatement(x))));
	};

	await Promise.all([
		handle("Sorting/Searching", [1621, 1084, 1090, 1091, 1619, 1629, 1640, 1643, 1074, 2183, 2216, 2217, 1141, 1073, 1163, 2162, 2163, 2168, 2169, 1164, 1620, 1630, 1631, 1641, 1642, 1645, 1660, 1661, 1662, 2428, 1085, 1076, 1077, 1632, 1644]),
		handle("DP", [1633, 1634, 1635, 1636, 1637, 1638, 1158, 1746, 2413, 1639, 1744, 1745, 1097, 1093, 1145, 1140, 1653, 2181, 2220]),
		handle("Graph Algorithms", [1192, 1193, 1666, 1667, 1668, 1669, 1194, 1671, 1672, 1673, 1195, 1197, 1196, 1678, 1679, 1680, 1681, 1202, 1750, 1160, 1751, 1675, 1676, 1682, 1683, 1684, 1686, 1691, 1692, 1693, 1690, 1689, 1694, 1695, 1696, 1711]),
		handle("Range Queries", [1646, 1647, 1648, 1649, 1650, 1651, 1652, 1143, 1749, 1144, 2166, 2206, 1190, 1734, 2416, 1739, 1735, 1736, 1737]),
		handle("Trees", [1674, 1130, 1131, 1132, 1133, 1687, 1688, 1135, 1136, 1137, 1138, 2134, 1139, 2079, 2080, 2081]),
		handle("Math", [2164, 1095, 1712, 1713, 1081, 1082, 2182, 2185, 2417, 1079, 1715, 1716, 1717, 2064, 2187, 2209, 2210, 1722, 1096, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1098, 1099, 2207, 2208]),
		handle("Strings", [1731, 1753, 1732, 1733, 1110, 1111, 1112, 2420, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110]),
		handle("Geometry", [2189, 2190, 2191, 2192, 2193, 2194, 2195]),
	]);

	return map;
}

export async function judgeSubmission(problem: ProblemStatement, language: Language, filename: string, code: string): Promise<JudgeVerdict> {
	const compileRes = await compile(language, filename, code);
	if (compileRes === "error") return "compile-error";

	return new Promise(resolve => {
		let done = false;
		let countCorrect = 0;
		for (let i = 0; i < problem.numCases; ++i) {
			(async () => {
				const input = await fetch(`${BASE_URL}/${problem.id}/data/${i}.in`).then(x => x.text());
				if (done) return;
				const output = await fetch(`${BASE_URL}/${problem.id}/data/${i}.out`).then(x => x.text());
				if (done) return;
				const runRes = await run(compileRes, input);
				if (done) return;
				if (runRes.tle) { done = true; resolve("time-limit"); }
				if (runRes.exitCode !== 0) { done = true; resolve("runtime-error"); }
				if (runRes.stdout !== output) { done = true; resolve("wrong-answer"); }
				countCorrect += 1;
				if (countCorrect === problem.numCases) {
					resolve("accepted");
				}
			})();
		}
	});
}