import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";

export class UserMapper{

    static userEntityFromObject(object:{[key:string]:any}){
        
        const {id, _id, name, email, roles,password} = object;

        if(!_id || !id){
            throw CustomError.badRequest('Missing id');
        }

        if(!name) throw CustomError.badRequest('Missing name');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!password) throw CustomError.badRequest('Missing password');
        if(!roles) throw CustomError.badRequest('Missing password');
        return new UserEntity(
            id || _id, name, email,roles
        );
    }

}