import { FastifyInstance } from 'fastify';
import { UserController } from './controllers';

const userRoutes = async (server: FastifyInstance) => {
    server.post('/register', UserController().register);
    server.post('/login', UserController().login);
};

export { userRoutes };
