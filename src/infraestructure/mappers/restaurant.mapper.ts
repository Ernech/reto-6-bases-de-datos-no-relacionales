import { RestaurantEnity } from "../../domain/entities/restaurant.entity"
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ContactMapper } from "./contact.mapper";
import { ReviewMapper } from "./review.mapper";


export class RestaurantEntityFromModel{

    static restaurantEntityObject(object:{[key:string]:any}){
        const {_id,name,description,city,address, averageRating,Reviews, Contacts} =object
        if(!_id)  throw CustomError.badRequest('Missing id');
        if(!name) CustomError.badRequest('Missing name');
        if(!address) CustomError.badRequest('Missing address');
        let reviewsEntities=[];
        if(Reviews && Reviews.length>0){
          
           reviewsEntities =Reviews.map((review:object) =>ReviewMapper.ReviewEntityFromMapper(review));
        }
        let contactsEntities=[];
        if(Contacts && Contacts.length){
            contactsEntities=Contacts.map((contact:object)=>ContactMapper.ContactEntityFromObject(contact));
        }
        return new RestaurantEnity(_id,name,description,city,address, averageRating,reviewsEntities, contactsEntities);
    }

}