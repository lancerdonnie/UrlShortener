import type { IContainer } from './types';
import express from 'express';
import 'reflect-metadata';
import loadApp from './loaders';

const makeApp = ({ container }: { container: IContainer }) => {
  const app = express();
  (async () => {
    await loadApp({ app, container });
  })();
  return app;
};

export default makeApp;
