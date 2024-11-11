import { ReviewEntity } from "../../domain/entities/review.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { IsValidMongoId } from "../../presentation/middlewares/mongoId.middleware";
import { UserMapper } from "./user.mapper";


export class ReviewMapper{

    static ReviewEntityFromMapper(object:{[key:string]:any}){

        const {_id,rating, comment, user, restaurant} = object

        if(!_id) throw CustomError.badRequest('Missing id');
        if(!rating) throw CustomError.badRequest('Missing rating');
        if(!user) throw CustomError.badRequest('Missing User');
        const userEntity=UserMapper.userEntityFromObject(user);
        

        return new ReviewEntity(_id,userEntity,rating,comment,restaurant);

    }
}