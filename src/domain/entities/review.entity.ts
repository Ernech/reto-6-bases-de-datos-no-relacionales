import { UserEntity } from "./user.entity";


export class ReviewEntity{


constructor(
    public id:string,
    public user:UserEntity,
    public rating:number, 
    public comment:string
){}

}