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
            const restaurant = await RestaurantModel.findById(reviewDTO.restaurant); 
            if(!restaurant) throw CustomError.badRequest("The restaurant does not exists"); 
            
            const newReview = await ReviewModel.create({...reviewDTO,user:userId});
           
            (await newReview.save()).populate('user');
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
   async updateReview(reviewDTO: ReviewDTO, reviewId: string): Promise<ReviewEntity> {
        try{
              const review = await ReviewModel.findOne({_id:reviewId,user:reviewDTO.userId,status:true})
              .populate('user');
              if(!review) throw CustomError.notFound('Review Not found');
              review.rating=reviewDTO.rating;
              review.comment=reviewDTO.comment;
              review.save();

              return ReviewMapper.ReviewEntityFromMapper(review);
              
        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async deleteReview(reviewId: string,userId:string): Promise<ReviewEntity> {
        try{
            const review = await ReviewModel.findOne({_id:reviewId,user:userId,status:true}).populate('user');;
            if(!review) throw CustomError.notFound('Review Not found');

            review.status=false;
            review.save();
            return ReviewMapper.ReviewEntityFromMapper(review);

        }catch(error){
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
   async getReviewsByRestaurant(restaurantId: string): Promise<ReviewEntity[]> {
        try {
            const restaurant = await RestaurantModel.findOne({_id:restaurantId,status:true}).populate({
                path: 'Reviews',
                model:'Review',
                match: { status: true },
                populate: {
                    path: 'user',
                    model: 'User' 
                }
            });
            if(!restaurant)throw CustomError.notFound('Restaurant Not found');
            return restaurant.Reviews.map(review=>ReviewMapper.ReviewEntityFromMapper(review));
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


}