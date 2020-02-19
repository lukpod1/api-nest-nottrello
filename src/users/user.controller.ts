import { UserDto, User } from './user.model';
import { UserService } from './user.service';
import { Controller, Post, Body, Res, Get, Param, Patch, Delete } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Post()
    addUser(@Body() userDto: UserDto) {
        const generatedId = this.usersService.save(userDto);
        return { id: generatedId };
    }

    @Get()
    async getAllUsers(){
        const users = await this.usersService.findAll();
        return users;
    }

    @Get(':id')
    getUser(@Param('id') userId: string){
        return this.usersService.findById(userId);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() user: User){
        await this.usersService.update(id, user);
        return user;
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.usersService.delete(id);
        return null;
    }
}
