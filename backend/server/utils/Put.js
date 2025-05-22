export default (db, table, key, id, data) => {
	const sql = `UPDATE \`${table}\` SET ? WHERE \`${key}\` = ?`;
	return new Promise((resolve, reject) => {
		db.query(sql, [data, id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};
