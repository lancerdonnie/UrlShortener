import type { IContainer } from './types';
import express from 'express';
import 'reflect-metadata';
import loadApp from './loaders';

const makeApp = async ({ container }: { container: IContainer }) => {
  const app = express();
  await loadApp({ app, container });
  return app;
};

export default makeApp;
