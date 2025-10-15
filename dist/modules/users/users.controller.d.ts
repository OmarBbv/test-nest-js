import { UserService } from './users.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(dto: CreateUserDto): Promise<User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<User>;
}
