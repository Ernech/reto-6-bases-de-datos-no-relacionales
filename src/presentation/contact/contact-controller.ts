import { ContactDTO } from "../../domain/dto/contact/contact.dto";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ContactRepository } from "../../domain/repositories/contact.repository";
import { Request, Response } from "express";
import { CreateContact } from "../../domain/use-cases/contacts/create-contact.use-case";
import { EditContact } from "../../domain/use-cases/contacts/edit-contact.use-case";
import { DeleteContact } from "../../domain/use-cases/contacts/delete-contact.use-case";
import { GetContactsBtyRestaurant } from "../../domain/use-cases/contacts/get-reviews.use-case";

export class ContactController{

    constructor(
        private readonly contactRepository:ContactRepository
    ){}
    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        return res.status(500).json({error:'Internal server error'});
    }
    
    createNewContact=async(req:Request,res:Response)=>{
        const [error,contact] = ContactDTO.create(req.body);
        if(!contact) return res.status(400).json({ok:false, msg:error});
         new CreateContact(this.contactRepository).execute(contact).then(contact=>res.status(201).json({ok:true,msg:'Contact created',contact}))
         .catch(error=>this.handleError(error,res));
    }

    editContact=async(req:Request, res:Response)=>{
        const {id} = req.params;
        const [error, contact] = ContactDTO.create(req.body);
        if(!contact) return res.status(400).json({ok:false,msg:error});
        new EditContact(this.contactRepository).execute(contact,id)
        .then(contact=>res.status(201).json({ok:true,msg:"Contact updated",contact}))
        .catch(error=>this.handleError(error,res));
    }

    deleteContact=async(req:Request,res:Response)=>{
        const {id}=req.params;
        new DeleteContact(this.contactRepository).execute(id)
        .then(contact=> res.status(201).json({ok:true,msg:"Contact deleted"}))
            .catch(error=>this.handleError(error,res));
    }

    getContactsByRestaurant=async(req:Request,res:Response)=>{
        const {id} = req.params;
        new GetContactsBtyRestaurant(this.contactRepository)
        .execute(id)
        .then(contacts=>res.status(200).json({ok:true,msg:"Contacs found",contacts}))
        .catch(error=>this.handleError(error,res));
    }


}