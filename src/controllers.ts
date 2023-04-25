import { FastifyReply, FastifyRequest } from 'fastify';
import uuid from 'uuid-random';
import { UserDTO } from './dto';
import { validateBody } from './validations';
import { UserService } from './services';

const UserController = () => {
    const registerUser = (
        request: FastifyRequest<{ Body: UserDTO }>,
        replay: FastifyReply
    ) => {
        const isValid = validateBody(request.body);
        const id = uuid();

        console.log(request.body);

        if (isValid) {
            UserService().createUser({ ...request.body, _id: id });
        }

        replay.send({ message: 'User already been created' });
    };

    return { registerUser };
};

export { UserController };
