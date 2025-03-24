import db from '~/src/db/index.js';

export const load = async () => {
	console.log(await db.query.problemsTable.findMany());
	return {
		problems: []
	};
};
