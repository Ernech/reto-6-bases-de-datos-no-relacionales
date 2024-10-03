import { ContactDTO } from "../../domain/dto/contact/contact.dto";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ContactRepository } from "../../domain/repositories/contact.repository";
import { Request, Response } from "express";
import { CreateContact } from "../../domain/use-cases/contacts/create-contact.use-case";

export class ContactController{

    constructor(
        private readonly contactRepository:ContactRepository
    ){}
    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error);
        return res.status(500).json({error:'Internal server error'});
    }
    
    createNewContact=async(req:Request,res:Response)=>{
        const [error,contact] = ContactDTO.create(req.body);
        if(!contact) return res.status(400).json({result:false, msg:error});
         new CreateContact(this.contactRepository).execute(contact).then(contact=>res.status(201).json({ok:true,msg:'Contact created',contact}))
         .catch(error=>this.handleError(error,res));
    }

}