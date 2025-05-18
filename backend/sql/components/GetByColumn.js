export default (db, table, column, value) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`${column}\` = ? LIMIT 1`;
	return new Promise((resolve, reject) => {
		db.query(sql, [value], (err, results) => {
			if (err) return reject(err);
			resolve(results[0]); // return single user
		});
	});
};
