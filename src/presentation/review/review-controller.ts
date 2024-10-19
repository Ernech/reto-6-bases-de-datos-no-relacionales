import { Request,Response } from "express";
import { ReviewRepository } from "../../domain/repositories/review.reposotiry";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { CreateReview } from "../../domain/use-cases/review/create-review.use-case";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { UpdateReview } from "../../domain/use-cases/review/update-review.use-case";
import { DeleteReview } from "../../domain/use-cases/review/delete-review.use-case";
import { GetReviewsByRestaurant } from "../../domain/use-cases/review/get-reviews-by-restaurant.use-case";


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
        .then(data=>res.status(201).json({ok:true,msg:'Review Created',review:{...data,username:user.name,email:user.email}}))
        .catch(err=>this.handleError(err,res));

    }

    editReview=async(req:Request,res:Response)=>{
        const {user, ...data} =req.body
        const [error,reviewDTO] = ReviewDTO.create({userId:user.id,...data})
        const {id} =req.params;
        if(error || !reviewDTO) return res.status(400).json({error});

        new UpdateReview(this.reviewRepository).execute(reviewDTO,id)
        .then(data=>res.status(201).json({ok:true,msg:'Review Updated',review:{...data,username:user.name,email:user.email}}))
        .catch(err=>this.handleError(err,res));
    }

    deleteReview=async(req:Request,res:Response)=>{
        const {user} =req.body
        const {id} =req.params;
        new DeleteReview(this.reviewRepository).execute(id,user.id)
        .then(data=>res.status(200).json({ok:true,msg:`The review has been deleted`,review:data}))
        .catch(err=>this.handleError(err,res));
    }

    getReviewsByRestaurant=async(req:Request,res:Response)=>{
        const {id} = req.params;
        new GetReviewsByRestaurant(this.reviewRepository).execute(id)
        .then(data=>res.status(200).json({ok:true,msg:'Reviews found',reviews:data}))
        .catch(err=>this.handleError(err,res));
    }


}