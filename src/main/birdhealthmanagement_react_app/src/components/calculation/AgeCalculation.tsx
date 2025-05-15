// 年齢の計算式
export const ageCalcuration = (birthday: string) => {
	const dateTypeBirthday = new Date(birthday);
	const today = new Date();
	const thisYearsBirthday = new Date(today.getFullYear(), dateTypeBirthday.getMonth(), dateTypeBirthday.getDate());
	const incompleteAge = today.getFullYear() - dateTypeBirthday.getFullYear();
	const age = today > thisYearsBirthday ? incompleteAge : incompleteAge - 1;
	return age;
}