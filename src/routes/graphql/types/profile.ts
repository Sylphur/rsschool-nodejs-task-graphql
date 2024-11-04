/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { UUIDType } from './uuid.js';
import { memberType, memberTypeIdENUM } from './member.js';
import DataLoader from 'dataloader';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

const profileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: memberTypeIdENUM,
    },
    memberType: {
      type: memberType,
      resolve: async (root, _args, context: IPrismaContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const memberTypesAr = await prisma.memberType.findMany();
            return ids.map((id) => memberTypesAr.find((member) => member.id === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }
        return dl.load(root.memberTypeId as string);
      },
    },
  }),
});

export { profileType };