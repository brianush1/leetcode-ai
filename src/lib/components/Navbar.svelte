<div class="container1">
    <a class="nav-button" href="/">Back to home screen</a>
    <div class="container2">
        <a class="nav-button" href="/login">Login</a>
        <a class="nav-button" href="/signup">Sign up</a>
        <a class="nav-button" href="/leaderboard">Leaderboard</a>
    </div>
</div>

<style>
    .container1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        left: 0;
        z-index: 10;
        backdrop-filter: blur(20px);
        padding: 15px 15px;
        box-sizing: border-box;
        border-bottom: 2px solid lightblue;
    }

    .container2 {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .nav-button {
		all: unset;
		padding: 5px;
		font-weight: bold;
		background-color: lightblue;
		color: black;
		cursor: pointer;
        border-radius: 10px;
        padding: 5px 10px;
	}

    .nav-button:hover {
		background-color: rgb(154, 199, 214);
	}

</style>