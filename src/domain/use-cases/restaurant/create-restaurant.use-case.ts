import { RestaurantDTO } from "../../dto/restaurant.dto";
import { RestaurantEnity } from "../../entities/restaurant.entity";
import { RestaurantRepository } from "../../repositories/restaurant.repository";


interface CreateRestaurantInterface{

    execute(restaurantDTO:RestaurantDTO):Promise<RestaurantEnity>
}


export class CreateRestaurant implements CreateRestaurantInterface{

    constructor(
        private readonly restaurantRepository:RestaurantRepository
    ){}


    execute(restaurantDTO: RestaurantDTO): Promise<RestaurantEnity> {

       const newRestaurant = this.restaurantRepository.createRestaurant(restaurantDTO);
       return newRestaurant;
    }


    
}