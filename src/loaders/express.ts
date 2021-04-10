import type { Express } from 'express';
import type { IContainer } from 'src/types';
import { json } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UrlResolver } from '../resolvers';

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
  });

  apolloServer.applyMiddleware({ app });

  app.use(container.cradle.UrlController);
};
