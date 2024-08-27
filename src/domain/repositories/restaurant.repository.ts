import { RestaurantDTO } from "../dto/restaurant.dto";
import { RestaurantEnity } from "../entities/restaurant.entity";


export abstract class RestaurantRepository{


    abstract createRestaurant(restaurantDTO:RestaurantDTO):Promise<RestaurantEnity>;

    abstract editRestaurant(restaurantId:string,restaurantDTO:RestaurantDTO):Promise<RestaurantEnity>;

    abstract deleteRestaurant(restaurantId:string):Promise<RestaurantEnity>;

    abstract searchRestaurantById(restaurantId:string):Promise<RestaurantEnity>;

    abstract getRestaurants(offset:number, limit:number):Promise<RestaurantEnity[]>;

    abstract searchRestaurants(restaurantName:string):Promise<RestaurantEnity[]>;

}