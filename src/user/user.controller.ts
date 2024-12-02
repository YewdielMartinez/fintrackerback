import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')//El nombre de la 
export class UserController {
    constructor(private UserService: UserService){}
    @Get()
    getUsers(): Promise<User[]>{
        return this.UserService.getUsers();
    }
    @Get(':id_users')
    getUser(@Param('id_users', ParseIntPipe) id_users: number):Promise<User> {
        return this.UserService.getUser(id_users);
    }
    
    @Post()
    createUser(@Body() newUser :CreateUserDto) {
        return this.UserService.createUser(newUser);
    }
    @Delete(':id_users')
    deleteUser(@Param('id_users',ParseIntPipe)id_users:number) {
        return this.UserService.deleteUser(id_users)

    }
    @Patch(':id_users')
    updateUser(@Param('id_users',ParseIntPipe)id_users:number,@Body()
    user:UpdateUserDto){
        return this.UserService.updateUser(id_users,user)
    }
}
