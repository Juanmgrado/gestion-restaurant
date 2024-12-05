import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedidos.service';
import { ActualizarEstadoPedidoDto, CrearPedidoDto } from 'src/dtos/pedidos.dto';
import { RolesGuard } from 'src/guards/rol.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol } from 'src/entities/user.entity';


@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}
  
  @Post()
   @UseGuards(RolesGuard) 
   @Roles(IRol.mozo) 
  async crear(@Body() crearPedidoDto: CrearPedidoDto) {
    return this.pedidoService.crearPedido(crearPedidoDto);
  }
  

  @Get('estado/:estado')
  obtenerPedidosPorEstado(@Param('estado') estado: 'pendiente' | 'en_proceso' | 'completado') {
    return this.pedidoService.obtenerPedidosPorEstado(estado);
  }

  @Patch(':id/estado')
  cambiarEstadoPedido(
    @Param('id') id: string, 
    @Body() actualizarEstadoPedidoDto: ActualizarEstadoPedidoDto,
  ) {
    return this.pedidoService.cambiarEstadoPedido(id, actualizarEstadoPedidoDto.estado, actualizarEstadoPedidoDto.chefId);
  }
  

  @Post('reiniciar-cocina')
  @UseGuards(RolesGuard)
  @Roles(IRol.chef) 
  reiniciarCocina() {
    return this.pedidoService.reiniciarCocina();
  }
}
