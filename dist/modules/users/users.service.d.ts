import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserService {
    private sequelize;
    constructor(sequelize: Sequelize);
    allUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: string, userData: UpdateUserDto): Promise<User>;
}
