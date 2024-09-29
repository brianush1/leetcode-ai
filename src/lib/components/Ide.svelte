<script lang="ts">
	import { apiCall } from "$lib/api";
	import type { JudgeResponse } from "../../routes/api/judge/+server";
	import { onDestroy, onMount } from "svelte";
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import type { JudgeVerdict, Language } from "$lib/server/judge";
	import { goto } from "$app/navigation";

	export let problemId: number;
	export let regionId: string;
	export let alreadySolved: boolean;
	export let title: string;
	export let description: string;

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

	let isProcessing = false;
	let showVerdict: JudgeVerdict | undefined;

	let hintVerdict: JudgeVerdict = "wrong-answer";
	let hintStatus: "none" | "offer" | "generating" | {
		hint: string;
	} = "none";

	async function onTest() {
		isProcessing = true;

		try {
			const res: JudgeResponse = await apiCall("judge", {
				problemId,
				language,
				filename: `Submission.${language === "java" ? "java" : language === "python" ? "py" : "cpp"}`,
				code: editor.getValue(),
			});

			if ("success" in res && res.success) {
				showVerdict = res.verdict;
				if (res.verdict === "accepted") {
					alreadySolved = true;
				}
				else {
					hintVerdict = res.verdict;
					hintStatus = "offer";
				}
			}
		}
		finally {
			isProcessing = false;
		}
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
	<button class="btn" on:click={onTest} disabled={isProcessing}>{isProcessing ? "Judging..." : "Submit"}</button>
	{#if hintStatus === "offer" || hintStatus === "generating"}
		<div class="ai-hint">
			Would you like an AI-generated hint?
			<div class="button-bar">
				<button disabled={hintStatus === "generating"} class="btn" on:click={async () => {
					hintStatus = "generating";
					const result = await apiCall("get-hint", {
						verdict: hintVerdict,
						title,
						description,
						language,
						filename: `Submission.${language === "java" ? "java" : language === "python" ? "py" : "cpp"}`,
						code: editor.getValue(),
					});
					hintStatus = {
						hint: result.success ? result.hint : "Failed to get hint"
					};
				}}>Yes</button>
				<button disabled={hintStatus === "generating"} class="btn" on:click={() => {
					hintStatus = "none";
				}}>No</button>
			</div>
		</div>
	{:else if hintStatus !== "none"}
		<div class="ai-hint">
			<b>Hint:</b> {hintStatus.hint}
		</div>
	{/if}
</div>

{#if showVerdict}
	<div class="popup">
		<h1>{showVerdict === "accepted" ? "Great job!" : "That's unfortunate"}</h1>
		<h2>
			{
				showVerdict === "accepted" ? "You solved the problem!"
				: showVerdict === "wrong-answer" ? "Your program produced incorrect output"
				: showVerdict === "compile-error" ? "Your program didn't compile"
				: showVerdict === "runtime-error" ? "Your program ran into a runtime error"
				: showVerdict === "time-limit" ? "Your program exceeded the time limit"
				: "???"
			}
		</h2>
		<div class="button-bar">
			<button class="btn" on:click={async () => {
				await goto(`/regions/${regionId}`);
			}}>Back to problemset</button>
			<button class="btn" on:click={() => showVerdict = undefined}>Dismiss popup</button>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		background-color: #111827;
		padding: 20px;
		border-radius: 10px;
		border: 2px solid lightblue;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.popup > * {
		margin: 0;
	}

	.ai-hint {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
		font-size: 24px;
	}

	.button-bar {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.button-bar > .btn {
		font-size: 16px;
		border-radius: 8px;
		background: #eee;
	}

	.editor {
		width: 50vw;
		height: 600px;
	}

	.btn {
		border: none;
		background: linear-gradient(45deg, yellow, orange);
		color: black;
		padding: 8px;
		font-size: 24px;
		font-weight: 700;
		border-radius: 16px;
	}

	.btn:disabled {
		opacity: 0.5;
	}

	.btn:hover:not(:disabled) {
		filter: brightness(120%);
	}

	.btn:active:not(:disabled) {
		filter: brightness(70%);
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
