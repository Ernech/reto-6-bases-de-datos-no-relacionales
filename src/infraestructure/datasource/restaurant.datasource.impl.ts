import { RestaurantModel } from "../../data/models/restaurant";
import { RestaurantDataSource } from "../../domain/datasource/restaurant.datasource";
import { RestaurantDTO } from "../../domain/dto/restaurant/restaurant.dto";
import { RestaurantEnity } from "../../domain/entities/restaurant.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { RestaurantEntityFromModel } from "../mappers/restaurant.mapper";


export class RestaurantDataSourceImpl implements RestaurantDataSource{
   async createRestaurant(restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
       try {

            const newRestaurant = await RestaurantModel.create(restaurantDTO);

            newRestaurant.save();

            return RestaurantEntityFromModel.restaurantEntityObject(newRestaurant);


       } catch (error) {
        if(error instanceof CustomError){
            throw error;
        }
        throw CustomError.internalServer();
       }
    }
    async editRestaurant(restaurantId: string, restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
       try {
        const restaurantEdited = await RestaurantModel.findByIdAndUpdate(restaurantId,{...restaurantDTO},{new:true});
       
        if(!restaurantEdited){
            throw CustomError.notFound(`The restaurant with the id '${restaurantId}' does not exists`)
        }
        return RestaurantEntityFromModel.restaurantEntityObject(restaurantEdited);
        
       } catch (error) {
        if(error instanceof CustomError){
            throw error;
        }
        throw CustomError.internalServer();
       }
    }
    async deleteRestaurant(restaurantId: string): Promise<RestaurantEnity> {
     try {
        const restaurantDeleted = await RestaurantModel.findByIdAndUpdate(restaurantId,{status:false},{new:true});
        if(!restaurantDeleted){
          throw CustomError.notFound(`The restaurant with the id '${restaurantId}' does not exists`)
      }
      return RestaurantEntityFromModel.restaurantEntityObject(restaurantDeleted);
     } catch (error) {
        if(error instanceof CustomError){
            throw error;
        }
        throw CustomError.internalServer();
     }
    }

    async searchRestaurantById(restaurantId: string): Promise<RestaurantEnity> {

       try {
        const restaurant = RestaurantModel.findOne({_id:restaurantId,status:true});
        if(!restaurant){
            throw CustomError.notFound(`The restaurant with the id '${restaurantId}' does not exists`)
        }
        return RestaurantEntityFromModel.restaurantEntityObject(restaurant);
       } catch (error) {
        if(error instanceof CustomError){
            throw error;
        }
        throw CustomError.internalServer();
       }
    
    }
    async getRestaurants(offset: number, limit: number): Promise<RestaurantEnity[]> {
        try {
            const restaurants = await RestaurantModel.find({status:true}).skip(offset).limit(limit);
            return restaurants.map(restaurant=>RestaurantEntityFromModel.restaurantEntityObject(restaurant));
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async searchRestaurants(restaurantName: string): Promise<RestaurantEnity[]> {
       try {
        const  restaurants = await RestaurantModel.find({name:restaurantName}).populate('Review');
        return restaurants.map(restaurant=>RestaurantEntityFromModel.restaurantEntityObject(restaurant));
       } catch (error) {
        if(error instanceof CustomError){
            throw error;
        }
        throw CustomError.internalServer();
       }
    }

    
}