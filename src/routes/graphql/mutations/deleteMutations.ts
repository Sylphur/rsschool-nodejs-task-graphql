import { GraphQLBoolean } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

export const deleteMutations = {
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: IPrismaContext) => {
      const { prisma } = context;
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: IPrismaContext) => {
      const { prisma } = context;
      await prisma.profile.delete({
        where: {
          id: id,
        },
      });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: IPrismaContext) => {
      const { prisma } = context;
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    },
  },
};