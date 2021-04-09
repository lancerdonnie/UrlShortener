import expressLoader from './express';
import { createConn } from './createConn';

export default async ({ app }: any) => {
  expressLoader({ app });
  await createConn();
  return app;
};
