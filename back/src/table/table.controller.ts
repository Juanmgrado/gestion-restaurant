import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { Authguard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/rol.guard';
import { Table } from 'src/entities/table.entity';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post('addTable')
    // @UseGuards(RolesGuard)
    // @Roles(IRol.manager)
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

    @Post('tables-status')
    async getTablesStatus(
    @Body() { day, startTime }: { day: string; startTime: string }
    ): Promise<{
    free: Table[];
    reserved: Table[];
    occupied: Table[];
    }> {

    if(!day)throw new BadRequestException('Debe insertar una fecha válida')
    if(!startTime)throw new BadRequestException('Debe insertar una hora válida')

    return await this.tableService.tablesStatus(day, startTime);
}

