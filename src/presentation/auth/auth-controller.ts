import { Request,Response } from "express";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { ResgisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dto/auth/auth.dto";
import { LoginUser } from "../../domain/use-cases/auth/login.use-case";
import { UserModel } from "../../data/models/user";
import { AuthRepository } from "../../domain/repositories/auth.repository";


export class AuthController{



        constructor(
            private readonly authRepository:AuthRepository
        ){}
    
        private handleError = (error:unknown, res:Response)=>{
       
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({error:error.message});
            }
            console.log(error);
            return res.status(500).json({error:'Internal server error'});
        }
    
        registerUser = async(req:Request, res:Response)=>{
    
            const [error,registerUserDto] = RegisterUserDto.create(req.body);
    
            if(error || !registerUserDto) return res.status(400).json({error})
            
    
            new ResgisterUser(this.authRepository)
            .execute(registerUserDto)
            .then(data=>res.json(data)).catch(error=>this.handleError(error,res))
    
        }
    
        logginUser = async(req:Request, res:Response)=>{
    
            const [error,loginUserDto] = LoginUserDto.create(req.body);
    
            if(error || !loginUserDto) return res.status(400).json({error});
    
            new LoginUser(this.authRepository)
            .execute(loginUserDto)
            .then(data=>res.json(data)).catch(error=>this.handleError(error,res));
    
        }
    
        getUsers = async(req:Request, res:Response)=>{
    
            UserModel.find().then(users=>res.json({payload:req.body.user}))
            .catch(()=>res.status(500).json({error:'Internal server error'}))
    
        }
}

        

    