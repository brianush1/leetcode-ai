export type APIErrors = {
	formErrors: string[],
	fieldErrors: { [x: string]: string },
};

export async function apiCall(name: string, body: any): Promise<any> {
	try {
		return await fetch(`/api/${name}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(x => x.json());
	}
	catch (e) {
		console.log(e);
		return {
			formErrors: ["A network error occurred"],
			fieldErrors: {},
		};
	}
}
