<script lang="ts">
    export let title: string;
    export let alreadySolved: boolean;
    export let description: string;
</script>

<div class="container1">
    <div class="title">{title}<div class="tag {alreadySolved ? "solved" : ""}">{alreadySolved ? "SOLVED" : "UNSOLVED"}</div></div>
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
        background-color: #111827;
    }

    .container2 {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .title {
        font-size: x-large;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .subheading {
        font-size: large;
        font-weight: bold;
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