import { ReviewDTO } from "../../dto/review/review.dto";
import { ReviewEntity } from "../../entities/review.entity";
import { ReviewRepository } from "../../repositories/review.reposotiry";

interface CreateReviewInterface{

    execute(reviewDTO:ReviewDTO):Promise<ReviewEntity>
}


export class CreateReview implements CreateReviewInterface{

    constructor(
        private readonly reviewRepository:ReviewRepository
    ){}

    execute(reviewDTO: ReviewDTO): Promise<ReviewEntity> {
        const newReview = this.reviewRepository.createReview(reviewDTO,reviewDTO.userId);

        return newReview;
    }
    
}