import { Controller, Get, Query } from '@nestjs/common';
import { MyService } from './my.service';
import { QueryParamsDto } from 'src/types/query-params.dto';

@Controller('my')
export class MyController {
    constructor(private readonly service: MyService) {}

    @Get('private-architectures')
    getMyPrivateArchitectures(@Query() queryParams: QueryParamsDto) {
        return this.service.findMyPrivateArchitectures(queryParams);
    }

    @Get('public-architectures')
    getMyPublicArchitectures(@Query() queryParams: QueryParamsDto) {
        return this.service.findMyPublicArchitectures(queryParams);
    }

    @Get('public-architectures/stars')
    getMyStars(@Query() queryParams: QueryParamsDto) {
        return this.service.findMyStars(queryParams);
    }
}
