import express from 'express';
import logger from 'morgan';
import next from 'next';
import cors from 'cors';
import { userRouter } from './src/routes/user';
import { relationRouter } from './src/routes/relation';
import { messageRouter } from './src/routes/message';
import { config } from 'dotenv';
import { IncomingMessage, ServerResponse } from 'http';
import { ExpressPeerServer } from 'peer';
config();

const app = express();
const dev = process.env.NODE_ENV !== 'production';

// next.js app
const nextApp = next({ dev, dir: '../' });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const port = process.env.PORT || 3000;

  // setting middleware
  app.use(express.json());
  app.use(logger('dev'));
  app.use(cors());

  // setting routes
  app.use('/api/users', userRouter);
  app.use('/api/relations', relationRouter);
  app.use('/api/messages', messageRouter);
  app.all('*', (req: IncomingMessage, res: ServerResponse) => handle(req, res)); // set next.js routes after set all server routes

  const server = app.listen(port, () => {
    console.log(
      '\x1b[42m\x1b[37m',
      'Server is running on port',
      port,
      '\x1b[0m'
    );
  });

  const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
  });

  app.use('/peerjs', peerServer);
});
