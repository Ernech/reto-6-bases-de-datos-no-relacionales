import express from 'express';

interface Options{
    port?:number,

}


export class Server{

    private readonly app = express()
    private readonly port:number;

    constructor(options:Options){
        const{port=3000} = options;
        this.port=port;
    }

    async start(){
         //Middlewares
         this.app.use(express.json());
         this.app.use(express.urlencoded({extended:true}))
         //Middlewares
        
         this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        })

    
    }
}