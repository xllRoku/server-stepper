import { FastifyInstance } from 'fastify';
import { addonController } from './controllers';

const addonRoutes = async (server: FastifyInstance) => {
    server.post('/create', addonController().createAddon);
    server.get('/:annuality', addonController().getByAnnuality);
    server.get('/', addonController().getAllAddons);
};

export { addonRoutes };
