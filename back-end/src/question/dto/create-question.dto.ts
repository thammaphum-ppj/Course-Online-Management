import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  message?: string;
  @IsNotEmpty()
  @IsNumber()
  userId?: number;

  status?: boolean;
}

export class CreateQuestionNonLoginDto{
  
  @IsString()
  message?: string;

  @IsNotEmpty()
  @IsString()
  email?: string;

  status?: boolean;
}
