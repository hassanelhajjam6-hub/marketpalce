import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginSellerDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}