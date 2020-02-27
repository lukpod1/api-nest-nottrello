import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async addUser(userDto: UserDto) {
        const newUser = await this.userModel(userDto);
        return newUser.save();
    }

    async getAllUser() {
        const users = await this.userModel.find();
        return users;
    }

    async getUser(userId) {
        const user = await this.userModel.findById(userId);
        return user;
    }

    async updateUser(userId, userDto: UserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, userDto, { new: true });
        return updatedUser;
    }

    async deleteUser(userId) {
        const deletedUser = await this.userModel.findByIdAndRemove(userId);
        return deletedUser;
    }
}
