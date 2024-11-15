import { ContactEntity } from "./contact.entity";
import { ReviewEntity } from "./review.entity";

export class RestaurantEnity{

    constructor(
        public id:string,
        public name:string,
        public description:string,
        public city: string,
        public address:string,
        private averageRating:number,
        public reviews:ReviewEntity[],
        public contacts:ContactEntity[],
    ){}


}