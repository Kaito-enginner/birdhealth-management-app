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
export interface UserPreview {
	userName: string;
	userAge: number;
	userEmail: string;
	userPassword: string;
}

export type MonthlyRecord = {
  Id: number;
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