import { Router } from "express";
import { AuthRepositoryImpl } from "../../infraestructure/repositories/auth.repository";
import { AuthController } from "./auth-controller";
import { AuthDatasourceImpl } from "../../infraestructure/datasource/auth.datasource";


export class AuthRoutes{

    static get routes():Router{
        
        

        const router = Router();

        const dasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(dasource)

        const controller = new AuthController(authRepository);

        router.post('/login',controller.logginUser);
        router.post('/register',controller.registerUser);
        
       // router.get('/', AuthMiddleware.validateJwt,controller.getUsers)

        return router;
        
    }


}