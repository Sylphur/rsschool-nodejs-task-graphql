import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  },
});
export { CreatePostInput };