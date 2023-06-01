import cors from '@fastify/cors';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import connectDb from './connect-db';
import { errorMiddleware } from './errorMiddleware';
import { userRoutes } from './auth/routes';
import { planRoutes } from './plan/routes';
import { addonRoutes } from './addons/routes';
<<<<<<< HEAD
=======
import { orderRoutes } from './order/routes';
>>>>>>> 160073db589cdac1da8d400d8d0a5e8645ea7990

dotenvConfig();

const startApp = async () => {
    const server = fastify();

    connectDb();

    server.register(cors);

    server.register(userRoutes, { prefix: '/users' });
    server.register(planRoutes, { prefix: '/plans' });
    server.register(addonRoutes, { prefix: '/addons' });
<<<<<<< HEAD
=======
    server.register(orderRoutes, { prefix: '/order' });
>>>>>>> 160073db589cdac1da8d400d8d0a5e8645ea7990

    server.setErrorHandler(errorMiddleware);

    console.log(
        'Listen to: ' +
            (await server.listen({ port: Number(process.env.PORT) || 3001 }))
    );
};

startApp();
