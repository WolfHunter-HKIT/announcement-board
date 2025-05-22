export const selectAll = (db, table, key) => {
	const sql = `SELECT * FROM \`${table}\``;
	return new Promise((resolve, reject) => {
		db.query(sql, (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

export const selectByColumn = (db, table, column, value) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`${column}\` = ? LIMIT 1`;
	return new Promise((resolve, reject) => {
		db.query(sql, [value], (err, results) => {
			if (err) return reject(err);
			resolve(results[0]); // return single user
		});
	});
};

export const selectOne = (db, table, key, id) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`${key}\` = ? LIMIT 1`;
	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, results) => {
			if (err) return reject(err);
			resolve(results[0] || null);
		});
	});
};

export const selectAllByAnnouncementID = (db, table, announcementID) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`announcementID\` = ?`;
	return new Promise((resolve, reject) => {
		db.query(sql, [announcementID], (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

export const selectAllByUserID = (db, table, userID) => {
	const sql = `SELECT * FROM \`${table}\` WHERE \`userID\` = ?`;
	return new Promise((resolve, reject) => {
		db.query(sql, [userID], (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};
