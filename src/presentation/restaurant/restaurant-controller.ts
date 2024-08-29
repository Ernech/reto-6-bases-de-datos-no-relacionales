import { Request,Response } from "express";
import { RestaurantDTO } from "../../domain/dto/restaurant.dto";
import { RestaurantRepository } from "../../domain/repositories/restaurant.repository";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { CreateRestaurant } from "../../domain/use-cases/restaurant/create-restaurant.use-case";


export class ResturantController{

    constructor(
        private readonly restaurantRepository:RestaurantRepository
    ){}


    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error);
        return res.status(500).json({error:'Internal server error'});
    }

    createNewResturant =async(req:Request,res:Response)=>{
       
        const [error,restaurant]=RestaurantDTO.create(req.body);

        if(error || !restaurant) return res.status(400).json({result:false,msg:error,restaurant});

        new CreateRestaurant(this.restaurantRepository).execute(restaurant)
        .then(restaurant=>res.status(201).json({result:true,msg:"Se ha creado el restaurante",restaurant}))
        .catch(error=> this.handleError(error,res));
    }


}