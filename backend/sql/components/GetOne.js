export default (db, table, key, id) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`${key}\` = ? LIMIT 1`;
	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, results) => {
			if (err) return reject(err);
			resolve(results[0] || null);
		});
	});
};
