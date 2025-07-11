import { Order } from 'src/order/entities/order.entity';
import { BaseEntity } from 'src/entity/base.entity';
import { Image } from 'src/image/entities/image.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'course' })
export class Course extends BaseEntity {
  @Column({ name: 'course_name' })
  courseName: string;

  @Column({ name: 'course_image', nullable: true })
  courseImage: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  priority: number;

  @OneToMany(() => Order, (order) => order.course)
  orders: Order[];

  @OneToMany(() => Image, (image) => image.course, { cascade: true })
  images: Image[];

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categorys: Category;

  @ManyToMany(() => User, (user) => user.favoriteCourses)
  favoriteByUsers: User[];
}
