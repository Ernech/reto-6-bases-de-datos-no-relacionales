import { ReviewEntity } from "./review.entity";

export class RestaurantEnity{

    constructor(
        public id:string,
        public name:string,
        public description:string,
        public city: string,
        public address:string,
        public reviews:ReviewEntity[],
        public contacts:string[],
    ){}


}