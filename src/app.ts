import express from 'express';
import 'reflect-metadata';
import loadApp from './loaders';

const app = express();

(async () => {
  await loadApp({ app });
})();

export default app;
