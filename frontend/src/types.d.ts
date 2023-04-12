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
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}
