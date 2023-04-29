import { FastifyReply, FastifyRequest } from 'fastify';
import type { SignOptions } from 'jsonwebtoken';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { validate } from './validations';
import { userLoginUseCase, userRegisterUseCase } from './services';
import { hashPassword } from './haspassword';
import { signAsync } from './jwt.service';

const UserController = () => {
    const register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const id = uuid();

        validate().UserRegisterBody(request.body);

        const user = {
            ...request.body,
            _id: id,
            password: await hashPassword(request.body.password),
        };

        await userRegisterUseCase(user);

        const payload = { id };

        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return { token };
    };

    const login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const user = {
            ...request.body,
        };

        validate().UserRegisterBody(user);

        const idUser = await userLoginUseCase(user);

        const payload = { id: idUser };

        const signOptions: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };

        const token = await signAsync(payload, signOptions);

        return { token };
    };

    return { register, login };
};

export { UserController };

// export class UserRegisterController {
//     private validateUserBody: ValidateUserBody;
//     constructor(private userRegisterUseCase: UserRegisterUseCase) {
//         this.validateUserBody = new ValidateUserBody();
//         this.register = this.register.bind(this);
//     }

//     async register(
//         request: FastifyRequest<{ Body: UserDTO }>,
//         replay: FastifyReply
//     ): Promise<void> {
//         const { email, password } = request.body;
//         const id = uuid();

//         this.validateUserBody.validate(email, password);

//         const hashedPassword = await Password.hashed(password);

//         await this.userRegisterUseCase.register(
//             id,
//             email,
//             hashedPassword.getValue()
//         );

//         replay.statusCode = 201;
//     }
// }
