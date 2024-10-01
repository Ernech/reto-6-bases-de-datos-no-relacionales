import { ContactModel } from "../../data/models/contacts";
import { RestaurantModel } from "../../data/models/restaurant";
import { ContactDatasource } from "../../domain/datasource/contact.datasource";
import { ContactDTO } from "../../domain/dto/contact/contact.dto";
import { ContactEntity } from "../../domain/entities/contact.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ContactMapper } from "../mappers/contact.mapper";


export class ContactDatasourceImpl implements ContactDatasource{
    
    
    async createContact(contactDTO: ContactDTO): Promise<ContactEntity> {
        try {
            const {restaurant, ...data}=contactDTO;

            const restaurantFound = await RestaurantModel.findOne({_id:restaurant,status:true});
            if(!restaurantFound){
                throw CustomError.notFound(`The restaurant ${contactDTO.restaurant} was not found`);
            }
            const newContact = await ContactModel.create(data);
            await newContact.save()
            const restaurantContacts = [...restaurantFound.Contacts,newContact];
            await RestaurantModel.findByIdAndUpdate({_id:restaurant,Contacts:restaurantContacts});
            return ContactMapper.ContactEntityFromObject(newContact)
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    updateContact(contactDTO: ContactDTO, contactId: string): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    }
    deleteContact(contactId: string): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    }
    getContactsByRestaurant(restaurantId: string): Promise<ContactEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}