import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { profileType } from './profile.js';
import { postType } from './post.js';
import { MyContext, UserPrismaT } from '../index.js';
import DataLoader from 'dataloader';

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: profileType,
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const profilesAr = await prisma.profile.findMany();
            return ids.map((id) => profilesAr.find((profile) => profile.userId === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }
        return dl.load(root.id as string);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const postsAr = await prisma.post.findMany();
            return ids.map((id) => postsAr.filter((post) => post.authorId === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }
        return dl.load(root.id as string);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        const dl = dataloaders.get('users');
        if (!dl)
          return prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: root.id,
                },
              },
            },
          });
        const users = (await dl?.load('users')) as UserPrismaT[];
        const user = users.find((u) => u.id === root.id);
        return user!.userSubscribedTo;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        const dl = dataloaders.get('users');
        if (!dl)
          return prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: root.id,
                },
              },
            },
          });
        const users = (await dl?.load('users')) as UserPrismaT[];
        const user = users.find((u) => u.id === root.id);
        return user!.subscribedToUser;
      },
    },
  }),
});

export { userType };