<!-- <script lang="ts">
	import EasyMonacoEditor from '@cloudparker/easy-monaco-editor-svelte';
	import { onMount } from 'svelte';

	let editorRef: HTMLDivElement;
	let editor: any;

	let code = `function x() {
      console.log("Hello, world!");
    }`;

	const handleMonaco = (ev: CustomEvent) => {
		let monaco: any = ev.detail;
		if (monaco && editorRef) {
			editor = monaco.editor.create(editorRef, {
				value: code,
				language: 'javascript',
			});
		}
	};

	onMount(() => {
		return () => {
			editor && editor.dispose();
		};
	});
</script>

<h1>Javascript Editor</h1>
<div class="js-editor-container">
	<EasyMonacoEditor on:monaco={handleMonaco}>
		<div bind:this={editorRef} style="min-height:340px;width:100%" />
	</EasyMonacoEditor>
</div>

<style>
	.js-editor-container {
		padding: 16px;
	}
</style> -->