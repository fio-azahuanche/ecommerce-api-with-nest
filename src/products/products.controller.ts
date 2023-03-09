import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Product was created', type: Product})
  @ApiResponse({ status: 400, description: 'Bad request'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Products was listed', type: Product})
  @ApiResponse({ status: 400, description: 'Bad request'})
  findAll(@Query() paginationDTO:PaginationDTO) {
    return this.productsService.findAll(paginationDTO);
  }

  @Get(':term')
  @ApiResponse({ status: 201, description: 'Product was listed', type: Product})
  @ApiResponse({ status: 400, description: 'Bad request'})
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'Product was updated', type: Product})
  @ApiResponse({ status: 400, description: 'Bad request'})
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'Product was deleted', type: Product})
  @ApiResponse({ status: 400, description: 'Bad request'})
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove(id);
  }
}
