<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../../routes/api/judge/+server";
	import { onDestroy, onMount } from "svelte";
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import type { Language } from "$lib/server/judge";

	export let problemId: number;

	let language = "c++";

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;

	function setupLanguage(language: Language) {
		if (language === "python") {
			const model = monaco.editor.createModel(
				"# write your solution here\n# be sure to read and write to standard I/O streams",
				"python"
			);
			editor.setModel(model);
		}
		else if (language === "c++") {
			const model = monaco.editor.createModel(
				"#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\t// write your solution here\n\t// be sure to read and write to standard I/O streams\n\t\n}\n",
				"cpp"
			);
			editor.setModel(model);
		}
		else if (language === "java") {
			const model = monaco.editor.createModel(
				"import java.util.*;\nimport java.io.*;\nimport java.math.*\n\npublic class Submission {"
				+ "\n\n\tpublic static void main(String[] args) throws Exception {\n\t\t"
				+ "// write your solution here\n\t\t// be sure to read and write to standard I/O streams\n\t\t\n\t}\n\n}\n",
				"java"
			);
			editor.setModel(model);
		}
	}

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import("./monaco")).default;

		// Your monaco instance is ready, let's display some code!
		editor = monaco.editor.create(editorContainer, {
			automaticLayout: true,
			theme: "vs-dark",
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

	$: if (editor) {
		setupLanguage(language as Language);
	}

	async function onTest() {
		const res: JudgeResponse = await apiCall("judge", {
			problemId,
			language,
			filename: `Submission.${language === "java" ? "java" : language === "python" ? "py" : "cpp"}`,
			code: editor.getValue(),
		});
		console.log(res, language);
	}

	let isOpen = false;
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
	<div class="editor" bind:this={editorContainer}></div>
	<button class="submit-btn" on:click={onTest}>Submit</button>
</div>

<style>
	.editor {
		width: 50vw;
		height: 600px;
	}

	.submit-btn {
		border: none;
		background: linear-gradient(45deg, yellow, orange);
		color: black;
		padding: 8px;
		font-size: 24px;
		font-weight: 700;
		border-radius: 16px;
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
