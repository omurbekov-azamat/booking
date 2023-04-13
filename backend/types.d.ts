export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
  token: string;
}

export interface IRoomType {
  name: string;
}
