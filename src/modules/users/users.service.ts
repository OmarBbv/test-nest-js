import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('SEQUELIZE') private sequelize: Sequelize) { }

    async allUsers(): Promise<User[]> {
        try {
            const users = await this.sequelize.models.User.findAll();
            return users as User[];
        } catch (error) {
            console.error('❌ Kullanıcılar getirilirken hata oluştu:', error);
            throw error;
        }
    };

    async findUserById(id: string): Promise<User> {
        try {
            const user = await this.sequelize.models.User.findByPk(id);
            return user as User;
        } catch (error) {
            console.error('❌ Kullanıcı bulunurken hata oluştu:', error);
            throw error;
        }
    };

    async createUser(userData: CreateUserDto): Promise<User> {
        try {
            const newUser = await this.sequelize.models.User.create(userData as any);
            return newUser as User;
        } catch (error) {
            console.error('❌ Kullanıcı oluşturulurken hata oluştu:', error);
            throw error;
        }
    };

    async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
        try {
            if (!id) throw new Error('ID bulunamadı');

            const user = await this.sequelize.models.User.findByPk(id);

            if (!user) throw new Error('Kullanıcı bulunamadı');

            await user.update(userData as User);

            return user as User;
        } catch (error) {
            console.error('❌ Kullanıcı güncellenirken hata oluştu:', error);
            throw error;
        }
    }
}