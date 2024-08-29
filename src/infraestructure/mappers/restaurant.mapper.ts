import { RestaurantEnity } from "../../domain/entities/restaurant.entity"
import { CustomError } from "../../domain/errors/ecustom.errors";


export class RestaurantEntityFromModel{

    static restaurantEntityObject(object:{[key:string]:any}){
        const {_id,name,description,city,address, reviews, contacts} =object
        if(!_id)  throw CustomError.badRequest('Missing id');
        if(!name) CustomError.badRequest('Missing name');
        if(!address) CustomError.badRequest('Missing address');
        return new RestaurantEnity(_id,name,description,city,address, reviews, contacts);
    }

}