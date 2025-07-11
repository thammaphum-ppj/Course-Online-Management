import { IsEmpty, isEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  //edit update too
  @IsNotEmpty()
  @IsString()
  fname?: string;

  @IsNotEmpty()
  @IsString()
  lname?: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  active?: boolean;

  roleId?: number;

  userImage?: string;

  @IsEmpty()
  desc?: string;
}
