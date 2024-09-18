import mongoose from "mongoose";
import { RoleModel } from "./models/role";
import { envs } from "../config/envs";
import { UserModel } from "./models/user";
import {  hashSync } from 'bcryptjs';
interface Options{
    mongoUrl:string;
    dbName:string;
}

export class MongoDatabase{

  

    static async connect(options:Options){
        try {
           await mongoose.connect(options.mongoUrl,{
                dbName:options.dbName
            });
            console.log('DB conected'); 
            await this.initializeRoles();
            await this.initializeAdmin(); 
        } catch (error) {
            console.log('Mongo connection error');
            throw Error;
        }
    }


    private static async initializeRoles() {
        const roles = ['ADMIN_ROLE', 'USER_ROLE'];
        try {
            for (const roleName of roles) {
                const roleExists = await RoleModel.findOne({ role: roleName });
                if (!roleExists) {
                    const role = new RoleModel({ role: roleName });
                    await role.save();
                    console.log(`Role created: ${roleName}`);
                }
            }
        } catch (error) {
            console.log('Error initializing roles:', error);
            throw error;
        }
    }

    private static async initializeAdmin() {
        try {
            const adminRole = await RoleModel.findOne({role:'ADMIN_ROLE'});
            const adminExists = await UserModel.findOne({ roles:[adminRole?._id] });
            if (!adminExists) {
                const username = envs.ADMIN_NAME || 'default_admin';
                const email = envs.ADMIN_EMAIL || 'admin@emial.com';
                const password = envs.ADMIN_PASSWORD || 'default_password';
                const hashedPassword =  hashSync(password);
               
               
                const admin = new UserModel({
                    name:username,
                    password: hashedPassword,
                    email,
                    roles: [adminRole?._id]
                });
                
                await admin.save();
                console.log(`Admin user created: ${username}`);
            }
        } catch (error) {
            console.log('Error initializing admin:', error);
            throw error;
        }
    }

}