import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {


    constructor(@InjectRepository(User) private userRepository : Repository<User>){}


    createUser(user:CreateUserDto){
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }
    getUsers(){
        return this.userRepository.find()
    }
    getUser(id_users: number) {
        return this.userRepository.findOne({
            where: {
                id_users: id_users,
            },
        });
    }
    deleteUser(id_users:number){
        return this.userRepository.delete({id_users})
    }
    updateUser(id_users:number,user :UpdateUserDto){
        return this.userRepository.update({id_users},user)
    }
}
