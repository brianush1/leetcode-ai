import { REGIONS } from "$lib/regions";
import { getProblemList } from "$lib/server/problems";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const regionId = params.region;
	const map = await getProblemList();

	const regionData = map.get(regionId);
	if (!regionData)
		throw error(404);

	const problems = REGIONS[regionId].problems ?? regionData.map((x, i) => ({
		id: x.id,
		name: x.name,
		x: (i % 5) * 20, y: (i / 5 | 0) * 10,
		outedges: [],
	}));

	return {
		regionData: REGIONS[regionId],
		problems,
	};
}