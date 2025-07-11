import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UserController } from 'src/user/user.controller';
import { CourseController } from 'src/course/course.controller';
import { UserService } from 'src/user/user.service';
import { CourseService } from 'src/course/course.service';
import { Role } from 'src/role/entities/role.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { ImageController } from 'src/image/image.controller';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Course, Role, Category, Image])],
  controllers: [OrderController, UserController, CourseController, CategoryController, ImageController],
  providers: [OrderService, UserService, CourseService, CategoryService, ImageService],
})
export class OrderModule {}
