import uuid from 'uuid-random';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AddonSchema } from './schema';

type AddonDTO = {
    title: string;
    price: number;
    annuality: string;
    content: string;
};

const addonController = () => {
    const createAddon = async (
        request: FastifyRequest<{ Body: AddonDTO }>,
        replay: FastifyReply
    ) => {
        const id = uuid();

        const { annuality, content, price, title } = request.body;

        // TODO: validate body

        const addon = new AddonSchema({
            _id: id,
            annuality,
            content,
            price,
            title,
        });

        await addon.save();

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

    const getAllAddons = async (
        _request: FastifyRequest,
        _replay: FastifyReply
    ) => {
        return await AddonSchema.find();
    };

    return { createAddon, getAllAddons, getByAnnuality };
};

export { addonController };
