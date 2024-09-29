<script lang="ts">
	import "./styles.css";
	import Navbar from "$lib/components/Navbar.svelte";

	export let data: { token: string | undefined }
</script>

<svelte:head>
	<title>Lootcode 10</title>
</svelte:head>

<Navbar token={data.token} />
<slot />
