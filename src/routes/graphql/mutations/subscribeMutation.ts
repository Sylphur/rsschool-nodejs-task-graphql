/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UUIDType } from '../types/uuid.js';
import { GraphQLBoolean, GraphQLString } from 'graphql';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

export const subscribeMutations = {
  subscribeTo: {
    type: GraphQLString,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { userId, authorId }, context: IPrismaContext) => {
      const { prisma } = context;
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: authorId,
            },
          },
        },
      });
      return "Success!"
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { userId, authorId }, context: IPrismaContext) => {
      const { prisma } = context;
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });
    },
  },
};