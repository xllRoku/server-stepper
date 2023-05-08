import uuid from 'uuid-random';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PlanSchema } from './schema';

type PlanDTO = {
    title: string;
    price: number;
    annuality: string;
    image: string;
};

const planController = () => {
    const createPlan = async (
        request: FastifyRequest<{ Body: PlanDTO }>,
        replay: FastifyReply
    ) => {
        const id = uuid();

        const { annuality, image, price, title } = request.body;

        // TODO: validate body

        const plan = new PlanSchema({
            _id: id,
            annuality,
            image,
            price,
            title,
        });

        await plan.save();

        replay.statusCode = 200;
    };

    const getByAnnuality = async (
        request: FastifyRequest<{ Params: { annuality: string } }>,
        _replay: FastifyReply
    ) => {
        const { annuality } = request.params;

        // TODO: validate params

        return await PlanSchema.find().where({ annuality });
    };

    const getAllPlans = async (
        _request: FastifyRequest,
        _replay: FastifyReply
    ) => {
        return await PlanSchema.find();
    };

    return { createPlan, getAllPlans, getByAnnuality };
};

export { planController };
