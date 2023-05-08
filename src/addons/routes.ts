import { FastifyInstance } from 'fastify';
import { addonController } from './controllers';

const planRoutes = async (server: FastifyInstance) => {
    server.post('/create', addonController().creatAddon);
    server.get('/', addonController().getAllAddon);
    server.get('/:annuality', addonController().getByAnnuality);
};

export { planRoutes };
