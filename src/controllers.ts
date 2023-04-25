import { FastifyReply, FastifyRequest } from 'fastify';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { UserRegisterUseCase } from './services';
import { ValidateUserBody } from './validations';
import { Password } from './haspassword';

export class UserRegisterController {
    private validateUserBody: ValidateUserBody;
    constructor(private userRegisterUseCase: UserRegisterUseCase) {
        this.validateUserBody = new ValidateUserBody();
        this.register = this.register.bind(this);
    }

    async register(
        request: FastifyRequest<{ Body: UserDTO }>,
        replay: FastifyReply
    ): Promise<void> {
        const { email, password } = request.body;
        const id = uuid();

        this.validateUserBody.validate(email, password);

        const hashedPassword = await Password.hashed(password);

        await this.userRegisterUseCase.register(
            id,
            email,
            hashedPassword.getValue()
        );

        replay.statusCode = 201;
    }
}
