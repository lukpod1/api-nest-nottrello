import { UserService } from './user.service';
import { Controller, Post, Body, Res, Get, Param, Patch, Delete, HttpStatus, NotFoundException, Put, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async addUser(@Res() res, @Body() userDto: UserDto) {
        const user = await this.userService.addUser(userDto);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    @Get()
    async getAllUsers(@Res() res) {
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    async getUser(@Res() res, @Param('id') userId) {
        const user = await this.userService.getUser(userId);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Put()
    async updateUser(@Res() res, @Query('userId') userId, @Body() userDto: UserDto) {
        const user = await this.userService.updateUser(userId, userDto);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }

    @Delete()
    async deleteUser(@Res() res, @Query('userId') userId) {
        const user = await this.userService.deleteUser(userId);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }
}
