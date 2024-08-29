import { Router } from "express";
import { RestaurantDataSourceImpl } from "../../infraestructure/datasource/restaurant.datasource.impl";
import { RestaurantRepositoryImpl } from "../../infraestructure/repositories/restaurant.repository.impl";


export class RestaurantRoutes{

    static get routes():Router{

        const router = Router();
        const dataSource = new RestaurantDataSourceImpl();
        const repository = new RestaurantRepositoryImpl(dataSource);
        const restaurantController = new RestaurantController();


        return router;

        
    }


}