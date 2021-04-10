import { addUrlToDatabase } from '../services/Url.service';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Context } from '../types';
// import { UserInputError } from 'apollo-server-express';

@Resolver()
export default class UrlResolver {
  @Query(() => String)
  shortenURL(
    @Arg('url') url: string,
    @Ctx() { req }: Context
  ): Promise<string> {
    return Promise.resolve(addUrlToDatabase(url, req.headers.host ?? ''));
  }
}
