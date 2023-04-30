import { FastifyReply, FastifyRequest } from 'fastify';
import type { SignOptions } from 'jsonwebtoken';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { validate } from './validations';
import { userLoginUseCase, userRegisterUseCase } from './services';
import { hashPassword } from './haspassword';
import { signAsync } from './jwt.service';

const createAuthToken = async (id: string): Promise<string> => {
    const payload = { id };
    const options: SignOptions = {
        algorithm: 'HS512',
        expiresIn: '7d',
    };
    const token = await signAsync(payload, options);
    return token;
};

const registerUser = async (user: UserDTO): Promise<UserDTO> => {
    const id = uuid();
    const hashedPassword = await hashPassword(user.password);

    const newUser = {
        _id: id,
        email: user.email,
        password: hashedPassword,
    };

    await userRegisterUseCase(newUser);

    return newUser;
};

const loginUser = async (user: UserDTO) => {
    validate().UserRegisterBody(user);
    const userId = await userLoginUseCase(user);

    return userId;
};

const UserController = () => {
    const register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const newUser = await registerUser(request.body);
        const token = createAuthToken(newUser._id);

        return { token };
    };

    const login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const userId = await loginUser(request.body);
        const token = createAuthToken(userId);

        return { token };
    };

    return { register, login };
};

export { UserController };
