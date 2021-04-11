// import { addUrlToDatabase } from '../core';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Context } from '../types';

@Resolver()
export default class UrlResolver {
  @Query(() => String)
  shortenURL(
    @Arg('url') url: string,
    @Ctx() { req, core }: Context
  ): Promise<string> {
    return core.addUrlToDatabase(url, req.headers.host ?? '');
  }
}
