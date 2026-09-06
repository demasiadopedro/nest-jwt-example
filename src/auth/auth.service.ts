import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        
    ) {}
    async signUp(email: string, password: string):Promise<string> {
        
        const existingUser: User | null = await this.userService.buscarUserPorEmail(email);

        if (existingUser) {
            throw new ConflictException('Email ja é esta em uso');
        }

        const salt: string = randomBytes(8).toString('hex');
        const hash: Buffer = await scrypt(password, salt, 32) as Buffer;
        const hashedPassword: string = `${salt}.${hash.toString('hex')}`;

        const newUser: CreateUserDto ={
            email: email,
            password: hashedPassword,
        }

        await this.userService.createUser(newUser);



        return 'Usuario criado com sucesso';
    }

    async signIn(email: string, password: string) {
        const user = await this.userService.buscarUserPorEmail(email);
        if (!user) {
            throw new BadRequestException('Email ou senha incorretos');
        }
        const [salt, storedHash] = user?.password.split('.');

        const hash: Buffer = await scrypt(password, salt, 32) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Email ou senha incorretos');
        }
        console.log('Usuario logado com sucesso');
        const payload = { sub: user.id, email: user.email };
        return {acess_token: this.jwtService.sign(payload)};
    }
}