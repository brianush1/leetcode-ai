<script lang="ts">
  export let message1: string;
  export let message2: string;

  import { goto, invalidate } from '$app/navigation';
  import { apiCall } from '$lib/api';
  import type { FormResponse } from '$lib/types'; 

  let username = '';
  let password = '';

  async function handleButton1Click() {
    if (message1 === 'Login') {
      // Attempt to log in the user
      const res: FormResponse = await apiCall('login', {
        username: username,
        password: password,
      });

      if (res.success) {
        // Login successful, redirect to home page
        await invalidate("cookies:token");
        goto('/');
      } else {
        // Login failed, show error message
        alert(res.message || 'Invalid username or password.');
      }
    } else {
      // Attempt to sign up the user
      const res: FormResponse = await apiCall('signup', {
        username: username,
        password: password,
      });

      if (res.success) {
        // Sign up successful, redirect to login page
        alert('User registered successfully');
        await invalidate("cookies:token");
        goto('/login');
      } else {
        // Sign up failed, show error message
        alert(res.message || 'Registration failed.');
      }
    }
  }

  function handleButton2Click() {
    if (message2 === 'Sign Up') {
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
      <input type="text" bind:value={username} style="color: #ffffff;" />
      <label>Password</label>
      <input type="password" bind:value={password} style="color: #ffffff;"/>
    </div>
    <div class="card--footer">
      <button
        type="submit"
        class="btn_sign-up"
        on:click={handleButton1Click}
        style="color: #000;"
      >
        {message1}
      </button>
    </div>
    <br />
    <div class="card--footer">
      <button
        type="button"
        class="btn_sign-up"
        on:click={handleButton2Click}
        style="color: #000;"
      >
        {message2}
      </button>
    </div>
  </div>
</div>

<style>
input::placeholder{
  color: #f00;
}

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