declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}
declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
}
export { CreateUserDto, UpdateUserDto };
