import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const memberTypeIdENUM = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    business: { value: 'BUSINESS' },
    basic: { value: 'BASIC' },
  },
});

const memberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

export { memberType, memberTypeIdENUM };