import { RestaurantModel } from "../../data/models/restaurant";
import { RestaurantDataSource } from "../../domain/datasource/restaurant.datasource";
import { RestaurantDTO } from "../../domain/dto/restaurant.dto";
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
    editRestaurant(restaurantId: string, restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        throw new Error("Method not implemented.");
    }
    deleteRestaurant(restaurantId: string): Promise<RestaurantEnity> {
        throw new Error("Method not implemented.");
    }
    searchRestaurantById(restaurantId: string): Promise<RestaurantEnity> {
        throw new Error("Method not implemented.");
    }
    getRestaurants(offset: number, limit: number): Promise<RestaurantEnity[]> {
        throw new Error("Method not implemented.");
    }
    searchRestaurants(restaurantName: string): Promise<RestaurantEnity[]> {
        throw new Error("Method not implemented.");
    }

    
}