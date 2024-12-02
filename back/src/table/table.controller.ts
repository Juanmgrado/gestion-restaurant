import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { Authguard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/rol.guard';
import { Table } from 'src/entities/table.entity';

@Controller('table')
export class TableController {
    constructor(
        private readonly tableService: TableService
    ){}

    @Get('tablesSeeder')
    async tableSeeder(){
        return this.tableService.tableSeeder()
    }

    @Post('addTable')
    // @UseGuards(RolesGuard)
    // @Roles(IRol.manager)
    @HttpCode(201)
    async addTable(
        @Body()newTable: CreateTableDto
    ):Promise<{message:string} | null>{
        return await this.tableService.addTable(newTable)
    }

    @Get('freeTables')
    @UseGuards(Authguard)
    @HttpCode(200)
    async availableTables(@Body() date: Date){
        
        return this.tableService.availableTables(date)
    }

    @Get('tables-status')
async getTablesStatus(
    @Body() { day, startTime }: { day: string; startTime: string }
): Promise<{
    free: Table[];
    reserved: Table[];
    occupied: Table[];
}> {
    const parsedDay = new Date(day); 
    const parsedStartTime = new Date(startTime);

    console.log(parsedDay, parsedStartTime); 

    return await this.tableService.tablesStatus(parsedDay, parsedStartTime);
}

}

