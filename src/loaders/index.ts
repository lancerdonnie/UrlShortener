import type { Express } from 'express';
import type { IContainer } from 'src/types';
import expressLoader from './express';
import { createConn } from './createConn';

export default async ({
  app,
  container,
}: {
  app: Express;
  container: IContainer;
}) => {
  expressLoader({ app, container });
  await createConn();
  return app;
};
