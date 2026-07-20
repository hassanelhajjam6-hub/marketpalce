import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  business_name!: string;

  @IsEmail()
  email!: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/,
    {
      message:
        'Password must contain uppercase, lowercase, number, special character and be at least 8 characters.',
    },
  )
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}