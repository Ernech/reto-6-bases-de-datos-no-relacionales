import 'dotenv/config';
import { get } from "env-var";


export const envs={

    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),

    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

    JWT_SEED:  get('JWT_SEED').required().asString(),

    ADMIN_NAME: get('ADMIN_USERNAME').required().asString(),

    ADMIN_EMAIL: get('ADMIN_EMAIL').required().asString(),

    ADMIN_PASSWORD: get('ADMIN_PASSWORD').required().asString()

}