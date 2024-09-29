<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../../routes/api/judge/+server";

	let code: string = `#include <bits/stdc++.h>
using namespace std;

int main() {
	string s;
	cin >> s;

	cout << "input is: " << s << "\\n";

	return 0;
}`;
	let filename: string = "test.cpp";

	async function onTest() {
		const res: JudgeResponse = await apiCall("judge", {
			language,
			filename,
			code,
		});
		console.log(res, language);
	}

	let isOpen = false;
	let language = "c++"
</script>

<div class="container1">
	<div class="dropdown">
		<!-- Button that toggles the dropdown content -->
		<button class="dropbtn" on:click={() => isOpen = !isOpen}>
		  {language[0].toUpperCase() + language.slice(1, language.length)}
		</button>
	  
		<!-- Dropdown content, conditionally shown when isOpen is true -->
		<div class="dropdown-content {isOpen ? 'show' : ''}">
			<div class="container2">
				<button class="language-button" on:click={() => {
					language = "c++";
					isOpen = false
				}}>C++</button>
				<button class="language-button" on:click={() => {
					language = "java";
					isOpen = false
				}}>Java</button>
				<button class="language-button" on:click={() => {
					language = "python";
					isOpen = false
				}}>Python</button>
			</div>
		</div>
	</div>
    <p>Write {language[0].toUpperCase() + language.slice(1, language.length)} code here:</p>
    <input type="text" placeholder="Filename" bind:value={filename}><br>
    <textarea bind:value={code}></textarea><br>
    <button on:click={onTest}>Test</button>
</div>

<style>
	textarea {
		width: 800px;
		height: 400px;
	}

    .container1 {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: lightblue;
        background-color: #111827;
        padding: 10px;
        border-radius: 10px;
        border: 2px solid lightblue;
    }

	.container2 {
		display: flex;
		flex-direction: column;
	}

	.language-button {
		all: unset;
		padding: 5px;
		font-weight: bold;
		background-color: lightblue;
		color: black;
		cursor: pointer;
	}

	.language-button:hover {
		background-color: rgb(154, 199, 214);
	}

	.dropdown {
		position: relative;
		display: inline-block;
  	}

  	/* Button styling */
  	.dropbtn {
		background: #800080;
		color: white;
		padding: 5px 20px;
		font-size: 16px;
		border: 2px solid lightblue;
		cursor: pointer;
		border-radius: 10px;
	}

	.dropbtn:hover {
		background-color: #640164;
	}

  	/* Dropdown content (hidden by default) */
  	.dropdown-content {
		display: none;
		margin-top: 5px;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		z-index: 1;
  	}

  	/* Dropdown content visible when isOpen is true */
  	.dropdown-content.show {
    	display: block;
  	}
</style>
