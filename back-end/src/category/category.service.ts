import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { FindAllCategoryDto } from 'src/user/dto/find-all-dto';

Injectable();
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
      if (existingCategory) {
        throw new HttpException(`Category with name ${createCategoryDto.name} already exists`, HttpStatus.CONFLICT);
      }
      const category = this.categoryRepository.create({
        ...createCategoryDto,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(keyword: FindAllCategoryDto) {
    try {
      console.log('keyword', keyword);

      const findAllCategory = this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.courses', 'courses')
        .leftJoinAndSelect('courses.favoriteByUsers', 'favoriteByUsers');

      if (keyword?.name) {
        findAllCategory.andWhere('category.name like :name', { name: `%${keyword?.name}%` });
      }
      if (keyword?.type) {
        findAllCategory.andWhere('category.type like :type', { type: `%${keyword?.type}%` });
      }
      if (keyword.orderById) {
        findAllCategory.orderBy('category.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`);
      }
      if (keyword?.limit) {
        findAllCategory.take(+keyword?.limit);
      }

      return await findAllCategory.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.courses', 'courses')
        .where('category.id = :id', { id })
        .getOne();

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { name } });
      if (!category) {
        throw new NotFoundException(`Category with name ${name} not found`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(id);
      const existingCategory = await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } });
      if (!_.isEmpty(existingCategory)) {
        throw new HttpException(`Category with name ${updateCategoryDto.name} already exists`, HttpStatus.CONFLICT);
      }
      this.categoryRepository.merge(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const category = await this.findOne(id);
      console.log(`Removing category with ID ${id}`);
      category.deletedAt = new Date();
      await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }
}
