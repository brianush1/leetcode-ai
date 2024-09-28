<script lang="ts">
    export let title: string;
    export let description: string;
    export let expectedInput: string;
    export let expectedOutput: string;
</script>

<div class="container1">
    <div class="title">{title}</div>
    <div>{description}</div>
    <div class="container2">
        <div class="subheading">Example input</div>
        <div>{expectedInput}</div>
    </div>
    <div class="container2">
        <div class="subheading">Expected output</div>
        <div>{expectedOutput}</div>
    </div>
</div>

<style>
    .container1 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    }

    .subheading {
        font-size: large;
        font-weight: bold;
    }

</style>