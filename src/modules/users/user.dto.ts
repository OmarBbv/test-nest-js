class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
}


export { CreateUserDto, UpdateUserDto };