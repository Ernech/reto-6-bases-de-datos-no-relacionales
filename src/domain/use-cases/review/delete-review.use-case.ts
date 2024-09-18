import { ReviewEntity } from "../../entities/review.entity";
import { ReviewRepository } from "../../repositories/review.reposotiry";


interface DelteReviewInterface{

    execute(reviewId:string,userId:string):Promise<ReviewEntity>;

}


export class DeleteReview implements DelteReviewInterface{

    constructor(private readonly reviewRepository:ReviewRepository){}
        
    execute(reviewId: string, userId: string): Promise<ReviewEntity> {
        return this.reviewRepository.deleteReview(reviewId,userId);
    }

}