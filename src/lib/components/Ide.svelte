<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../../routes/api/judge/+server";

	let code: string = `#include <bits/stdc++.h>
using namespace std;

int main() {
	string s;
	cin >> s;

	cout << "input is: " << s << "\\n";

	return 0;
}`;
	let filename: string = "test.cpp";

	async function onTest() {
		const res: JudgeResponse = await apiCall("judge", {
			language: "c++",
			filename,
			code,
		});
		console.log(res);
	}

</script>

<div class="container1">
    <p>Write Java code here:</p>
    <input type="text" placeholder="Filename" bind:value={filename}><br>
    <textarea bind:value={code}></textarea><br>
    <button on:click={onTest}>Test</button>
</div>

<style>
	textarea {
		width: 800px;
		height: 400px;
	}

    .container1 {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: lightblue;
        background-color: #111827;
        padding: 10px;
        border-radius: 10px;
        border: 2px solid lightblue;
    }
</style>
