import { FastifyReply, FastifyRequest } from 'fastify';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { UserService } from './services';
import { AuthUser } from './auth.system';
import { UuidVO } from './value-objects/uuid.vo';
import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';

const UserController = (_userService: UserService, authUser: AuthUser) => {
    const register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const id = uuid();
        const { email, password } = request.body;

        const token = await authUser.registerUser(
            new UuidVO(id),
            new EmailVO(email),
            await PasswordVO.create(password)
        );

        return { token };
    };

    const login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const { email, password } = request.body;
        const token = await authUser.loginUser(
            new EmailVO(email),
            new PlainPasswordVO(password)
        );

        return { token };
    };

    return { register, login };
};

export { UserController };
