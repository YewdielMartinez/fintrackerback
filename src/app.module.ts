import { TransactionModule } from './transaction/transaction.module';
import { TransactionController } from './transaction/transaction.controller';
import { TransactiontypeModule } from './transactiontype/transactiontype.module';
import { TransactiontypeController } from './transactiontype/transactiontype.controller';
import { ServiceService } from './saving/service.service';
import { SavingModule } from './saving/saving.module';
import { SavingController } from './saving/saving.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { AlerttypeModule } from './alerttype/alerttype.module';
import { AlerttypeController } from './alerttype/alerttype.controller';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
import { AlertController } from './alert/alert.controller';
import { TypeAccountModule } from './typeAccount/typeaccount.module';
import { TypeAccountController } from './typeAccount/typeaccount.controller';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AccountService } from './account/account.service';
import { UserService } from './user/user.service';
import { TypeaccountService } from './typeAccount/typeaccount.service';

@Module({
  imports: [
    TransactionModule,
    TransactiontypeModule,
    SavingModule,
    CategoryModule,
    AlerttypeModule,
    AlertModule,
    TypeAccountModule,
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fintracker',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Incluye la entidad User
      synchronize: true, // Sincroniza las entidades con la base de datos (usar con precaución en producción)
    }),
    UserModule, // Importa el módulo User
  ],
  controllers: [
    TransactionController,
    TransactiontypeController,
    SavingController,
    CategoryController,
    AlerttypeController,
    AlertController,
    TypeAccountController,
    AccountController,
    AppController,
  ],
  providers: [ServiceService, CategoryService, AlertService, AppService, AccountService,UserService,TypeaccountService],
})
export class AppModule {}
