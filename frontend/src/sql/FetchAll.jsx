import axios from 'axios';
import { database } from '../main';

const FetchAll = async (table) => {
	try {
		const res = await axios.get(`${database}${table}`);
		if (res.data !== undefined) {
			console.log(res.data);
			return res.data;
		} else {
			console.warn('No data received.');
			return null;
		}
	} catch (err) {
		console.error('Error fetching data:', err);
		return null;
	}
};

export default FetchAll;
