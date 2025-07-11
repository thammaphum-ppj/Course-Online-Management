import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CourseModule } from './course/course.module';
import { ImageModule } from './image/image.module';
import { QuestionModule } from './question/question.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FOLDERPATH } from './constant/folder-path';
import { InitDateModule } from './init-date/init-date.module';
import { BannerModule } from './banner/banner.module';
import { ScheduleModule } from '@nestjs/schedule';

config();
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', FOLDERPATH.Public), // Specify the root path for static files
      serveRoot: '/public', // Serve static files for '/api' route
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    RoleModule,
    AuthModule,
    CategoryModule,
    OrderModule,
    CourseModule,
    ImageModule,
    QuestionModule,
    InitDateModule,
    BannerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
