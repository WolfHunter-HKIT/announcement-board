export default (db, table, key) => {
	const sql = `SELECT * FROM \`${table}\``;
	return new Promise((resolve, reject) => {
		db.query(sql, (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};
