import { ReviewDatasource } from "../../domain/datasource/review.datasource";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { ReviewEntity } from "../../domain/entities/review.entity";
import { ReviewRepository } from "../../domain/repositories/review.reposotiry";


export class ReviewRepositoryImpl implements ReviewRepository{

    constructor(
        private readonly reviewDatasource:ReviewDatasource
    ){}

   async createReview(reviewDTO: ReviewDTO): Promise<ReviewEntity> {
        return await this.reviewDatasource.createReview(reviewDTO);
    }
    async updateReview(reviewDTO: ReviewDTO, reviewId: string): Promise<ReviewEntity> {
        return await this.reviewDatasource.updateReview(reviewDTO,reviewId);
    }
    async deleteReview(reviewId: string): Promise<ReviewEntity> {
        return await this.reviewDatasource.deleteReview(reviewId);
    }
    async getReviewsByRestaurant(restaurantId: string): Promise<ReviewEntity[]> {
        return await this.getReviewsByRestaurant(restaurantId);
    }
    
}