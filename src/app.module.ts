import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), AuthModule, UserModule, PrismaModule, FeatureModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
