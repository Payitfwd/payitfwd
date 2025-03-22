<script lang="ts">
	export let doc = '';
	export let languages = [],
		language;

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '../button';
	import { basicSetup } from 'codemirror';
	import { EditorView, keymap } from '@codemirror/view';
	import { Compartment } from '@codemirror/state';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onDestroy, onMount } from 'svelte';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { vim } from '@replit/codemirror-vim';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';

	let editor: EditorView,
		vimMode = false;
	const editorTheme = new Compartment();

	const extensions = {
		language: javascript(),
		indentTab: keymap.of([indentWithTab]),
		theme: editorTheme.of(oneDark)
	};
	$: extensionList = [vimMode ? vim() : undefined, ...Object.values(extensions)].filter(
		(ext) => ext
	);

	$: {
		extensionList = [vimMode ? vim() : undefined, ...Object.values(extensions)].filter(
			(ext) => ext
		);
		const compartment = new Compartment();
		const effect = compartment.reconfigure([...extensionList]);

		editor?.dispatch?.({
			effects: [effect]
		});
	}

	onMount(() => {
		editor = new EditorView({
			doc,
			extensions: extensionList,
			parent: document.querySelector('#editor')
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});
	const is_browser = typeof window !== undefined;
</script>

{#if is_browser}
	<div class="flex h-full w-full flex-col">
		<div class="flex justify-between rounded-ss border-b border-solid border-slate-600">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost"
						>{language?.name}
						<ChevronUp />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						{#each languages as _language}
							<DropdownMenu.Item
								on:click={() => {
									language = _language;
								}}>{_language?.name}</DropdownMenu.Item
							>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button
				variant="ghost"
				on:click={() => {
					vimMode = !vimMode;
				}}>vim mode toggle</Button
			>
		</div>
		<div class="codemirror-wrapper overflow-y-auto" id="editor" bind:this={editor} />
	</div>
{:else}
	<div class="scm-waiting">
		<div class="scm-waiting__loading scm-loading">
			<div class="scm-loading__spinner" />
			<p class="scm-loading__text">Loading editor...</p>
		</div>

		<pre class="scm-pre cm-editor">{doc}</pre>
	</div>
{/if}

<style>
	#editor > .cm-editor,
	#editor {
		height: 100% !important;
		width: 100%;
	}
</style>
