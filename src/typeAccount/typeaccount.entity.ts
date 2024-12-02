import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
  } from 'typeorm';
  
  @Entity('typeaccount')
  @Unique('TypeAccount_name_type_key', ['name'])
  export class TypeAccount {
    @PrimaryGeneratedColumn({ name: 'id_type_account' })
    id: number;
  
    @Column({ name: 'name_type', type: 'varchar', length: 191 })
    name: string;
  
    @Column({ name: 'description_type', type: 'varchar', length: 191, nullable: true })
    description: string | null;
  }
  