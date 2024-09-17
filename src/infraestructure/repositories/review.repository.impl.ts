import { ReviewDatasource } from "../../domain/datasource/review.datasource";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { ReviewEntity } from "../../domain/entities/review.entity";
import { ReviewRepository } from "../../domain/repositories/review.reposotiry";


export class ReviewRepositoryImpl implements ReviewRepository{

    constructor(
        private readonly reviewDatasource:ReviewDatasource
    ){}

   async createReview(reviewDTO: ReviewDTO, userId:string): Promise<ReviewEntity> {
        return await this.reviewDatasource.createReview(reviewDTO, userId);
    }
    async updateReview(reviewDTO: ReviewDTO, reviewId: string,userId:string): Promise<ReviewEntity> {
        return await this.reviewDatasource.updateReview(reviewDTO,reviewId,userId);
    }
    async deleteReview(reviewId: string,userId:string): Promise<ReviewEntity> {
        return await this.reviewDatasource.deleteReview(reviewId,userId);
    }
    async getReviewsByRestaurant(restaurantId: string): Promise<ReviewEntity[]> {
        return await this.getReviewsByRestaurant(restaurantId);
    }
    
}