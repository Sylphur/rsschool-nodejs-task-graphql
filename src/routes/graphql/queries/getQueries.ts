import { GraphQLList, GraphQLResolveInfo, GraphQLType } from 'graphql';
import { postType } from '../types/post.js';
import { userType } from '../types/user.js';
import { profileType } from '../types/profile.js';
import { memberType } from '../types/member.js';
import DataLoader from 'dataloader';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

export const getQueries = {
  memberTypes: {
    type: new GraphQLList(memberType),
    resolve: (_root, _args, context: IPrismaContext) => {
      const { prisma } = context;
      return prisma.memberType.findMany();
    },
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: (_root, _args, context: IPrismaContext) => {
      const { prisma } = context;
      return prisma.post.findMany();
    },
  },
  users: {
    type: new GraphQLList(userType),
    resolve: async (_root, _args, context: IPrismaContext, info: GraphQLResolveInfo) => {
      const { prisma, dataloaders } = context;
      const parsedResolveInfoFragment = parseResolveInfo(info) as ResolveTree;
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment,
        userType as GraphQLType,
      );
      let dl = dataloaders.get('users');
      if (!dl) {
        dl = new DataLoader(async (ids) => {
          const users = await prisma.user.findMany({
            include: {
              subscribedToUser: !!Object.keys(fields).find(
                (key) => key === 'subscribedToUser',
              ),
              userSubscribedTo: !!Object.keys(fields).find(
                (key) => key === 'userSubscribedTo',
              ),
            },
          });
          return ids.map((id) => (id === 'users' ? users : undefined));
        });
        dataloaders.set('users', dl);
      }
      return dl.load('users');
    },
  },
  profiles: {
    type: new GraphQLList(profileType),
    resolve: (_root, _args, context: IPrismaContext) => {
      const { prisma } = context;
      return prisma.profile.findMany();
    },
  },
};