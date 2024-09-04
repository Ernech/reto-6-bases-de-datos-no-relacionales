import { RestaurantModel } from "../../data/models/restaurant";
import { ReviewModel } from "../../data/models/review";
import { ReviewDatasource } from "../../domain/datasource/review.datasource";
import { ReviewDTO } from "../../domain/dto/review/review.dto";
import { ReviewEntity } from "../../domain/entities/review.entity";
import { CustomError } from "../../domain/errors/ecustom.errors";
import { ReviewMapper } from "../mappers/review.mapper";


export class ReviewDataSourceImpl implements ReviewDatasource{
    async createReview(reviewDTO: ReviewDTO, userId:string): Promise<ReviewEntity> {
        try {
            const restaurant = await RestaurantModel.findById(reviewDTO.restaurantId); 
            if(!restaurant) throw CustomError.badRequest("The restaurant does not exists"); 
            const newReview = await ReviewModel.create({...reviewDTO,user:userId});
            await newReview.save();
            const restaurantReviews = [...restaurant.Reviews, newReview._id];
            const newRating = (restaurant.averageRating + reviewDTO.rating)/restaurantReviews.length;
            await RestaurantModel.findByIdAndUpdate(restaurant._id,{Reviews:restaurantReviews,averageRating:newRating});
            return ReviewMapper.ReviewEntityFromMapper(newReview);

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }

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