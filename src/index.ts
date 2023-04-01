import cors from '@fastify/cors';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import connectDb from './connect-db';
import { UserSchema } from './user.model';

dotenvConfig();

type UserDTO = {
    email: string;
    password: string;
};

const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD = /^\d{6,}$/;

const startApp = async () => {
    const server = fastify();

    connectDb();

    server.register(cors);

    server.post(
        '/user/register',
        (request: FastifyRequest<{ Body: UserDTO }>, replay: FastifyReply) => {
            const { email, password, ...rest } = request.body;

            if (EMAIL.test(email) || !email.length) {
                return;
            }

            if (PASSWORD.test(password) || !password.length) {
                return;
            }

            const user = new UserSchema({ email, password });

            user.save();

            replay.send({ message: 'User already been created' });
        }
    );

    console.log(
        'Listen to: ' +
            (await server.listen({ port: Number(process.env.PORT) || 3001 }))
    );
};

startApp();
