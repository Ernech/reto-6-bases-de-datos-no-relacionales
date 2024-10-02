import { ContactDTO } from "../../dto/contact/contact.dto";
import { ContactEntity } from "../../entities/contact.entity";
import { ContactRepository } from "../../repositories/contact.repository";


interface EditContactInterface{

    execute(contactDTO:ContactDTO, contactId:string):Promise<ContactEntity>;
}


export class EditContact implements EditContactInterface{
    
    constructor(private readonly contactRepository:ContactRepository){}

    async execute(contactDTO: ContactDTO, contactId: string): Promise<ContactEntity> {
        return await this.contactRepository.updateContact(contactDTO,contactId);
    }
    
}