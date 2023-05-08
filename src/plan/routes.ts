import { FastifyInstance } from 'fastify';
import { planController } from './controllers';

const planRoutes = async (server: FastifyInstance) => {
    server.post('/create', planController().createPlan);
    server.get('/', planController().getAllPlans);
    server.get('/:annuality', planController().getByAnnuality);
};

export { planRoutes };
