import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  status?: string;

  // @IsNotEmpty()
  // @IsString()
  startdate?: Date;

  // @IsNotEmpty()
  // @IsString()
  enddate?: Date;
  
  
  confirmDate?: Date;

  userId?: number;

  courseId?: number;
}
