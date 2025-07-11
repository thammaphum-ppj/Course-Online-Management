import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryController } from 'src/category/category.controller';
import { Image } from 'src/image/entities/image.entity';
import { ImageController } from 'src/image/image.controller';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category, Image])],
  controllers: [CourseController, CategoryController, ImageController],
  providers: [CourseService, CategoryService, ImageService],
})
export class CourseModule {}
