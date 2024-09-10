import { Router } from "express";
import { RestaurantDataSourceImpl } from "../../infraestructure/datasource/restaurant.datasource.impl";
import { RestaurantRepositoryImpl } from "../../infraestructure/repositories/restaurant.repository.impl";
import { ResturantController } from "./restaurant-controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { CheckRoles } from "../middlewares/has-role.middleware";


export class RestaurantRoutes{

    static get routes():Router{

        const router = Router();
        const dataSource = new RestaurantDataSourceImpl();
        const repository = new RestaurantRepositoryImpl(dataSource);
        const restaurantController = new ResturantController(repository);

        router.post('/',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE'])],restaurantController.createNewResturant);


        return router;

        
    }


}