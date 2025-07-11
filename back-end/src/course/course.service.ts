import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import * as _ from 'lodash';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises';
import { FindAllCourseDto } from './dto/find-all-course.dto';
import { StatusCourse } from 'src/enums/status-course';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>
  ) {}

  async createNewPriority() {
    // Find maximum priority in database
    const findMaxPriority = await this.courseRepository
      .createQueryBuilder('course')
      .select('MAX(course.priority)', 'maxPriority')
      .getRawOne();

    // create new priority
    let newPriority = 1;
    if (findMaxPriority && findMaxPriority.maxPriority !== null) {
      newPriority = findMaxPriority.maxPriority + 1;
    }

    return newPriority;
  }

  async findAll(keyword: FindAllCourseDto) {
    try {
      const findAllCourse = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.categorys', 'category')
        .leftJoinAndSelect('course.images', 'images')
        .leftJoinAndSelect('course.orders', 'orders')
        .leftJoinAndSelect('course.favoriteByUsers', 'favoriteByUsers');

      if (keyword?.categorys == 'true') {
        findAllCourse.leftJoinAndSelect('course.categorys', 'category');
      }
      if (keyword?.images == 'true') {
        findAllCourse.leftJoinAndSelect('course.images', 'images');
      }
      if (keyword?.orders == 'true') {
        findAllCourse.leftJoinAndSelect('course.orders', 'orders');
      }
      findAllCourse.where('1=1');
      if (keyword?.courseName) {
        findAllCourse.andWhere('course.courseName like :courseName', { courseName: `%${keyword?.courseName}%` });
      }
      if (keyword?.orderById) {
        findAllCourse.orderBy('course.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`);
      }
      if (keyword?.limit) {
        findAllCourse.take(+keyword?.limit);
      }

      return await findAllCourse.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        relations: {
          images: true,
          categorys: true,
          favoriteByUsers: true,
        },
      });
      if (_.isEmpty(course)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      return course;
    } catch (error) {
      throw error;
    }
  }

  async update(files, id: number, updateCourseDto: UpdateCourseDto) {
    try {
    
      const course = await this.courseRepository.findOne({ where: { id } });
      if (_.isEmpty(course)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }

      const exitingCourse = await this.courseRepository.findOne({
        where: { courseName: updateCourseDto.courseName, id: Not(id) },
      });
      if (exitingCourse) {
        throw new HttpException(`course ${updateCourseDto.courseName} already exists`, HttpStatus.CONFLICT);
      }

      const findCategory = await this.categoryRepository.findOne({
        where: { id: updateCourseDto.categoryId },
      });

      if (_.isEmpty(findCategory)) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      // course.courseImage = files.filename;
      if (files && files.length > 0) {
        course.courseImage = files[0].filename;
      }

      course.courseName = updateCourseDto.courseName;
      course.price = updateCourseDto.price;
      course.description = updateCourseDto.description;
      course.status = updateCourseDto.status;
      course.categorys = findCategory;

      const saveImgs = [];

      if (files && files.length >= 1) {
        // console.log('files', files);
          const keepdataimg = await this.imageRepository.manager
        .createQueryBuilder(Image, 'image')
        .where('image.course = :course', { course :id })
        .getMany();
        // console.log("keepdataimg",keepdataimg);

      if (_.isEmpty(keepdataimg)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
        
        for (let i = 0; i < files.length; i++) {
          const createImg = this.imageRepository.create({
            name: files[i].filename,
          });
          // console.log('createImg', createImg);

          const saveImg = await this.imageRepository.save(createImg);
          saveImgs.push(saveImg,...keepdataimg);
        }
      }

      console.log('saveImgs', saveImgs);

      if (saveImgs.length > 0) {
        course.images = saveImgs;
      }

      return await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }

  async updateStatusCourse(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.findOne(id);

      function convertStatusOrder(status: string): StatusCourse {
        const statusMap: { [key: string]: StatusCourse } = {
          New: StatusCourse.New,
          Recommended: StatusCourse.Recommended,
          General: StatusCourse.General,
          Off: StatusCourse.Off,
        };
        if (statusMap.hasOwnProperty(status)) {
          return statusMap[status];
        }
        throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
      }
      course.status = convertStatusOrder(updateCourseDto.status);

      return await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }

  async updatePriority(id: number, newPriority: number) {
    try {
      const courseToUpdate = await this.findOne(id);
      if (!courseToUpdate) {
        throw new NotFoundException(`Course ${id} does not exist`);
      }
      const oldPriority = courseToUpdate.priority;
      const coursesToAdjust = await this.courseRepository.find({
        where: {
          priority: Between(Math.min(oldPriority, newPriority), Math.max(oldPriority, newPriority)),
          id: Not(id), // Exclude the current course from the update
        },
      });
      // เงื่อนไขในการเลื่อนขึ้นเลื่อนลง
      for (const course of coursesToAdjust) {
        if (newPriority > oldPriority) {
          // เลื่อนลง
          if (course.priority === oldPriority) {
            course.priority = newPriority;
          } else if (course.priority > oldPriority && course.priority <= newPriority) {
            course.priority--;
          }
        } else {
          // เลื่อนขึ้น
          if (course.priority === oldPriority) {
            course.priority = newPriority;
          } else if (course.priority >= newPriority && course.priority < oldPriority) {
            course.priority++;
          }
        }
        await this.courseRepository.save(course);
      }
      courseToUpdate.priority = newPriority;
      await this.courseRepository.save(courseToUpdate);

      return courseToUpdate;
    } catch (error) {
      throw error;
    }
  }

  async createCourse(files: any[], createCourseDto: CreateCourseDto) {
    try {
      console.log('createCourseDto', createCourseDto);
      
      const findCourse = await this.courseRepository.findOne({
        where: {
          courseName: createCourseDto.courseName,
        },
      });
      if (!_.isEmpty(findCourse)) {
        throw new HttpException(`course ${createCourseDto.courseName} already exists`, HttpStatus.CONFLICT);
      }

      let findCategory
      if(createCourseDto?.categoryId) {
        findCategory = await this.categoryRepository.findOne({
          where: {
            id: createCourseDto.categoryId,
          },
        });
      }
      
      console.log('findCategory',findCategory, 'id = ',createCourseDto.categoryId);
      

      if (_.isEmpty(findCategory)) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const saveImgs = [];
      for (let i = 0; i < files.length; i++) {
        console.log(i);
        const createImg = this.imageRepository.create({
          name: files[i].filename,
        });
        const saveImg = await this.imageRepository.save(createImg);
        saveImgs.push(saveImg);
      }
      const newPriority = await this.createNewPriority();
      const courseCreate = this.courseRepository.create({
        courseImage: files[0].filename,
        courseName: createCourseDto.courseName,
        description: createCourseDto.description,
        price: createCourseDto.price,
        priority: newPriority,
        images: saveImgs,
        categorys: findCategory,
        status: createCourseDto.status,
      });
      console.log('courseCreate',courseCreate);
      
      return await this.courseRepository.save(courseCreate);
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(filename: string) {
    const filePath = `${FOLDERPATH.Imgs}/${filename}`;
    try {
      await unlink(filePath); // Use 'unlink' to delete the file
      console.log(`File ${filePath} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
    }
  }

  async deleteCourse(id: number) {
    try {
      console.log(id);

      const course = await this.courseRepository.findOne({ where: { id }, relations: ['images'] });
      if (_.isEmpty(course)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      if (!_.isEmpty(course.courseImage)) {
        await this.deleteFile(course.courseImage);
      }
      if (!_.isEmpty(course.images)) {
        for (const image of course.images) {
          await this.deleteFile(image.name);
        }
      }
      course.deletedAt = new Date();
      await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }
}
