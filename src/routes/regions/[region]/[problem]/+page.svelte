<script lang="ts">
    import Problem from "$lib/components/Problem.svelte";
    import Ide from "$lib/components/Ide.svelte"
	import type { REGIONS } from "$lib/regions";
	import type { ProblemStatement } from "$lib/server/problems";
	import { page } from "$app/stores";
    export let data: {
        regionData: typeof REGIONS[string];
        alreadySolved: boolean;
        problemData: ProblemStatement;
    };
    let title = data.problemData.name;
    let description = data.problemData.statementHtml;
</script>

<div class="container1">
    <Problem title={title} regionId={$page.params.region} description={description} alreadySolved={data.alreadySolved}/>
    <Ide
        title={title}
        description={description}
        problemId={parseInt($page.params.problem)}
        regionId={$page.params.region}
        bind:alreadySolved={data.alreadySolved}
    />
</div>

<style>
    .container1 {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        height: calc(100vh - 16px);
        gap: 8px;
        color: lightblue;
        margin-top: 60px;
        margin-bottom: 100px;
    }
</style>
