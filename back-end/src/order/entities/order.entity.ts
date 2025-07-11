import { Course } from 'src/course/entities/course.entity';
import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  startdate: Date;

  @Column({ type: 'date', nullable: true })
  enddate: Date;

  @Column({type: 'timestamp', nullable: true})
  confirmDate: Date;
  @Column({type: 'timestamp', nullable: true})
  cancelDate: Date;
  @Column({type: 'date', nullable: true})
  finishedDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;

  @Column({type: 'float'})
  price: number;
}
