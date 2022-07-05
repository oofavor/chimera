import { Router } from 'express';
import * as controller from '@controllers/relation.controller';

export const relationRouter = Router();

relationRouter.post('/', controller.createRelationRequest);
relationRouter.get('/relations', controller.getRelationsByUserRequest);
relationRouter.get('/:id/messages', controller.getMessagesRequest);
relationRouter.put('/:id/add', controller.addPeerRequest);
relationRouter.delete('/:id/remove', controller.removePeerRequest);
relationRouter.get('/:id', controller.getRelationRequest);
