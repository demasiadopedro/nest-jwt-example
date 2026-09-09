import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('feature')
export class FeatureController {

    @Get()
    getFeature(): string {
        return 'Essa rota é pública';
    }


    @UseGuards(JwtAuthGuard)
    @Get('private')
    getPrivateFeature(): string {
        return 'Essa rota é privada';
    }
}
