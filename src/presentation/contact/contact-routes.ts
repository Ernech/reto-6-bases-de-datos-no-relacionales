import { Router } from "express";
import { ContactDatasourceImpl } from "../../infraestructure/datasource/contact.datasource.impl";
import { ContactRepositoryImpl } from "../../infraestructure/repositories/contact.repository.impl";
import { ContactController } from "./contact-controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CheckRoles } from "../middlewares/has-role.middleware";


export class ContactRoutes{

    static getRoutes():Router{
        const contactDatasource = new ContactDatasourceImpl();
        const contactRepository = new ContactRepositoryImpl(contactDatasource);
        const contactController = new ContactController(contactRepository);
        const router = Router();
        router.post('/',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE'])],contactController.createNewContact);
        router.put('/:id',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE'])],contactController.editContact);
        router.delete('/:id',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE'])],contactController.editContact);
        router.get('/restaurant/:id',contactController.getContactsByRestaurant);


        return router;
    }
}