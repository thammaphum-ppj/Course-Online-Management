import { Course } from 'src/course/entities/course.entity';
import { BaseEntity } from 'src/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.categorys)
  courses: Course[];
}
