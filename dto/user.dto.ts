export interface UserEmailDto {
  email: string;
}

export interface UserRegisterDto extends UserEmailDto {
  first_name: string;
  last_name?: string;
  password: string;
}

export interface VerifyUserDto extends UserEmailDto {
  otp: string;
}

export interface UserLoginDto extends UserEmailDto {
  password: string;
}

export interface ResetPasswordDto extends UserEmailDto {
  otp: string;
  new_password: string;
}
