import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { };

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.allUsers();
    };

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.createUser(dto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, dto);
    }
}