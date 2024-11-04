/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangePostInput } from './inputs/changePosts.js';
import { ChangeUserInput } from './inputs/changeUser.js';
import { ChangeProfileInput } from './inputs/changeProfile.js';

import { postType } from '../types/post.js';
import { userType } from '../types/user.js';
import { profileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

export const putMutations = {
  changePost: {
    type: postType,
    args: {
      dto: {
        type: ChangePostInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.post.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  changeUser: {
    type: userType,
    args: {
      dto: {
        type: ChangeUserInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.user.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  changeProfile: {
    type: profileType,
    args: {
      dto: {
        type: ChangeProfileInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.profile.update({
        where: { id: id },
        data: dto,
      });
    },
  },
};