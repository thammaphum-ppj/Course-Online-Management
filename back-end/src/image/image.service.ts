import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import * as _ from 'lodash';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const image = await this.imageRepository.findOne({
        where: {
          name: createImageDto.name,
        },
      });
      if (!_.isEmpty(image)) {
        throw new HttpException('Image name already exists', HttpStatus.CONFLICT);
      }
      const createImage = this.imageRepository.create({
        name: createImageDto.name,
      });
      await this.imageRepository.save(createImage);
      return 'This action adds a new Image';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.imageRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const findById = await this.imageRepository.findOne({
        where: {
          id: id,
        },
      });
      if (_.isEmpty(findById)) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      return findById;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    try {
      const image = await this.imageRepository.findOne({
        where: {
          name: updateImageDto.name,
        },
      });
      if (!_.isEmpty(image) && image.id !== id) {
        throw new HttpException('Image name already exists', HttpStatus.CONFLICT);
      }
      await this.imageRepository.update(id, updateImageDto);
      return 'This Image has been updated';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const findById = await this.imageRepository.findOne({
        where: {
          id: id,
        },
      });
      if (_.isEmpty(findById)) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      const removeImage = await this.findOne(id);
      await this.imageRepository.remove(removeImage);
      return 'This Image has been deleted';
    } catch (error) {
      throw error;
    }
  }
}
