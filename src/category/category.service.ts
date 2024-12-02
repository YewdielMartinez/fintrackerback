import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) 
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Crear una nueva categoría
   * @param category Datos de la categoría
   */
  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  /**
   * Obtener todas las categorías
   */
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * Obtener una categoría por ID
   * @param id Identificador de la categoría
   */
  async getCategory(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  /**
   * Actualizar una categoría por ID
   * @param id Identificador de la categoría
   * @param category Datos actualizados de la categoría
   */
  async updateCategory(id: number, category: CreateCategoryDto): Promise<void> {
    await this.categoryRepository.update({ id }, category);
  }

  /**
   * Eliminar una categoría por ID
   * @param id Identificador de la categoría
   */
  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete({ id });
  }
}
