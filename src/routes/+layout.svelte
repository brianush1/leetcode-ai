<script lang="ts">
	import "./styles.css";
	import Navbar from "$lib/components/Navbar.svelte";

	export let data: { username: string | undefined, token: string | undefined }
</script>

<svelte:head>
	<title>Lootcode 10</title>
</svelte:head>

<Navbar username={data.username} token={data.token} />
<slot />
