import { ContactEntity } from "../../entities/contact.entity";
import { ContactRepository } from "../../repositories/contact.repository";

interface DeleteContactInterface{
    execute(contactId:string):Promise<ContactEntity>
}

export class DeleteContact implements DeleteContactInterface{
    
    constructor(private readonly contactRepository:ContactRepository){}
    
    async execute(contactId: string): Promise<ContactEntity> {
        return await this.contactRepository.deleteContact(contactId);
    }
    
}