<script lang="ts">
	import type { Problem } from '~/src/lib/common/types';
	import DataTable from './components/data-table.svelte';
	let { data } = $props();

	let problems: Problem[] = data.problems;
</script>

<DataTable {problems} />
