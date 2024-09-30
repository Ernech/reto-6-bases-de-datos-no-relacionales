import { ContactDTO } from "../dto/contact/contact.dto";
import { ContactEntity } from "../entities/contact.entity";


export abstract class ContactDatasource{

    abstract createContact(contactDTO:ContactDTO):Promise<ContactEntity>;

    abstract updateContact(contactDTO:ContactDTO,contactId:string):Promise<ContactEntity>;

    abstract deleteContact(contactId:string):Promise<ContactEntity>;

    abstract getContactsByRestaurant(restaurantId:string):Promise<ContactEntity[]>;

}