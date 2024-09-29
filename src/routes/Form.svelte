<script lang="ts">
  export let message1: string;
  export let message2: string;

  import { data } from "../lib/server/db";
  import { goto } from '$app/navigation';
  import { apiCall } from "$lib/api";

  // Bind these variables to your input fields
  let username = '';
  let password = '';

  function handleButton1Click() {
    if (message1 === "Login") {
      // Check if user exists
    } else {
      // Add new user
      alert('User registered successfully');
    }
  }

  function handleButton2Click() {
    if (message2 === "Sign Up") {
      goto('/signup');
    } else {
      goto('/login');
    }
  }
</script>

<div class="container">
  <div class="card">
    <div class="card--header"></div>
    <div class="card--body">
      <label>Username</label>
      <!-- Bind the input value to the username variable -->
      <input type="text" bind:value={username} />
      <label>Password</label>
      <!-- Bind the input value to the password variable -->
      <input type="password" bind:value={password} />
    </div>
    <div class="card--footer">
      <button
        type="submit"
        class="btn_sign-up"
        on:click={handleButton1Click}
      >
        {message1}
      </button>
    </div>
    <br />
    <div class="card--footer">
      <button
        type="submit"
        class="btn_sign-up"
        on:click={handleButton2Click}
      >
        {message2}
      </button>
    </div>
  </div>
</div>

<style>
.card {
  width: 100%;
  max-width: 400px;
  height: auto;
  color: rgb(255, 255, 255);
  box-sizing: content-box;
  margin: 0 auto 0 auto;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1rem 1.5rem 2rem 1.5rem;
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  box-shadow: inset 0 -1em 1em rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1), 0.3em 0.2em 3em rgba(0, 0, 0, 0.2);
}

.card--header {
  padding-bottom: 1rem;
}

.card--body {
  width: 100%;
  padding-bottom: 1rem;
}
label {
  display: block;
  font-family: sans-serif;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}
input {
  box-sizing: border-box;
  display: block;
  margin-bottom: 1.25rem;
  color: #4a4a4a;
  font-size: 1rem;
  width: 100%;
  height: 44px;
  padding-left: 0.8rem;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 4px;
  transition: background-color 0.3s;
}
input:hover,
input:focus {
  background-color: rgba(255, 255, 255, 0.5);
}

.card--footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_sign-up {
  font-size: 1.25rem;
  padding: 1rem 2rem;
  /*   width: 100%; */
  background-color: rgba(255, 255, 255, 0.8);
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.btn_sign-up:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 1);
  color: rgb(255, 255, 255);
}

</style>