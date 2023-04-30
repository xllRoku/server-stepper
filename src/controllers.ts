import { FastifyReply, FastifyRequest } from 'fastify';
import type { SignOptions } from 'jsonwebtoken';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { validate } from './validations';
import { UserService } from './services';
import { hashPassword } from './haspassword';
import { signAsync } from './jwt.service';

export class AuthUser {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async registerUser(user: UserDTO): Promise<UserDTO> {
        const id = uuid();
        const hashedPassword = await hashPassword(user.password);

        const newUser = {
            _id: id,
            email: user.email,
            password: hashedPassword,
        };

        await this.userService.register(newUser);

        return newUser;
    }

    async loginUser(user: UserDTO) {
        validate().UserRegisterBody(user);
        const userId = await this.userService.login(user);

        return userId;
    }

    async createAuthToken(id: string): Promise<string> {
        const payload = { id };
        const options: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };
        const token = await signAsync(payload, options);
        return token;
    }
}

const UserController = (userService: UserService, authUser: AuthUser) => {
    const register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const newUser = await authUser.registerUser(request.body);
        const token = await authUser.createAuthToken(newUser._id);
        return { token };
        // const newUser = await registerUser(request.body);
        // const token = createAuthToken(newUser._id);
    };

    const login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const userId = await authUser.loginUser(request.body);

        console.log(userId);

        const token = await authUser.createAuthToken(userId);
        return { token };
        // const userId = await loginUser(request.body);
        // const token = createAuthToken(userId);
    };

    return { register, login };
};

export { UserController };
