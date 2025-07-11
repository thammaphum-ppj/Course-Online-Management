import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleController } from 'src/role/role.controller';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseController } from 'src/course/course.controller';
import { CourseService } from 'src/course/course.service';
import { Category } from 'src/category/entities/category.entity';
import { CategoryController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { Image } from 'src/image/entities/image.entity';
import { ImageController } from 'src/image/image.controller';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Course, Category, Image])],
  controllers: [UserController, RoleController, CourseController, CategoryController, ImageController],
  providers: [UserService, RoleService, CourseService, CategoryService, ImageService],
})
export class UserModule {}
