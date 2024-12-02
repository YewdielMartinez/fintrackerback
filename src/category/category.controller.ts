import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { Category } from './category.entity';
  
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    /**
     * Obtener todas las categorías
     */
    @Get()
    async getCategories(): Promise<Category[]> {
      return this.categoryService.getCategories();
    }
  
    /**
     * Obtener una categoría por ID
     * @param id Identificador de la categoría
     */
    @Get(':id')
    async getCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
      return this.categoryService.getCategory(id);
    }
  
    /**
     * Crear una nueva categoría
     * @param createCategoryDto Datos de la categoría
     */
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
      return this.categoryService.createCategory(createCategoryDto);
    }
  
    /**
     * Actualizar una categoría por ID
     * @param id Identificador de la categoría
     * @param createCategoryDto Datos actualizados
     */
    @Patch(':id')
    async updateCategory(
      @Param('id', ParseIntPipe) id: number,
      @Body() CreateCategoryDto: CreateCategoryDto,
    ): Promise<void> {
      return this.categoryService.updateCategory(id, CreateCategoryDto);
    }
  
    /**
     * Eliminar una categoría por ID
     * @param id Identificador de la categoría
     */
    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.categoryService.deleteCategory(id);
    }
  }
  