import { FastifyInstance } from 'fastify';
import { AuthUser, UserController } from './controllers';
import { UserService } from './services';

const userService = new UserService();
const authUser = new AuthUser(userService);
const userController = UserController(userService, authUser);

const userRoutes = async (server: FastifyInstance) => {
    server.post('/register', userController.register);
    server.post('/login', userController.login);
};

export { userRoutes };
