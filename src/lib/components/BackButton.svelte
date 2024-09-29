<script lang="ts">

	import { goto } from "$app/navigation";

	export let backUrl: string;

</script>

<button class="back-btn" on:click={async () => {
	await goto(backUrl);
}}>🠜</button>

<style>

	button {
		width: 32px;
		height: 32px;
		line-height: 24px;
		font-size: 24px;
		color: #fff;
		background: #000;
		border: none;
		border-radius: 50%;
	}

</style>
