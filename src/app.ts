import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server"


(()=>{
    main()
})()


async function main(){

    await MongoDatabase.connect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL
    })
    //Todo: Server start 
    new Server({port:envs.PORT}).start();
}