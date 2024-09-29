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
}

.container2 {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.nav-button {
  all: unset;
  padding: 5px 10px;
  font-weight: bold;
  color: white; /* Text color set to white */
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.7); /* Semi-transparent white border */
  border-radius: 10px; /* Curvy borders */
  background-color: transparent; /* Make the background see-through */
  transition: box-shadow 0.3s ease, background-color 0.3s ease; /* Smooth transition */
}

.nav-button:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* Whitish glow effect */
  background-color: rgba(255, 255, 255, 0.1); /* Slight background color on hover */
}


</style>