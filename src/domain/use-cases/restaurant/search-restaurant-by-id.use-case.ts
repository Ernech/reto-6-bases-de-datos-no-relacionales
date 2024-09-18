import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";


interface SearchRestaurantByIdInterface{
    execute(restaurantId:string):Promise<RestaurantEnity>
}

export class SearchRestaurantById implements SearchRestaurantByIdInterface{

    constructor(
        public readonly restaurantRepository:RestaurantRepository
    ){}

   async execute(restaurantId: string): Promise<RestaurantEnity> {
       return await this.restaurantRepository.searchRestaurantById(restaurantId);
    }
    
}