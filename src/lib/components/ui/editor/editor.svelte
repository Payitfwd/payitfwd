<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { Button } from '../button';
	type Language = {
		name: string;
		value: string;
	};
	export let languages: Language[] = [];
	let divEl: HTMLDivElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	let initVimMode;
	const width = 300;
	let language = languages[0];

	onMount(async () => {
		// @ts-expect-error
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		initVimMode = (await import('monaco-vim')).initVimMode;
		editor = Monaco.editor.create(divEl, {
			value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
			language,
			theme: 'vs-dark',

			automaticLayout: true
		});

		return () => {
			editor.dispose();
		};
	});
	let vimMode = false;
	let languageDropdownOpen = false;
	let vimInstance;
</script>

<div class="relative h-full w-full">
	<div class="flex justify-between rounded-ss border-b border-solid border-slate-600">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					on:click={() => {
						languageDropdownOpen = !languageDropdownOpen;
					}}
					>{language.name}
					<div class:rotate-180={languageDropdownOpen}>
						<ChevronUp />
					</div>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					{#each languages as _language}
						<DropdownMenu.Item
							on:click={() => {
								language = _language;
							}}>{_language.name}</DropdownMenu.Item
						>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<Button
			variant="ghost"
			on:click={() => {
				vimMode = !vimMode;
				if (vimMode) {
					vimInstance = initVimMode(editor, document.getElementById('status-bar'));
					editor.focus();
				} else {
					if (vimInstance?.dispose) vimInstance.dispose();
				}
			}}>{vimMode ? 'Blazing Fast' : 'Go Vim'}</Button
		>
	</div>
	<div bind:this={divEl} class="h-full w-full" />
	<div id="status-bar" class="absolute bottom-0 z-50 w-full bg-slate-600" />
</div>
