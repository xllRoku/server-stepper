import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

const errorMiddleware: (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) => void = (error, req, res) => {
    if (error instanceof FormatError) {
        return res.status(400).send({ errorMessage: error.message });
    }

    console.log(error);
    return res.status(500).send({ errorMessage: 'Error interno del servidor' });
};

export { errorMiddleware };
