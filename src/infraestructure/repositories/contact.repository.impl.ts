import { ContactDatasource } from "../../domain/datasource/contact.datasource";
import { ContactDTO } from "../../domain/dto/contact/contact.dto";
import { ContactEntity } from "../../domain/entities/contact.entity";
import { ContactRepository } from "../../domain/repositories/contact.repository";


export class ContactRepositoryImpl implements ContactRepository{

    constructor(private readonly contactDatasource:ContactDatasource){}

    async createContact(contactDTO: ContactDTO): Promise<ContactEntity> {
        return await this.contactDatasource.createContact(contactDTO);
    }
    async updateContact(contactDTO: ContactDTO, contactId: string): Promise<ContactEntity> {
        return await this.contactDatasource.updateContact(contactDTO,contactId);
    }
    
    async deleteContact(contactId: string): Promise<ContactEntity> {
        return await this.contactDatasource.deleteContact(contactId);
    }
    async getContactsByRestaurant(restaurantId: string): Promise<ContactEntity[]> {
        return await this.contactDatasource.getContactsByRestaurant(restaurantId);
    }

    
}