import { ReviewDatasource } from "../../domain/datasource/review.datasource";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { ReviewEntity } from "../../domain/entities/review.entity";


export class ReviewDataSourceImpl implements ReviewDatasource{
    createReview(reviewDTO: ReviewDTO): Promise<ReviewEntity> {
        throw new Error("Method not implemented.");
    }
    updateReview(reviewDTO: ReviewDTO, reviewId: string): Promise<ReviewEntity> {
        throw new Error("Method not implemented.");
    }
    deleteReview(reviewId: string): Promise<ReviewEntity> {
        throw new Error("Method not implemented.");
    }
    getReviewsByRestaurant(restaurantId: string): Promise<ReviewEntity[]> {
        throw new Error("Method not implemented.");
    }


}