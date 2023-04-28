import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AplicationError, FormatError } from './errors';

const errorMiddleware: (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => void = (error, _, res) => {
    if (error instanceof FormatError) {
        return res.status(400).send({ errorMessage: error.message });
    }

    if (error instanceof AplicationError) {
        return res.status(400).send({ errorMessage: error.message });
    }

    console.log(error);
    return res.status(500).send({ errorMessage: 'Error interno del servidor' });
};

export { errorMiddleware };
