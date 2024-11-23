import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';



export class CrearPedidoDto {
  @IsString()
  productoId: string;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsString()
  @IsOptional()
  notasAdicionales?: string;

  @IsString()
  mozoId: string;
}


export class ActualizarEstadoPedidoDto {
  @IsEnum(['pendiente', 'en_proceso', 'completado'])
  estado: 'pendiente' | 'en_proceso' | 'completado';

  @IsString()
  chefId: string
}
