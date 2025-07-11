import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import * as _ from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { StatusOrder } from 'src/enums/status-order';
import { FindAllOrderDto } from 'src/user/dto/find-all-dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          id: createOrderDto.userId,
        },
      });
      if (_.isEmpty(findUser)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const findCourse = await this.courseRepository.findOne({
        where: {
          id: createOrderDto.courseId,
        },
      });
      if (_.isEmpty(findCourse)) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const createOrder = this.orderRepository.create({
        status: StatusOrder.Waiting,
        user: findUser,
        course: findCourse,
        startdate: createOrderDto.startdate,
        enddate: createOrderDto.enddate,
        price: findCourse.price,
      });

      return await this.orderRepository.save(createOrder);
    } catch (error) {
      throw error;
    }
  }

  async findAll(keyword: FindAllOrderDto) {
    try {
      console.log('keyword', keyword);

      const findAllOrders = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.course', 'course')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('course.categorys', 'categorys')
        .leftJoinAndSelect('course.images', 'images');
      findAllOrders.where('1=1');
      if (keyword?.status) {
        findAllOrders.andWhere('order.status like :status', { status: `%${keyword?.status}%` });
      }
      if (keyword?.startdate) {
        findAllOrders.andWhere('order.startdate like :startdate', { startdate: `%${keyword?.startdate}%` });
      }
      if (keyword?.enddate) {
        findAllOrders.andWhere('order.enddate like :enddate', { enddate: `%${keyword?.enddate}%` });
      }
      if (keyword?.courseName) {
        findAllOrders.andWhere('course.courseName like :courseName', { courseName: `%${keyword?.courseName}%` });
      }
      if (keyword.description) {
        findAllOrders.andWhere('course.description like :description', { description: `%${keyword?.description}%` });
      }
      if (keyword.userId) {
        findAllOrders.andWhere('user.id = :userId', { userId: `${keyword?.userId}` });
      }
      if (keyword.orderById) {
        findAllOrders.orderBy('order.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`);
      }
      findAllOrders.orderBy('order.confirmDate', 'DESC');
      findAllOrders.orderBy('order.cancelDate', 'DESC');
      findAllOrders.orderBy('order.finishedDate', 'DESC');
      if (keyword?.limit) {
        findAllOrders.take(+keyword?.limit);
      }

      return await findAllOrders.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.course', 'course')
        .leftJoinAndSelect('course.categorys', 'categorys')
        .leftJoinAndSelect('course.images', 'images')
        .where('order.id = :id', { id })
        .getOne();

      if (_.isEmpty(order)) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number, courseId: number) {
    try {
      const order = await this.findOne(id);
      const findUser = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (_.isEmpty(findUser)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const findCourse = await this.courseRepository.findOne({
        where: {
          id: courseId,
        },
      });
      if (_.isEmpty(findCourse)) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      order.startdate = updateOrderDto.startdate;
      order.enddate = updateOrderDto.enddate;

      const updateOrder = await this.orderRepository.save(order);
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)  // Runs every day at midnight
  async updateCourseStatus() {
    await this.updateStatusForExpiredCourses();
  }

  async updateStatusForExpiredCourses() {
    try {
      const now = new Date();

      const ordersToUpdate = await this.orderRepository.find({
        where: {
          status: StatusOrder.Incourse,
          enddate: LessThanOrEqual(now),
        },
      });

      for (const order of ordersToUpdate) {
        order.status = StatusOrder.Endcourse;
        order.finishedDate = now;
        await this.orderRepository.save(order);
      }
    } catch (error) {
      console.error('Error updating course statuses', error);
    }
  }

  async updateStatus(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(id);
  
      function convertStatusOrder(status: string): StatusOrder {
        const statusMap: { [key: string]: StatusOrder } = {
          Waiting: StatusOrder.Waiting,
          Incourse: StatusOrder.Incourse,
          Endcourse: StatusOrder.Endcourse,
          Canceled: StatusOrder.Canceled,
        };
        if (statusMap.hasOwnProperty(status)) {
          return statusMap[status];
        }
        throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
      }
  
      // Save the current status
      const currentStatus = order.status;
  
      // Convert and update the status
      const newStatus = convertStatusOrder(updateOrderDto.status);
      order.status = newStatus;
  
      // Set the confirmDate if status changes from Waiting to Incourse
      if (currentStatus === StatusOrder.Waiting && newStatus === StatusOrder.Incourse) {
        order.confirmDate = new Date(); // set to the current date
      }
      if (currentStatus === StatusOrder.Waiting && newStatus === StatusOrder.Canceled) {
        order.cancelDate = new Date(); // set to the current date
      }
      if (currentStatus === StatusOrder.Incourse && newStatus === StatusOrder.Endcourse) {
        order.finishedDate = new Date(); // set to the current date
      }

      const updatedOrder = await this.orderRepository.save(order);
      
      // Update the status of all orders whose end date has passed
      await this.updateStatusForExpiredCourses();

      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }
  
  async checkOrderExistence(userId: number, courseId: number): Promise<boolean> {
    try {
      const order = await this.orderRepository.findOne({
        where: {
          user: { id: userId },
          course: { id: courseId },
        },
        relations: ['user', 'course'],
      });

      return !_.isEmpty(order);
    } catch (error) {
      throw error;
    }
  }

  async countWaitingOrder() {
    try {
      const count = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.status = :status', { status: StatusOrder.Waiting })
        .getCount();

      return count;
    } catch (error) {
      throw error;
    }
  }

  async countIncourseOrder() {
    try {
      const count = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.status = :status', { status: StatusOrder.Incourse })
        .getCount();

      return count;
    } catch (error) {
      throw error;
    }
  }

  async countCanceledOrder() {
    try {
      const count = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.status = :status', { status: StatusOrder.Canceled })
        .getCount();

      return count;
    } catch (error) {
      throw error;
    }
  }
  async countEndCourseOrder() {
    try {
      const count = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.status = :status', { status: StatusOrder.Endcourse })
        .getCount();
  
      return count;
    } catch (error) {
      throw error;
    }
  }
  
}
