import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('productos') // Etiqueta para agrupar las rutas bajo 'productos' en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({
    description: 'Los datos del producto a crear',
    type: CreateProductDto,
    examples: {
      application_json: {
        value: {
          name: 'Pizza Margarita',
          description: 'Pizza con tomate, queso y albahaca.',
          price: 12.99,
          stock: 100,
          category: "Platos Principales", 
          subcategory: "Mediterranea",    
          productDescription: "Muy sabrosa y fresca, hecha con ingredientes de calidad.",
          image: 'https://example.com/images/pizza-margarita.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente.',
    type: [CreateProductDto], // Especifica el tipo de respuesta esperada
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({
    name: 'id',
    description: 'El ID del producto',
    example: '123', // Ejemplo de ID
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado exitosamente.',
    type: CreateProductDto, // Especifica el tipo de la respuesta
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({
    name: 'id',
    description: 'El ID del producto a actualizar',
    example: '123', // Ejemplo de ID
  })
  @ApiBody({
    description: 'Los datos para actualizar el producto',
    type: UpdateProductDto,
    examples: {
      application_json: {
        value: {
          name: 'Pizza Margarita Actualizada',
          description: 'Pizza con tomate, queso, albahaca y aceitunas.',
          price: 13.99,
          stock: 90,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({
    name: 'id',
    description: 'El ID del producto a eliminar',
    example: '123', // Ejemplo de ID
  })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
