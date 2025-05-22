export default (table, res) => {
	if (!/^[a-zA-Z0-9_]+$/.test(table)) {
		res.status(400).json({ error: 'Invalid table name' });
		return false;
	}
	return true;
};
