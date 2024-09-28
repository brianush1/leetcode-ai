<script>
    export let title;
    export let description;
</script>

<div class="container">
<div class="title">{title}</div>
<div>{description}</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 100px;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
        width: max-content;
    }

    .title {
        font-size: x-large;
        font-weight: bold;
    }

</style>