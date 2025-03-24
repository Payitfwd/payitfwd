<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input/index';
	import Badge from '~/src/lib/components/ui/badge/badge.svelte';
	import type { Problem } from '~/src/lib/common/types';

	let search = '';

	export let problems: Problem[] = [];
	export let rowLinkGenerator: (row: Problem) => string | null = () => null;
	export let cellLinkGenerator: (row: Problem, column: string, value: any) => string | null = () =>
		null;
	export let tagLinkGenerator: (tag: string) => string | null = () => null;

	const table = createTable(readable(problems));

	const columns = table.createColumns([
		table.column({ accessor: 'id', header: 'ID' }),
		table.column({ accessor: 'title', header: 'Title' }),
		table.column({ accessor: 'difficulty', header: 'Difficulty' }),
		table.column({ accessor: 'topic', header: 'Topic' }),
		table.column({ accessor: 'tags', header: 'Tags' })
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<section class="mx-auto max-w-6xl">
	<div class="overflow-x-auto rounded-lg border shadow-sm">
		<Table.Root {...$tableAttrs} class="w-full text-sm">
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row class="bg-muted">
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs} class="px-4 py-2 text-left font-semibold text-foreground">
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					{@const rowLink = rowLinkGenerator(row)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} class="hover:bg-accent/20">
							{#each row.cells as cell (cell.id)}
								{@const value = cell.value}
								{@const cellLink = cellLinkGenerator(row, cell.column.id, value)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="px-4 py-2">
										{#if cell.column.id === 'title' && rowLink}
											<a href={rowLink} class="font-medium hover:underline">{value}</a>
										{:else if cell.column.id === 'tags' && Array.isArray(value)}
											<div class="flex flex-wrap gap-1">
												{#each value as tag}
													{@const tagLink = tagLinkGenerator(tag)}
													{#if tagLink}
														<a
															href={tagLink}
															class="rounded bg-secondary px-2 py-1 text-xs hover:bg-secondary/80"
														>
															{tag}
														</a>
													{:else}
														<span class="rounded bg-secondary px-2 py-1 text-xs">{tag}</span>
													{/if}
												{/each}
											</div>
										{:else if cellLink}
											<a href={cellLink} class="hover:underline">{value}</a>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	{#if problems.filter((p) => p.title.toLowerCase().includes(search?.toLowerCase())).length === 0}
		<p class="mt-10 text-center text-muted-foreground">No problems found.</p>
	{/if}
</section>
