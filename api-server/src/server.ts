// import swaggerUi from 'swagger-ui-express';
//import { default as documentSwagger } from "./swagger.json";
import express from 'express';
import routes from './shared/http/routes';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');

const app = express();
const contextPath = '/api/generec';

app.use(express.json());
app.use(cors())
app.use(contextPath, routes);

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  // console.log = function () { }
}
// app.use(`${contextPath}/swagger`, swaggerUi.serve, swaggerUi.setup(documentSwagger));

const port = process.env.BACK_PORT;
const server = `http://${process.env.BACKEND_HOST}:${port}${contextPath}`;

if (cluster.isMaster) {
  console.log('Master process is running');
  const createDB = require('../create_data_base');
  

  // Fork workers
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: any, code: any, signal: any) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {

      app.listen(port, () => {
        console.log();
        console.log();
        console.log();
        console.log('                     🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
        console.log(`                     🚀 Server started on port: ${port} 🚀 `);
        console.log('                     🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
        console.log();
        console.log();

        console.log(`Hello from Node.js - I am the worker ${cluster.worker.id}\n`);
        console.log(server);
      })
  
}