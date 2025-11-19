export interface UserRegisterDto {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface VerifyUserDto {
  email: string;
  otp: number;
}