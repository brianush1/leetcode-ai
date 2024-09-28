<script lang="ts">

	let code: string = "";

	function onTest() {
		console.log(code);
	}

</script>

<p>Write Java code here:</p>
<textarea bind:value={code}></textarea><br>
<button on:click={onTest}>Test</button>

<style>
	textarea {
		width: 800px;
		height: 400px;
	}
</style>
