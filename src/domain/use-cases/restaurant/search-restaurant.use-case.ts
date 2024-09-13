import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";


interface SearchRestaurantInterface{

    execute(restaurantName:string):Promise<RestaurantEnity[]>;
}


export class SearchRestaurant implements SearchRestaurantInterface{

    constructor(
        public readonly restaurantRepository:RestaurantRepository
    ){}

    async execute(restaurantName: string): Promise<RestaurantEnity[]> {
       return await this.restaurantRepository.searchRestaurants(restaurantName);
    }
    
}