import { ReviewDTO } from "../dto/review/review.dto";
import { ReviewEntity } from "../entities/review.entity";

export abstract class ReviewRepository{


    abstract createReview(reviewDTO:ReviewDTO):Promise<ReviewEntity>

    abstract updateReview(reviewDTO:ReviewDTO,reviewId:string):Promise<ReviewEntity>

    abstract deleteReview(reviewId:string):Promise<ReviewEntity>

    abstract getReviewsByRestaurant(restaurantId:string):Promise<ReviewEntity[]>

}