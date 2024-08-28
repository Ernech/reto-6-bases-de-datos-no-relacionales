import { RestaurantDataSource } from "../../domain/datasource/restaurant.datasource";
import { RestaurantDTO } from "../../domain/dto/restaurant.dto";
import { RestaurantEnity } from "../../domain/entities/restaurant.entity";


export class RestaurantDataSourceImpl implements RestaurantDataSource{
    createRestaurant(restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        throw new Error("Method not implemented.");
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