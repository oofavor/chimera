import express from 'express';
import logger from 'morgan';
import next from 'next';
import cors from 'cors';
import exampleRouter from './src/routes/example';
import { config } from 'dotenv';
config();

const app = express();
const dev = process.env.NODE_ENV !== 'production';

// next.js app
const nextApp = next({ dev, dir: '../' });
const handle = nextApp.getRequestHandler();
await nextApp.prepare();

const port = process.env.PORT || 3000;

// setting middleware
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

// setting routes
app.use('/api/example', exampleRouter);
app.all('*', (req, res) => handle(req, res)); // set next.js routes after set all server routes

const server = app.listen(port, () => {
  console.log('\x1b[42m\x1b[37m', 'Server is running on port', port, '\x1b[0m');
});

server.on('close', () => {
  console.log('\x1b[43m\x1b[37m', 'Closing server...', '\x1b[0m');
});
