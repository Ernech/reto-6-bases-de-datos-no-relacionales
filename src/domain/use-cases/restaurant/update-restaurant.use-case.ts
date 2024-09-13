import { RestaurantDTO } from "../../dto/restaurant/restaurant.dto";
import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";

interface UpdateRestaurantInterface{
    execute(restaurantId: string, restaurantDTO: RestaurantDTO):Promise<RestaurantEnity>;
}

export class UpdateRestaurant implements UpdateRestaurantInterface{
    
    constructor(
        private readonly restaurantRepository:RestaurantRepository
    ){}
   
   
    async execute(restaurantId: string, restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {
        return this.restaurantRepository.editRestaurant(restaurantId,restaurantDTO);
    }
    
}

