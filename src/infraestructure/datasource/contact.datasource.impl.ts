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
            return ContactMapper.ContactEntityFromObject(newContact);
            
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async updateContact(contactDTO: ContactDTO, contactId: string): Promise<ContactEntity> {
        try {
            const contact = await ContactModel.findOne({_id:contactId,status:true});
            if(!contact){
                throw CustomError.notFound(`The contact ${contactId} does not exists`);
            }
            const contactEdited = await ContactModel.findByIdAndUpdate(contactId,{...contactDTO},{new:true});
            return ContactMapper.ContactEntityFromObject({...contactEdited});
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async deleteContact(contactId: string): Promise<ContactEntity> {
        try {
            const deletedContact = await ContactModel.findByIdAndUpdate(contactId,{status:false},{new:true});
            if(!deletedContact){
                throw CustomError.notFound(`The contact with the id ${contactId} does not exists`);
                
            }
            return ContactMapper.ContactEntityFromObject(deletedContact);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getContactsByRestaurant(restaurantId: string): Promise<ContactEntity[]> {
        try {
            const restaurant = await RestaurantModel.findOne({_id:restaurantId,status:true});
            if(!restaurant){
                throw CustomError.notFound(`The restaurant with the id: ${restaurantId}`);
            }
            return restaurant.Contacts.map(contact=>ContactMapper.ContactEntityFromObject(contact)); 
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    
}