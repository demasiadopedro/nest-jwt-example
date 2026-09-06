import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@generated/prisma/index.js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  throwNotFound(): never {
    throw new NotFoundException('Usuário não encontrado');
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const emailUsado = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailUsado) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = createUserDto.password;

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  buscarTodosUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async buscarUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) this.throwNotFound();
    return user;
  }

  async buscarUserPorEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.buscarUser(id);

    const data: Prisma.UserUpdateInput = {};
    if (updateUserDto.email) data.email = updateUserDto.email;
    if (updateUserDto.password) {
      data.password = updateUserDto.password;
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    await this.buscarUser(id);

    return this.prisma.user.delete({ where: { id } });
  }
}