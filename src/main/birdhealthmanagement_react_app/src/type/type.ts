export interface Bird {
	id: number;
	userId: number
	name: string;
	gender: string;
	birthday: string;
	bestWeight: number;
	createdAt: string;
	updatedAt: string;
};

export interface UserBirdDto {
	userName: string;
	userEmail: string;
	birds: Bird[];
};

export type BirdFormType = Pick<Bird, 'id' | 'name' | 'gender' | 'birthday' | 'bestWeight'>;

export interface UserFormType {
	name: string;
	email: string;
	password: string;
	confirmationpassword: string;
}

export type UserEditFormType = Pick<UserFormType, 'name' | 'email'>;

export type PasswordEditFormType = Pick<UserFormType, 'password' | 'confirmationpassword'>;

export type MonthlyRecord = {
	id: number;
	birdId: number;
	day: string;
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: number;
	memo: string;
	createdAt: string;
	updatedAt: string;
};

export type CalendarEvent = {
	id?: number;
	weight: number;
	mealAmount: number;
	temperature: number;
	humidity: number;
	memo: string;
};

interface Contact {
	id: number;
	email: string;
	content: string;
	status: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ContactFormType {
	email: string;
	content: string;
}

export interface UserContactDto {
	userId: number;
	userName: string;
	userEmail: string;
	contact: Contact;
};


export interface ContactTableType {
	id: number;
	name: string;
	email: string;
	content: string;
	status: boolean;
	createdAt: string;
}



