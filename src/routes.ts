import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserRegisterController } from './controllers';
import { UserRegisterUseCase } from './services';
import { UserRepository } from './respository';

const userRegisterController = new UserRegisterController(
    new UserRegisterUseCase(new UserRepository())
);

const userRoutes = async (server: FastifyInstance) => {
    server.post('/register', userRegisterController.register);
};

export { userRoutes };
