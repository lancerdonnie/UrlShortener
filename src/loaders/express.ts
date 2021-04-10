import type { Request, Response } from 'express';
import { json } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
// import schema from '../schema';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UrlResolver } from '../resolvers';
import { getUrl } from '../services';

export default async ({ app }: any) => {
  app.use(json());
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UrlResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.get('/*', async (req: Request, res: Response) => {
    const shortId = req.params[0];
    try {
      const url = await getUrl(shortId);
      return res.redirect(302, 'http://' + url!.url);
    } catch (_) {
      return res.send('No url found');
    }
  });
};
