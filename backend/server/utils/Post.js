export default (db, table, key, data) => {
	const sql = `INSERT INTO \`${table}\` SET ?`;
	return new Promise((resolve, reject) => {
		db.query(sql, data, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};
