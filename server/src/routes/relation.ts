import { Router } from 'express';
import * as controller from '@controllers/relation.controller';

export const relationRouter = Router();

relationRouter.get('/:id', controller.getRelationRequest);
relationRouter.get('/:id/messages', controller.getMessagesRequest);
relationRouter.post('/', controller.createRelationRequest);
relationRouter.put('/:id', controller.changeRelationRequest);
relationRouter.put('/:id/add', controller.addPeerRequest);
relationRouter.delete('/:id/delete', controller.deletePeerRequest);
