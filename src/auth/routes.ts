import { FastifyInstance } from 'fastify';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserRepository } from './respository';
import { UserValidator } from './validations';
import { AuthUser } from './auth.system';

const userRepository = new UserRepository();
const userValidator = new UserValidator();
const userService = new UserService(userRepository);
const authUser = new AuthUser(userService, userValidator);
const userController = UserController(userService, authUser);

const userRoutes = async (server: FastifyInstance) => {
    server.post('/register', userController.register);
    server.post('/login', userController.login);
};

export { userRoutes };
