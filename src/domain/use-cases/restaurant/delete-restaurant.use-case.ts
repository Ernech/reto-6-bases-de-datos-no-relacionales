import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";


interface DeleteRestaurantInterface{
    execute(restaurantId:string):Promise<RestaurantEnity>
}

export class DeleteRestaurant implements DeleteRestaurantInterface{
    
    constructor(
        public readonly restaurantRepository:RestaurantRepository
    ){}
    
    async execute(restaurantId: string): Promise<RestaurantEnity> {
        return await this.restaurantRepository.deleteRestaurant(restaurantId);
    }
    
}