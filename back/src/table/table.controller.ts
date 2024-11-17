import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from 'src/dtos/addTable.dto';

@Controller('table')
export class TableController {
    constructor(
        private readonly tableService: TableService
    ){}

    @Post('addTable')
    @HttpCode(201)
    async addTable(
        @Body()newTable: CreateTableDto
    ){
        return await this.tableService.addTable(newTable)
    }


}
