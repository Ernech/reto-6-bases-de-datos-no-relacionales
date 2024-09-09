import { ReviewDTO } from "../../dto/review/review.dto";
import { ReviewEntity } from "../../entities/review.entity";
import { ReviewRepository } from "../../repositories/review.reposotiry";

interface CreateReviewInterface{

    execute(reviewDTO:ReviewDTO,userId:string):Promise<ReviewEntity>
}


export class CreateReview implements CreateReviewInterface{

    constructor(
        private readonly reviewRepository:ReviewRepository
    ){}

    execute(reviewDTO: ReviewDTO, userId: string): Promise<ReviewEntity> {
        const newReview = this.reviewRepository.createReview(reviewDTO,userId);

        return newReview;
    }
    
}