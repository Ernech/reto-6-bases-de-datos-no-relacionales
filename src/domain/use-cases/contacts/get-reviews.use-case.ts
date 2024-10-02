import { ContactEntity } from "../../entities/contact.entity";
import { ContactRepository } from "../../repositories/contact.repository";


interface GetContactsByRestaurantInterface{
    execute(restaurantId:string):Promise<ContactEntity[]>
}


export class GetContactsBtyRestaurant implements GetContactsByRestaurantInterface{
    
    constructor(private readonly contactRepository:ContactRepository){}
    
    async execute(restaurantId: string): Promise<ContactEntity[]> {
        return await this.contactRepository.getContactsByRestaurant(restaurantId);
    }
    
}