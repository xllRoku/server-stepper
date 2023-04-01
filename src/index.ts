import fastify from 'fastify';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

const startApp = async () => {
    const server = fastify();
    server.get('/', (_request: FastifyRequest, replay: FastifyReply) => {
        replay.send('hello world');
    });

    console.log(
        'Listen to: ' +
            (await server.listen({ port: Number(process.env.PORT) || 3001 }))
    );
};

startApp();
