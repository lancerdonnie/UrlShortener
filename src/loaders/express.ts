import type { Express } from 'express';
import type { IContainer } from '../types';
import { json } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UrlResolver } from '../resolvers';
import { GRAPHQL_PATH } from '../Constants';

export default async ({
  app,
  container,
}: {
  app: Express;
  container: IContainer;
}) => {
  app.use(json());
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UrlResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      repo: container.cradle.repo,
      core: container.cradle.core,
    }),
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

  app.use(container.cradle.UrlController);
};
