import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { postType } from './types/post.js';
import { userType } from './types/user.js';
import { profileType } from './types/profile.js';
import { memberType, memberTypeIdENUM } from './types/member.js';

import { CreatePostInput } from './mutations/inputs/createPost.js';
import { CreateProfileInput } from './mutations/inputs/createProfile.js';
import { CreateUserInput } from './mutations/inputs/createUser.js';

import { getByIdQueries } from './queries/getByIdQueries.js';
import { getQueries } from './queries/getQueries.js';

import { postMutations } from './mutations/postMutation.js';
import { deleteMutations } from './mutations/deleteMutations.js';
import { putMutations } from './mutations/putMutation.js';
import { subscribeMutations } from './mutations/subscribeMutation.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const queryBuilder = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...getQueries,
    ...getByIdQueries,
  }),
});

const mutationBuilder = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...postMutations,
    ...deleteMutations,
    ...putMutations,
    ...subscribeMutations
  }),
});

export const schema = new GraphQLSchema({
  query: queryBuilder,
  mutation: mutationBuilder,
  types: [
    memberType,
    postType,
    userType,
    profileType,
    memberTypeIdENUM,
    CreatePostInput,
    CreateProfileInput,
    CreateUserInput,
  ],
});