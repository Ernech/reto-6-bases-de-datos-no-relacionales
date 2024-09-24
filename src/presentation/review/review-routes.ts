import { Router } from "express";
import { ReviewDataSourceImpl } from "../../infraestructure/datasource/review.datasource.impl";
import { ReviewRepositoryImpl } from "../../infraestructure/repositories/review.repository.impl";
import { ReviewController } from "./review-controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { IsValidMongoId } from "../middlewares/mongoId.middleware";


export class ReviewRoutes{

    static get routes():Router{

        const router = Router();
        const reviewDatasource = new ReviewDataSourceImpl();
        const reviewRepository = new ReviewRepositoryImpl(reviewDatasource);
        const reviewController = new ReviewController(reviewRepository);
        router.post('/',[AuthMiddleware.validateJwt],reviewController.createNewReview);
        router.put('/:id',[IsValidMongoId.checkId,AuthMiddleware.validateJwt],reviewController.editReview);
        router.get('/:id',[IsValidMongoId.checkId],reviewController.getReviewsByRestaurant);
        router.delete('/:id',[IsValidMongoId.checkId,AuthMiddleware.validateJwt],reviewController.deleteReview);
        return router;

        
    }


}