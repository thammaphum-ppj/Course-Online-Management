import { BaseEntity } from 'src/entity/base.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/order/entities/order.entity';
import { Question } from 'src/question/entities/question.entity';
import { Image } from 'src/image/entities/image.entity';
import { Course } from 'src/course/entities/course.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  linkFacebook: string;

  @Column({ nullable: true })
  linkLine: string;

  @Column({ nullable: true })
  linkEmail: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: Role;

  async hashPassword(password: string, saltOrRounds: number) {
    return await bcrypt.hash(password, saltOrRounds);
  }

  @OneToMany(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  orders: Order[];

  @OneToMany(() => Question, (question) => question.user, { cascade: true })
  questions: Question[];

  @ManyToMany(() => Course, (course) => course.favoriteByUsers)
  @JoinTable({
    name: 'user_favorite_courses',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fav_course_id', referencedColumnName: 'id' },
  })
  favoriteCourses: Course[];

  @Column({ nullable: true })
  desc: string;

  @OneToMany(() => Image, (image) => image.user, { cascade: true })
  images: Image[];

  @Column({ name: 'user_image', nullable: true })
  userImage: string;
}
