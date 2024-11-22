import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearPedidoDto } from 'src/dtos/pedidos.dto';
import { Pedido } from 'src/entities/pedidos';
import { Repository } from 'typeorm';


@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

 
  async crearPedido(crearPedidoDto: CrearPedidoDto) {
    const pedido = this.pedidoRepository.create(crearPedidoDto);
    return await this.pedidoRepository.save(pedido);
  }
  

 
  async obtenerPedidosPorEstado(estado: 'pendiente' | 'en_proceso' | 'completado', activo = true) {
    return await this.pedidoRepository.find({ where: { estado, activo } });
  }

  async cambiarEstadoPedido(
    id: string, 
    estado: 'pendiente' | 'en_proceso' | 'completado',
    chefId: string, 
  ) {
    const pedido = await this.pedidoRepository.findOne({ where: { id, activo: true } });
    if (!pedido) throw new NotFoundException('Pedido no encontrado o ya completado');
    
    pedido.estado = estado;
    pedido.chef = { id: chefId } as any;
  
    return await this.pedidoRepository.save(pedido);
  }
  


  async reiniciarCocina() {
    await this.pedidoRepository.update({ activo: true }, { activo: false });
    return { mensaje: 'Cocina reiniciada. Todos los pedidos desactivados.' };
  }
}
