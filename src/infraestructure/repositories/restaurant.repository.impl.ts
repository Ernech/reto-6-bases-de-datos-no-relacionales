import { RestaurantDataSource } from "../../domain/datasource/restaurant.datasource";
import { RestaurantDTO } from "../../domain/dto/restaurant.dto";
import { RestaurantEnity } from "../../domain/entities/restaurant.entity";
import { RestaurantRepository } from "../../domain/repositories/restaurant.repository";



export class RestaurantRepositoryImpl implements RestaurantRepository{

    constructor(private readonly restaurantDataSource:RestaurantDataSource){}

    async createRestaurant(restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        return this.restaurantDataSource.createRestaurant(restaurantDTO);
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