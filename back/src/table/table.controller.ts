import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { Authguard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post('addTable')
    @UseGuards(RolesGuard)
    @Roles(IRol.manager)
    @HttpCode(201)
    async addTable(@Body() newTable: CreateTableDto) {
        return await this.tableService.addTable(newTable);
    }

    @Get('freeTables')
    @UseGuards(Authguard)
    @HttpCode(200)
    async availableTables(@Body() date: Date) {
        return this.tableService.availableTables(date);
    }
}
