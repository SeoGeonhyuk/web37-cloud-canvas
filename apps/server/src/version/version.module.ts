import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { VersionRepository } from './version.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [VersionController],
    providers: [VersionService, VersionRepository],
})
export class VersionModule {}
