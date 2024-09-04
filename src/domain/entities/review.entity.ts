import { UserEntity } from "./user.entity";


export class ReviewEntity{


constructor(
    public id:string,
    public user:string,
    public rating:number, 
    public comment:string
){}

}