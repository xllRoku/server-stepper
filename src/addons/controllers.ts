import uuid from 'uuid-random';
import { AddonSchema } from './schema';
import { FastifyReply, FastifyRequest } from 'fastify';

type AddonDTO = {
    title: string;
    price: number;
    annuality: string;
    content: string;
};

const addonController = () => {
    const creatAddon = async (
        request: FastifyRequest<{ Body: AddonDTO }>,
        replay: FastifyReply
    ) => {
        const id = uuid();

        const { annuality, content, price, title } = request.body;

        // TODO: validate body

        const plan = new AddonSchema({
            _id: id,
            annuality,
            content,
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

        return await AddonSchema.find().where({ annuality });
    };

    const getAllAddon = async (
        _request: FastifyRequest,
        _replay: FastifyReply
    ) => {
        return await AddonSchema.find();
    };
    return { creatAddon, getAllAddon, getByAnnuality };
};

export { addonController };
