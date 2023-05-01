import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ApplicationConflictException, DomainFormatException } from './errors';
import { STATUS_ERROR } from './status.errors';

const errorMiddleware: (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => void = (error, _, res) => {
    if (error instanceof DomainFormatException)
        return res
            .status(STATUS_ERROR.BAD_REQUEST)
            .send({ errorMessage: error.message });

    if (error instanceof ApplicationConflictException) {
        return res
            .status(STATUS_ERROR.UNAUTHORIZED)
            .send({ errorMessage: error.message });
    }

    return res
        .status(STATUS_ERROR.INTERNAL_SERVER_ERROR)
        .send({ errorMessage: 'Error interno del servidor' });
};

export { errorMiddleware };
