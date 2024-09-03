import { ReviewEntity } from "../../domain/entities/review.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";


export class ReviewMapper{

    static ReviewEntityFromMapper(object:{[key:string]:any}){

        const {_id,rating, comment, user} = object

        if(!_id) throw CustomError.badRequest('Missing id');
        if(!rating) throw CustomError.badRequest('Missing rating');
        if(!user) throw CustomError.badRequest('Missing User');

        return new ReviewEntity(_id,user.name,rating,comment);

    }
}