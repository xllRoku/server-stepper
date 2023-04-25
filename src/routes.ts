import { FastifyInstance } from 'fastify';
import { UserController } from './controllers';

const userRoutes = (server: FastifyInstance) => {
    server.post('/register', UserController().registerUser);
};

export { userRoutes };
