import cors from '@fastify/cors';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import connectDb from './connect-db';
import { errorMiddleware } from './errorMiddleware';
import { userRoutes } from './auth/routes';
import { planRoutes } from './plan/routes';
import { addonRoutes } from './addons/routes';

dotenvConfig();

const startApp = async () => {
    const server = fastify();

    connectDb();

    server.register(cors);

    server.register(userRoutes, { prefix: '/users' });
    server.register(planRoutes, { prefix: '/plans' });
    server.register(addonRoutes, { prefix: '/addons' });

    server.setErrorHandler(errorMiddleware);

    console.log(
        'Listen to: ' +
            (await server.listen({ port: Number(process.env.PORT) || 3001 }))
    );
};

startApp();
