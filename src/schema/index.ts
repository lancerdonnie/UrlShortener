import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const Root = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    shortenURL: {
      type: GraphQLString,
      args: { url: { type: GraphQLString } },
      resolve: (_, { url }) => {
        return url;
      },
    },
  }),
});

export default new GraphQLSchema({
  query: Root,
});
