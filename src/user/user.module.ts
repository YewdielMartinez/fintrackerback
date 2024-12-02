import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra la entidad User en el módulo
  controllers: [UserController], // Controlador para manejar rutas relacionadas con usuarios
  providers: [UserService], // Servicio para lógica de negocio
  exports: [TypeOrmModule], // Exportar si otros módulos necesitan este servicio
})
export class UserModule {}
