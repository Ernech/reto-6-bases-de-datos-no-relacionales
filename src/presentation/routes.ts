import { Router } from "express";
import { AuthRoutes } from "./auth/auth-routes";
import { RestaurantRoutes } from "./restaurant/restaurant-routes";
import { UserRoutes } from "./user/user-routes";
import { ReviewRoutes } from "./review/review-routes";



export class AppRoutes{

    static get routes():Router{

        const router =Router();
        router.use('api/auth', AuthRoutes.routes);
        router.use('api/restaurant', RestaurantRoutes.routes);
        router.use('api/review', ReviewRoutes.routes);
        router.use('api/user', UserRoutes.routes);
        return router;
    }

}