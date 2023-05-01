import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { AuthUser } from './auth.system';
import { UuidVO } from './value-objects/uuid.vo';
import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';
import { ContainerSymbols } from '../symbols';

@injectable()
export class UserController {
    constructor(
        @inject(ContainerSymbols.AuthUser)
        private authUser: AuthUser
    ) {}

    register = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const id = uuid();
        const { email, password } = request.body;

        const token = await this.authUser.registerUser(
            new UuidVO(id),
            new EmailVO(email),
            await PasswordVO.create(password)
        );

        return { token };
    };

    login = async (
        request: FastifyRequest<{ Body: UserDTO }>,
        _: FastifyReply
    ) => {
        const { email, password } = request.body;
        const token = await this.authUser.loginUser(
            new EmailVO(email),
            new PlainPasswordVO(password)
        );

        return { token };
    };
}
