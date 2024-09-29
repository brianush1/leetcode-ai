import { readFileSync, writeFileSync, existsSync } from "fs";

export interface Database {
	users: {
		username: string;
		password: string;
		token: string;
	}[];
}

const defaultData: Database = {
	users: [],
};

export const data: Database = {
	...JSON.parse(JSON.stringify(defaultData)),
	...JSON.parse(existsSync("data.json") ? readFileSync("data.json", "utf-8") : "{}"),
};

export function saveData() {
	writeFileSync("data.json", JSON.stringify(data, undefined, "\t"));
}
