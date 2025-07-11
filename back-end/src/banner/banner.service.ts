import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>
  ) {}

  async createImagebanner(files: any[], createBannerDto: CreateBannerDto) {
    console.log('Received create banner request', { files, createBannerDto });
    try {
      const imagebanner = await this.bannerRepository.findOne({
        where: {
          nameImage: createBannerDto.nameImage,
        },
      });
      if (!_.isEmpty(imagebanner)) {
        throw new HttpException('Imagebanner name already exists', HttpStatus.CONFLICT);
      }
      const saveImgs = [];
      for (let i = 0; i < files.length; i++) {
        console.log(i);
        const createImg = this.bannerRepository.create({
          nameImage: files[i].filename,
        });
        const saveImg = await this.bannerRepository.save(createImg);
        saveImgs.push(saveImg);
      }
      return saveImgs
    } catch (error) {
      throw error;
    }
  }


  async findAll() {
    try {
      return this.bannerRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const findById = await this.bannerRepository.findOne({
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


  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  async remove(id: number): Promise<void> {
    try {
      const banner = await this.findOne(id);
      console.log(`Removing Banner Image with ID ${id}`);
      banner.deletedAt = new Date();
      await this.bannerRepository.save(banner);
    } catch (error) {
      throw error;
    }
  }
}
