import { ReviewEntity } from "../../entities/review.entity";
import { ReviewRepository } from "../../repositories/review.reposotiry";


interface GetReviewsByRestaurantInterface{

    execute(restaurantId:string):Promise<ReviewEntity[]>;

}


export class GetReviewsByRestaurant implements GetReviewsByRestaurantInterface{

    constructor(private readonly reviewRepository:ReviewRepository){}
        
    execute(restaurantId: string): Promise<ReviewEntity[]> {
        return this.reviewRepository.getReviewsByRestaurant(restaurantId);
    }

}