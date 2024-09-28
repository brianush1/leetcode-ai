<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../api/judge/+server";

	let code: string = `x = input()
print("input:", x)`;
	let filename: string = "test.py";

	async function onTest() {
		const res: JudgeResponse = await apiCall("judge", {
			language: "python",
			filename,
			code,
		});
		console.log(res);
	}

</script>

<p>Write Java code here:</p>
<input type="text" placeholder="Filename" bind:value={filename}><br>
<textarea bind:value={code}></textarea><br>
<button on:click={onTest}>Test</button>

<style>
	textarea {
		width: 800px;
		height: 400px;
	}
</style>
