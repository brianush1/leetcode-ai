<script>
    import Problem from "../../components/problem.svelte";
    import Ide from "../../components/ide.svelte"
    let title = "Problem 1"
    let description = "Dis problem is no easyyyyy"
    let expectedInput = "Some input"
    let expectedOutput = "Yahoo"
</script>

<div class="container1">
    <Problem title={title} description={description} expectedInput={expectedInput} expectedOutput={expectedOutput}/>
    <Ide />
</div>

<style>
    .container1 {
        display: flex;
        flex-direction: row;
        gap: 50px;
        color: lightblue
    }
</style>