import { Controller, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PublicStarService } from './public-star.service';

@Controller()
export class PublicStarController {
    constructor(private readonly publicStarService: PublicStarService) {
    }

    @Post()
    createPublicArchitectureStar(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.publicStarService.create({
            architectureId: architectureId
        });
    }

    @Delete()
    remove(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.publicStarService.remove(architectureId);
    }
}

