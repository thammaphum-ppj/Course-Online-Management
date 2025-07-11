import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FOLDERPATH } from 'src/constant/folder-path';
import { uniqueSuffixString } from 'src/func/unique-string';
import path from 'path';
import { unlink } from 'fs/promises';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
        filename: (req, file, cb) => {
          console.log('file is ', file);
          const uniqueSuffix = uniqueSuffixString();
          const extension = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        },
      }),
    })
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() createBannerDto: CreateBannerDto) {
    // ตรวจสอบประเภทของไฟล์ที่อัปโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const response = {
      successfully: [],
      failed: [],
    };
    console.log(files);

    const successFile = [];
    for (const file of files) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedFileTypes.includes(extension)) {
        const filePath = `${FOLDERPATH.Imgs}/${file.filename}`; //ดูฟังก์ชั่นนี้เพื่อลบไฟล์
        try {
          await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
          console.log(`File ${filePath} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
          throw new Error(`Failed to delete file ${filePath}`);
        }
        // throw new BadRequestException('Invalid file type');
        response.failed.push(file.originalname);
      } else {
        successFile.push(file);
        response.successfully.push(file.originalname);
      }
    }
    console.log('files is ', successFile);

    const banner = await this.bannerService.createImagebanner(successFile, createBannerDto);
    return banner;
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
