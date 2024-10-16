import { ContactEntity } from "../../domain/entities/contact.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";


export class ContactMapper{

    static ContactEntityFromObject(object:{[key:string]:any}){
     
        const {_id, name, description} = object;
        if(!_id) throw CustomError.badRequest('Missing id');
        if(!name) throw CustomError.badRequest('Missing name');
        if(!description) throw CustomError.badRequest('Missing description');

        
        return new ContactEntity(_id,name,description);

    }

}