import { Module } from '@nestjs/common';
import { InitDateService } from './init-date.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [InitDateService],
})
export class InitDateModule {}
