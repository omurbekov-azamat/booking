export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
