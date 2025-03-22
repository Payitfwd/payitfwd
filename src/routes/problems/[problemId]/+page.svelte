<script lang="ts">
	export let data;
	import * as Resizable from '$lib/components/ui/resizable/index';
	import Editor from '$lib/components/ui/editor';
	import ProblemDeets from './components/problem-deets.svelte';
	import TestCases from './components/test-cases.svelte';
	const languages = [
		{
			name: 'Javscript',
			value: 'javascript'
		},
		{
			name: 'C++',
			value: 'cpp'
		}
	];
</script>

<div class="h-full w-full p-4">
	<Resizable.PaneGroup direction="horizontal" class="max-w-full rounded-lg border">
		<Resizable.Pane defaultSize={50}>
			<div class="flex h-[200px] flex-col items-center justify-center p-6">
				<span class="font-semibold">Problem Section</span>
				<ProblemDeets content={data.content} />
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={50}>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={75}>
					<div class="flex h-full items-center justify-center">
						<Editor {languages} />
					</div>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={25}>
					<div class="flex h-full items-center justify-center p-6">
						<TestCases/>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
