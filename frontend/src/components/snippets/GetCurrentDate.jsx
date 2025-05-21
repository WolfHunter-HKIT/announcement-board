const GetCurrentDate = () => {
	const currentDate = new Date();

	// Get the day, month, and year
	const day = String(currentDate.getDate()).padStart(2, '0'); // Adds leading zero if day < 10
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
	const year = currentDate.getFullYear();

	// Return the formatted date as DD/MM/YYYY
	return `${day}/${month}/${year}`;
};

export default GetCurrentDate;
