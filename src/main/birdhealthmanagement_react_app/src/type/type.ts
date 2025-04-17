// Bird 型
export interface Bird {
	id: number;
	userId: number
	name: string;
	age: number;
	gender: string;
	birthday: string;
	bestWeight: number;
	createdAt: string;
	updatedAt: string;
};

export interface UserBirdDto {
	userId: number;
	userName: string;
	userAge: number;
	userEmail: string;
	birds: Bird[];
};

// Birdの送信処理用の型
export type BirdPreview = Pick<Bird, 'id' | 'name' | 'gender' | 'age' | 'birthday' | 'bestWeight'>;

// Userの送信処理用の型
export interface UserFormType {
	name: string;
	age: number;
	email: string;
	password: string;
	confirmationpassword: string;
}

export type MonthlyRecord = {
	id: number;
	birdId: number;
	day: string;
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: string;
	memo: string;
	createdAt: string;
	updatedAt: string;
};

export type CalendarAllEvents = {
	number: number;
	date: string;
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: string;
	memo: string;
};

// カレンダー表示用の型
export type CalendarEvent = {
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: string;
	memo: string;
};

// 健康記録送信用の型
export type HealthRecordSend = {
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: number;
	memo: string;
}
