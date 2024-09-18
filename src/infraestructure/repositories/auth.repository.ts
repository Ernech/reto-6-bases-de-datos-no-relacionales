import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import { LoginUserDto } from "../../domain/dto/auth/auth.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";



export class AuthRepositoryImpl implements AuthRepository{


    constructor(private readonly authDataSource:AuthDatasource){}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return await this.authDataSource.login(loginUserDto);
    }
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return await this.authDataSource.register(registerUserDto);
    }
    
}