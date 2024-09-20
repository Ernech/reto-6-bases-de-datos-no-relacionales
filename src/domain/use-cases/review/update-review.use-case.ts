import { ReviewDTO } from "../../dto/review/review.dto";
import { ReviewEntity } from "../../entities/review.entity";
import { ReviewRepository } from "../../repositories/review.reposotiry";


interface UpdateReviewInterface{

    execute(reviewDTO:ReviewDTO,reviewId:string):Promise<ReviewEntity>;

}


export class UpdateReview implements UpdateReviewInterface{

    constructor(private readonly reviewRepository:ReviewRepository){}
        
    execute(reviewDTO: ReviewDTO, reviewId: string): Promise<ReviewEntity> {
        return this.reviewRepository.updateReview(reviewDTO,reviewId);
    }

}