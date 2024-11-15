import express, { Router } from 'express';
import swaggerUI  from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
interface Options{
    port?:number,
    routes:Router

}


export class Server{

    private readonly app = express()
    private readonly port:number;
    private readonly routes:Router;

    constructor(options:Options){
        const{port=3000, routes} = options;
        this.port=port;
        this.routes = routes;
    }

    async start(){
         //Middlewares
         this.app.use(express.json());
         this.app.use(express.urlencoded({extended:true}))
         this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
         this.app.use(this.routes);
        
         this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        })

    
    }
}