export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface RegisterUserRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
  token:string;
}
