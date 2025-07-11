import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findAll() {
    try {
      return this.roleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const findById = await this.roleRepository.findOne({
        where: {
          id: id,
        },
      });
      if (_.isEmpty(findById)) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      return findById;
    } catch (error) {
      throw error;
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: { name: createRoleDto.name },
      });
      if (!_.isEmpty(role)) {
        throw new HttpException('Role name already exists', HttpStatus.CONFLICT);
      }
      const createRolename = this.roleRepository.create({
        name: createRoleDto.name,
      });
      await this.roleRepository.save(createRolename);
      return 'This action adds a new Role name';
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRole: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: { name: updateRole.name },
      });
      if (!_.isEmpty(role) && role.id !== id) {
        throw new HttpException('Role name already exists', HttpStatus.CONFLICT);
      }
      await this.roleRepository.update(id, updateRole);
      return 'This Role has been updated';
    } catch (error) {
      throw error;
    }
  }
}
