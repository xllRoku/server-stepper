import { FastifyReply, FastifyRequest } from 'fastify';
import { UserDTO } from './dto';
import { UserService } from './services';
import { AuthUser } from './auth.system';

const UserController = (_userService: UserService, authUser: AuthUser) => {
    const register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const token = await authUser.registerUser(request.body);

        return { token };
    };

    const login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const token = await authUser.loginUser(request.body);

        return { token };
    };

    return { register, login };
};

export { UserController };
