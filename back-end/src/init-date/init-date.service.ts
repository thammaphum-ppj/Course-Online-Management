import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { off } from 'process';
import { RolesUser, UserInit } from 'src/constant/init-user';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InitDateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {
    this.initUser();
  }

  async initUser() {
    try {
      const roleUser = await this.roleRepository.count();
      if (roleUser == 0) {
        const createRoleAdmin = this.roleRepository.create({
          name: RolesUser.Admin,
        });
        await this.roleRepository.save(createRoleAdmin);
        const createRoleUser = this.roleRepository.create({
          name: RolesUser.User
        })
        await this.roleRepository.save(createRoleUser)
        const createRoleTeacher = this.roleRepository.create({
          name: RolesUser.Teacher
        })
        await this.roleRepository.save(createRoleTeacher)
      }
      const user = await this.userRepository.count()

      if (user == 0) {

        for (const user of UserInit) {
          const findRole = await this.roleRepository.findOne({
            where: {
              name: user.roles
            }
          })
          if (findRole.name == RolesUser.Admin) {
            const hashPass = new User();
            const createUser = this.userRepository.create({
              fname: user.fname,
              lname: user.lname,
              phone: user.phone,
              email: user.email,
              password: await hashPass.hashPassword(user.password, 10),
              roles: findRole,
            });
            await this.userRepository.save(createUser);
          } else {
            const createTeacher = this.userRepository.create({
              fname: user.fname,
              lname: user.lname,
              phone: user.phone,
              email: user.email,
              roles: findRole,
              desc: user.desc,
              userImage: user.userImage
            });
            await this.userRepository.save(createTeacher);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
