import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { FieldNode, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import DataLoader from 'dataloader';

type MapKeyT = string | readonly FieldNode[];

export type DataLoaderMapT = Map<MapKeyT, DataLoader<string, unknown, string>>;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;
      const vars = req.body.variables;
      const validateErrors = validate(schema, parse(source), [depthLimit(5)]);
      if (validateErrors?.length) return { errors: validateErrors };
      const response = await graphql({
        schema,
        source,
        variableValues: vars,
        contextValue: {
          prisma,
          dataloaders: new Map<MapKeyT, DataLoader<string, unknown>>(),
        },
      });
       return { data: response.data, errors: response.errors };
    },
  });
};

export default plugin;
