import { FastifyInstance } from 'fastify';
import { UserController } from './controllers';
import container from '../container';
import { ContainerSymbols } from '../symbols';

const userController = container.get<UserController>(
    ContainerSymbols.UserController
);

const userRoutes = async (server: FastifyInstance) => {
    server.post('/register', userController.register);
    server.post('/login', userController.login);
};

export { userRoutes };
