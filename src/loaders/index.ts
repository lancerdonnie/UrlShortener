import type { Express } from 'express';
import type { IContainer } from 'src/types';
import expressLoader from './express';

export default async ({
  app,
  container,
}: {
  app: Express;
  container: IContainer;
}) => {
  expressLoader({ app, container });
  await container.cradle.createConn();
  return app;
};
