export const yearMonthCalcuration = (birthday: string) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

	const dateTypeBirthday = new Date(birthday)
	let year = dateTypeBirthday.getFullYear()
	let month = dateTypeBirthday.getMonth()

	const result = [];

	while (year < currentYear || (year === currentYear && month <= currentMonth)) {
		const value = `${year}-${String(month).padStart(2, '0')}`;
		const label = `${year}年${month}月`;
		result.push({ value, label });
		
		month++;
		if (month > 12) {
			month = 1;
			year++;
		}
	}
	
	return result;
}