import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), TypeOrmModule.forFeature([User])],

  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
