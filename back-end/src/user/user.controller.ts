import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllUserDto } from './dto/find-all-dto';
import * as path from 'path';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uniqueSuffixString } from 'src/func/unique-string';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get('/count-user')
  async countUser() {
    try {
      const count = await this.userService.countUser();
      return { count };
    } catch (error) {
      throw error;
    }
  }
  
  @Get('/get-teacher-profile')
  async getTeacherProfile() {
    return this.userService.getTeacherProfile();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto >>>', createUserDto);
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() keyword: FindAllUserDto) {
    return await this.userService.findAll(keyword);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch('/teacher-profile-non-image')
  async updateTeacherProfileNonImage(@Body() updateTeacherDto: UpdateTeacherDto) {
    try {
      const updatedTeacher = await this.userService.updateTeacherProfileNonImage(updateTeacherDto);
      return updatedTeacher;
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(AuthGuard)
  @Patch('/teacher-profile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
      filename: (req, file, cb) => {
        const uniqueSuffix = uniqueSuffixString();

        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() updateTeacherDto: UpdateTeacherDto) {
    // ตรวจสอบประเภทไฟล์ก่อนอัพโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedFileTypes.includes(fileExt)) {
      const filePath = `${FOLDERPATH.Imgs}/${file.filename}`
      try {
        await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
        console.log(`File ${filePath} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
        throw new Error(`Failed to delete file ${filePath}`);
      }
      throw new BadRequestException('Invalid file type');
    }
    // ทำสิ่งที่ต้องการกับไฟล์ที่อัพโหลด
    // เช่น เก็บข้อมูลในฐานข้อมูลหรือประมวลผลไฟล์
    // ส่งคืนข้อมูลหรือตอบกลับตามที่ต้องการ
    console.log('File uploaded successfully', file.filename);

    const teacher = await this.userService.updateTeacherProfile(file, updateTeacherDto);
    return teacher;
  }

  @UseGuards(AuthGuard)
  @Patch('/update-status/:id')
  async updateStatusUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Body('active') active: boolean
  ) {
    return await this.userService.updateStatusUser(id, updateUserDto, active);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const roleId = updateUserDto.roleId;
    return await this.userService.update(+id, updateUserDto, roleId);
  }

  @UseGuards(AuthGuard)
  @Post('/favorite/:userId/courses/:courseId')
  async markCourseAsFavorite(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number
  ) {
    return await this.userService.markCourseAsFavorite(userId, courseId);
  }

  @UseGuards(AuthGuard)
  @Delete('/favorite/:userId/courses/:courseId')
  async unmarkCourseAsFavorite(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number
  ): Promise<void> {
    return this.userService.unmarkCourseAsFavorite(userId, courseId);
  }

  @UseGuards(AuthGuard)
  @Get('/favorite/:userId/courses')
  async getFavoriteCourses(@Param('userId') userId: number) {
    return await this.userService.getFavoriteCourses(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/all/favorite-courses')
  async getAllUsersWithFavoriteCourses() {
    return await this.userService.getAllUsersWithFavoriteCourses();
  }

}
