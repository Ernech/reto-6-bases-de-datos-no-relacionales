import { LoginUserDto } from "../dto/auth/auth.dto";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthDatasource{

    
    abstract login(loginUserDto:LoginUserDto):Promise<UserEntity>;
 
    abstract register(registerUserDto:RegisterUserDto):Promise<UserEntity>;


}