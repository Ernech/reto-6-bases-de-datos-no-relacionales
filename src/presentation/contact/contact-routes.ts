import { Router } from "express";
import { ContactDatasourceImpl } from "../../infraestructure/datasource/contact.datasource.impl";
import { ContactRepositoryImpl } from "../../infraestructure/repositories/contact.repository.impl";
import { ContactController } from "./contact-controller";


export class ContactRoutes{

    static getRoutes():Router{
        const contactDatasource = new ContactDatasourceImpl();
        const contactRepository = new ContactRepositoryImpl(contactDatasource);
        const contactController = new ContactController(contactRepository);

        const router = Router();

        return router;
    }
}