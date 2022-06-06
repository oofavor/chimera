import { Router } from 'express';
import * as controller from '@controllers/relation.controller';

export const relationRouter = Router();

relationRouter.post('/', controller.createRelationRequest);
relationRouter.get('/:id', controller.getRelationRequest);
relationRouter.get('/:id/messages', controller.getMessagesRequest);
relationRouter.put('/:id/add', controller.addPeerRequest);
relationRouter.delete('/:id/remove', controller.removePeerRequest);
