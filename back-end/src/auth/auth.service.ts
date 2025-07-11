import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async signIn(loginInDto: LoginDto) {
    try {
      const userByEmail = await this.userRepository.findOne({
        where: { email: loginInDto.email },
        relations: {
          roles: true,
        },
      });

      if (!userByEmail) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const comparePassword = await bcrypt.compare(loginInDto.password, userByEmail.password);

      if (!comparePassword) {
        throw new HttpException('Password Incorrect', HttpStatus.UNAUTHORIZED);
      }

      if (!userByEmail.active) {
        throw new HttpException('User account is not active', HttpStatus.UNAUTHORIZED);
      }

      const payload = { id: userByEmail.id, email: userByEmail.email };

      const { password, ...response } = userByEmail;
      return {
        user: response,
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
