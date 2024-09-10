import { Request,Response } from "express";
import { ReviewRepository } from "../../domain/repositories/review.reposotiry";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { CreateReview } from "../../domain/use-cases/review/create-review.use-case";
import { CustomError } from "../../domain/errors/ecustom.errors";


export class ReviewController{

    constructor(
        private readonly reviewRepository:ReviewRepository
    ){}
    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error);
        return res.status(500).json({error:'Internal server error'});
    }
    createNewReview=async(req:Request,res:Response)=>{
        const {user, ...data} =req.body
        const [error,reviewDTO] = ReviewDTO.create({userId:user.id,...data})

        if(error || !reviewDTO) return res.status(400).json({error});

        new CreateReview(this.reviewRepository).execute(reviewDTO)
        .then(data=>res.status(201).json({ok:true,msg:'Review Created',review:data,user}))
        .catch(err=>this.handleError(err,res));

    }


}