<script>
    import Form from "../Form.svelte";
    import "@fontsource/advent-pro";
</script>

<div class="header push">Lootcode 10</div>
<div class="header">Login</div>

<div>
    <Form message1="Login" message2="Sign Up"></Form>
</div>

<style>
    .header {
        text-align: center;
        color: white;
        font-size: 48px;
        margin-bottom: 48px;
        font-family: 'Advent Pro', sans-serif;
    }

    .push {
        margin-top: 100px;
    }

</style>