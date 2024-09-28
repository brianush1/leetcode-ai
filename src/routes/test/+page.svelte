<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../api/judge/+server";

	let code: string = `import java.util.*;
public class test {
	public static void main(String[] args) {
		System.out.println("asd");
	}
}
`;
	let filename: string = "test.java";

	async function onTest() {
		const res: JudgeResponse = await apiCall("judge", {
			language: "java",
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
