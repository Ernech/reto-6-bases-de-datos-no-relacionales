import { ContactDTO } from "../../dto/contact/contact.dto";
import { ContactEntity } from "../../entities/contact.entity";
import { ContactRepository } from "../../repositories/contact.repository";


interface CreateContactInterface{
    execute(contactDTO:ContactDTO):Promise<ContactEntity>
}

export class CreateContact implements CreateContactInterface{

    constructor(private readonly contactRepository:ContactRepository){}

    async execute(contactDTO: ContactDTO): Promise<ContactEntity> {
        return await this.contactRepository.createContact(contactDTO);
    }
    
}