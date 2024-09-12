import { RestaurantEnity } from "../../domain/entities/restaurant.entity"
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ReviewMapper } from "./review.mapper";


export class RestaurantEntityFromModel{

    static restaurantEntityObject(object:{[key:string]:any}){
        const {_id,name,description,city,address, averageRating,Reviews, contacts} =object
        if(!_id)  throw CustomError.badRequest('Missing id');
        if(!name) CustomError.badRequest('Missing name');
        if(!address) CustomError.badRequest('Missing address');
        const reviewsEntities=Reviews.map((review:object) =>ReviewMapper.ReviewEntityFromMapper(review));
        return new RestaurantEnity(_id,name,description,city,address, averageRating,reviewsEntities, contacts);
    }

}