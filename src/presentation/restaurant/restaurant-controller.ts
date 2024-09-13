import { Request,Response } from "express";
import { RestaurantDTO } from "../../domain/dto/restaurant/restaurant.dto";
import { RestaurantRepository } from "../../domain/repositories/restaurant.repository";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { CreateRestaurant } from "../../domain/use-cases/restaurant/create-restaurant.use-case";
import { UpdateRestaurant } from "../../domain/use-cases/restaurant/update-restaurant.use-case";
import { DeleteRestaurant } from "../../domain/use-cases/restaurant/delete-restaurant.use-case";
import { GetRestaurants } from "../../domain/use-cases/restaurant/get-restaurants.use-case";
import { SearchRestaurantById } from "../../domain/use-cases/restaurant/search-restaurant-by-id.use-case";
import { SearchRestaurant } from "../../domain/use-cases/restaurant/search-restaurant.use-case";


export class ResturantController{

    constructor(
        private readonly restaurantRepository:RestaurantRepository
    ){}


    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({result:false,msg:error.message})
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

    editRestaurant=async(req:Request,res:Response)=>{
        
        const {id}=req.params;
        const [error,restaurant]=RestaurantDTO.create(req.body);
        if(error || !restaurant) return res.status(400).json({result:false,msg:error,restaurant});
        new UpdateRestaurant(this.restaurantRepository).execute(id,restaurant)
        .then(restaurant=>res.status(201).json({result:true,msg:"Se ha modificado el restaurante",restaurant}))
        .catch(error=> this.handleError(error,res));
    }

    deleteRestaurant=async(req:Request,res:Response)=>{
        const {id}=req.params;
        new DeleteRestaurant(this.restaurantRepository).execute(id)
        .then(restaurant=>res.status(200).json({result:true,msg:`Se ha eliminado el restaurante: ${restaurant.name}`}))
        .catch(error=> this.handleError(error,res));
    }

    getRestaurants=async(req:Request,res:Response)=>{
        
        
        const {limit=5,offset=0}=req.query;
        new GetRestaurants(this.restaurantRepository).execute(Number(offset),Number(limit))
        .then(restaurants=>res.status(200).json({result:true,msg:'Se han recuperado los restaurantes',restaurants}))
        .catch(error=> this.handleError(error,res));
    }

    getRestaurantById=async(req:Request,res:Response)=>{
        const {id}=req.params;
        new SearchRestaurantById(this.restaurantRepository).execute(id)
        .then(restaurant=>res.status(200).json({result:true,msg:'Restaurante encontrado',restaurant}))
        .catch(error=> this.handleError(error,res));
    }

    searchRestaurant=async(req:Request,res:Response)=>{
        const {name=''} = req.query
        new SearchRestaurant(this.restaurantRepository).execute(String(name))
        .then(restaurants=>res.status(200).json({result:true,msg:'Restaurantes encontrados',restaurants}))
        .catch(error=> this.handleError(error,res));
    }


}