export default (db, table, key, id) => {
	const sql = `DELETE FROM \`${table}\` WHERE \`${key}\` = ?`;
	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};
