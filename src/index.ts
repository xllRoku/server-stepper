import cors from '@fastify/cors';
import { config as dotenvConfig } from 'dotenv';
import fastify, { FastifyError } from 'fastify';
import uuid from 'uuid-random';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import connectDb from './connect-db';
import { UserSchema } from './user.model';

dotenvConfig();

class FormatError extends Error {
    errors: { message: string; name: string }[];
    constructor(errors: { message: string; name: string }[]) {
        super('Error de formato');
        this.errors = errors;
    }
}

type UserDTO = {
    _id: string;
    email: string;
    password: string;
};

const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD = /^\d{6,}$/;

const validateBody = (body: UserDTO) => {
    const { email, password } = body;

    const errors = [];

    if (!EMAIL.test(email) || !email.length) {
        errors.push({
            message: 'El formato del email es incorrecto',
            name: 'email',
        });
    }

    if (!PASSWORD.test(password) || !password.length) {
        errors.push({
            message: 'El formato de la contraseña es incorrecto',
            name: 'password',
        });
    }

    if (errors.length > 0) {
        const errorMessages = errors.map((error) => ({
            message: error.message,
            name: error.name,
        }));

        throw new FormatError(errorMessages);
    } else {
        return true;
    }
};

function UserService() {
    function createUser(user: UserDTO) {
        const newUser = new UserSchema({ user });
        newUser.save();
    }

    return { createUser };
}

const errorMiddleware: (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => void = (error, req, res) => {
    //console.error('\x1b[0;31m' + error.stack);

    if (error instanceof FormatError) {
        const errors = error.errors.map((err) => ({
            message: err.message,
            name: err.name,
        }));
        return res.status(400).send({ errorMessage: errors });
    }

    console.log(error);
    return res.status(500).send({ errorMessage: 'Error interno del servidor' });
};

const startApp = async () => {
    const server = fastify();

    connectDb();

    server.register(cors);

    server.post(
        '/user/register',
        (request: FastifyRequest<{ Body: UserDTO }>, replay: FastifyReply) => {
            const isValid = validateBody(request.body);
            const id = uuid();

            if (isValid) {
                UserService().createUser({ ...request.body, _id: id });
            }

            replay.send({ message: 'User already been created' });
        }
    );

    server.setErrorHandler(errorMiddleware);

    console.log(
        'Listen to: ' +
            (await server.listen({ port: Number(process.env.PORT) || 3001 }))
    );
};

startApp();
