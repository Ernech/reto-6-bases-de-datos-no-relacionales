import { RestaurantDataSource } from "../../domain/datasource/restaurant.datasource";
import { RestaurantDTO } from "../../domain/dto/restaurant/restaurant.dto";
import { RestaurantEnity } from "../../domain/entities/restaurant.entity";
import { RestaurantRepository } from "../../domain/repositories/restaurant.repository";



export class RestaurantRepositoryImpl implements RestaurantRepository{

    constructor(private readonly restaurantDataSource:RestaurantDataSource){}

    async createRestaurant(restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        return this.restaurantDataSource.createRestaurant(restaurantDTO);
    }
    async editRestaurant(restaurantId: string, restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        return await this.restaurantDataSource.editRestaurant(restaurantId,restaurantDTO);
    }
    async deleteRestaurant(restaurantId: string): Promise<RestaurantEnity> {
        return await this.restaurantDataSource.deleteRestaurant(restaurantId);
    }
    async searchRestaurantById(restaurantId: string): Promise<RestaurantEnity> {
        return await this.restaurantDataSource.searchRestaurantById(restaurantId);
    }
    async getRestaurants(offset: number, limit: number): Promise<RestaurantEnity[]> {
        return await this.restaurantDataSource.getRestaurants(offset,limit);
    }
    async searchRestaurants(restaurantName: string): Promise<RestaurantEnity[]> {
        return await this.restaurantDataSource.searchRestaurants(restaurantName);
    }
    
}