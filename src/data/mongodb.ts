import mongoose from "mongoose";

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
        } catch (error) {
            console.log('Mongo connection error');
            throw Error;
        }
    }
    //TODO: Implementar la logica despues
    // private static async initializeAdmin() {
    //     try {
    //         const adminExists = await User.findOne({ role: 'admin' });
    //         if (!adminExists) {
    //             const username = process.env.ADMIN_USERNAME || 'default_admin';
    //             const password = process.env.ADMIN_PASSWORD || 'default_password';
    //             const hashedPassword = await bcrypt.hash(password, 10);
    //             const admin = new User({
    //                 username,
    //                 password: hashedPassword,
    //                 role: 'admin'
    //             });
    //             await admin.save();
    //             console.log(`Admin user created: ${username}`);
    //         }
    //     } catch (error) {
    //         console.log('Error initializing admin:', error);
    //         throw error;
    //     }
    // }

}