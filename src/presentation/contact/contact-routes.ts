import { Router } from "express";
import { ContactDatasourceImpl } from "../../infraestructure/datasource/contact.datasource.impl";
import { ContactRepositoryImpl } from "../../infraestructure/repositories/contact.repository.impl";
import { ContactController } from "./contact-controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CheckRoles } from "../middlewares/has-role.middleware";
import { IsValidMongoId } from "../middlewares/mongoId.middleware";


export class ContactRoutes{

    static get routes():Router{
        const contactDatasource = new ContactDatasourceImpl();
        const contactRepository = new ContactRepositoryImpl(contactDatasource);
        const contactController = new ContactController(contactRepository);
        const router = Router();
        router.post('/',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE'])],contactController.createNewContact);
        router.put('/:id',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE']),IsValidMongoId.checkId],contactController.editContact);
        router.delete('/:id',[AuthMiddleware.validateJwt,CheckRoles.hasRole(['ADMIN_ROLE']),IsValidMongoId.checkId],contactController.deleteContact);
        router.get('/restaurant/:id',[IsValidMongoId.checkId],contactController.getContactsByRestaurant);


        return router;
    }
}