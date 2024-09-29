<script lang="ts">
	import BackButton from "./BackButton.svelte";

    export let title: string;
    export let alreadySolved: boolean;
    export let regionId: string;
    export let description: string;
</script>

<div class="container1">
    <div class="title">
        <div class="inner-title">
            <BackButton backUrl="/regions/{regionId}" />
            {title}
        </div>
        <div class="tag {alreadySolved ? "solved" : ""}">{alreadySolved ? "SOLVED" : "UNSOLVED"}</div>
    </div>
    <div>{@html description}</div>
</div>

<style>
    .container1 {
        display: flex;
        flex-direction: column;
        border: 2px solid lightblue;
        border-radius: 10px;
        padding: 10px;
        width: max-content;
        height: max-content;
        background-color: #111827;
    }

    .title {
        font-size: x-large;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .inner-title {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 8px;
    }

    .tag {
        display: block;
        background: #f44;
        color: #000;
        padding: 0 8px;
        border-radius: 8px;
    }

    .solved {
        background: #fe4;
    }

</style>