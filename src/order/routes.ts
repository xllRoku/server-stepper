import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

type OrderDTO = {
    plan: number;
    addons: number | number[];
};

const orderController = () => {
    const getTotal = (
        request: FastifyRequest<{ Body: OrderDTO }>,
        replay: FastifyReply
    ) => {};

    return { getTotal };
};

const OrderRoutes = async (server: FastifyInstance) => {
    server.post('/total', orderController().getTotal);
};

export { OrderRoutes };
