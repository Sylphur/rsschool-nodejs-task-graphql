import { GraphQLNonNull } from 'graphql';
import { postType } from '../types/post.js';
import { userType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { profileType } from '../types/profile.js';
import { memberType, memberTypeIdENUM } from '../types/member.js';
import { MyContext } from '../index.js';

export const getByIdQueries = {
  memberType: {
    type: memberType,
    args: {
      id: {
        type: new GraphQLNonNull(memberTypeIdENUM),
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.memberType.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  post: {
    type: postType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.post.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  profile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.profile.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
};