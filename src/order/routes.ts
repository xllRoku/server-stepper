import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const orderController = () => {
    const getTotal = (
        request: FastifyRequest<{ Body: (number | number[])[] }>,
        replay: FastifyReply
    ) => {
        const prices = request.body;

        const sum = (arr: (number | number[])[]) => {
            let suma = 0;
            arr.forEach((price) => {
                if (Array.isArray(price)) {
                    suma += sum(price);
                } else {
                    suma += price;
                }
            });
            return suma;
        };

        const total = sum(prices);

        return total;
    };

    return { getTotal };
};

const orderRoutes = async (server: FastifyInstance) => {
    server.post('/total', orderController().getTotal);
};

export { orderRoutes };
