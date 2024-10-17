import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
    title: 'Tatler API',
    version: '1.0.0',
    description: 'Tatler API documentation',
    }
};
    
const options = {
    swaggerDefinition,
    apis: ['../presentation/auht/auth-routes.ts']
};
    
export const swaggerSpec = swaggerJSDoc(options);