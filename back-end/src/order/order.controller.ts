import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get('/count-waiting-order')
  async countWaitingOrder() {
    try {
      const count = await this.orderService.countWaitingOrder();
      return { count };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/count-incourse-order')
  async countIncourseOrder() {
    try {
      const count = await this.orderService.countIncourseOrder();
      return { count };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/count-canceled-order')
  async countCanceledOrder() {
    try {
      const count = await this.orderService.countCanceledOrder();
      return { count };
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('/count-end-order')
  async countEndCourseOrder() {
    try {
      const count = await this.orderService.countEndCourseOrder();
      return { count };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() keyword) {
    return this.orderService.findAll(keyword);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const userId = updateOrderDto.userId;
    const courseId = updateOrderDto.courseId;
    return this.orderService.update(+id, updateOrderDto, userId, courseId);
  }

  @UseGuards(AuthGuard)
  @Patch('update-status/:id')
  async updateStatus(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateStatus(+id, updateOrderDto);
  }

  @UseGuards(AuthGuard)
  @Post('check')
  async checkOrder(@Body('userId') userId: number, @Body('courseId') courseId: number) {
    const exists = await this.orderService.checkOrderExistence(userId, courseId);
    if (exists) {
      throw new HttpException('Course already bought', HttpStatus.CONFLICT);
    }
    return { message: 'Course not bought yet' };
  }

  // New endpoint to manually trigger the updateCourseStatus function
  
}
