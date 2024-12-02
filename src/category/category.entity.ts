import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category') // Nombre de la tabla
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  id: number;

  @Column({ 
    name: 'name_category', 
    type: 'varchar', 
    length: 191, 
    collation: 'utf8mb4_unicode_ci', 
    nullable: false 
  })
  name: string;

  @Column({ 
    name: 'description_category', 
    type: 'varchar', 
    length: 191, 
    collation: 'utf8mb4_unicode_ci', 
    nullable: true, 
    default: null 
  })
  description: string | null;
}
