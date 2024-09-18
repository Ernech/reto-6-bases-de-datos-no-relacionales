import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";

interface GetRestaurantsInterface{

    execute(offset:number, limit:number):Promise<RestaurantEnity[]>

}

export class GetRestaurants implements GetRestaurantsInterface{

    constructor(
        private readonly restaurantRepository:RestaurantRepository
    ){}

    async execute(offset: number, limit: number): Promise<RestaurantEnity[]> {
        return await this.restaurantRepository.getRestaurants(offset,limit);
    }

    
}