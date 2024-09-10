import { Router } from "express";
import { ReviewDataSourceImpl } from "../../infraestructure/datasource/review.datasource.impl";
import { ReviewRepositoryImpl } from "../../infraestructure/repositories/review.repository.impl";
import { ReviewController } from "./review-controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";


export class ReviewRoutes{

    static get routes():Router{

        const router = Router();
        const reviewDatasource = new ReviewDataSourceImpl();
        const reviewRepository = new ReviewRepositoryImpl(reviewDatasource);
        const reviewController = new ReviewController(reviewRepository);
        router.post('/',[AuthMiddleware.validateJwt],reviewController.createNewReview)
        return router;

        
    }


}