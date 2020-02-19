import { Model } from 'mongoose';
import { UserSchema, User, UserDto } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async save(userDto: UserDto){
        const user = new this.userModel(userDto);
        const result = await user.save();
        console.log(result);
        return result.id as string;
    }

    async findAll(){
        const users = await this.userModel.find();
        return users;
    }

    async findById(userId: string){
        let user;
        try {
            user = await this.userModel.findById(userId);
        } catch (error) {
            throw new NotFoundException('Could not find user.');
        }

        if (!user) {
            throw new NotFoundException('Could not find user.');
        }
        return user;
    }

    async update(id: string, user: UserDto) {
        await this.findById(id);
        return this.userModel.update(user);
    }

    async delete(id: string){
        this.findById(id);
        try {
            await this.userModel.deleteOne({_id:id});
        } catch (error) {
            throw new NotFoundException('Could not find user.');
        }
    }
}
