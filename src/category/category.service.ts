import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TransactionType } from 'src/transactiontype/transactiontype.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(TransactionType) // Inyectar el repositorio de TransactionType
    private transactionTypeRepository: Repository<TransactionType>,
  ) {}

  /**
   * Crear una nueva categoría
   * @param category Datos de la categoría
   */
  async createCategory(category: CreateCategoryDto): Promise<Category> {
    // Buscar el tipo de transacción por el id (usando "id" en lugar de "id_transaction_type")
    const typeTransaction = await this.transactionTypeRepository.findOne({
      where: { id: category.id_type_transaction }, // Cambié de "id_transaction_type" a "id"
    });

    if (!typeTransaction) {
      throw new NotFoundException('Tipo de transacción no encontrado');
    }

    // Crear la nueva categoría y asociar el tipo de transacción
    const newCategory = this.categoryRepository.create({
      ...category,
      typeTransaction, // Asocia el tipo de transacción encontrado
    });

    return this.categoryRepository.save(newCategory);
  }

  /**
   * Obtener todas las categorías
   */
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['typeTransaction'], // Incluye la relación con el tipo de transacción
    });
  }

  /**
   * Obtener una categoría por ID
   * @param id Identificador de la categoría
   */
  async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['typeTransaction'], // Incluye la relación con el tipo de transacción
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return category;
  }

  /**
   * Actualizar una categoría por ID
   * @param id Identificador de la categoría
   * @param category Datos actualizados de la categoría
   */
  async updateCategory(id: number, category: CreateCategoryDto): Promise<void> {
    const existingCategory = await this.categoryRepository.findOne({ where: { id } });

    if (!existingCategory) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const typeTransaction = await this.transactionTypeRepository.findOne({
      where: { id: category.id_type_transaction }, // Cambié de "id_transaction_type" a "id"
    });

    if (!typeTransaction) {
      throw new NotFoundException('Tipo de transacción no encontrado');
    }

    await this.categoryRepository.update(id, {
      ...category,
      typeTransaction, // Asocia el tipo de transacción actualizado
    });
  }

  /**
   * Eliminar una categoría por ID
   * @param id Identificador de la categoría
   */
  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.categoryRepository.delete(id);
  }
}
