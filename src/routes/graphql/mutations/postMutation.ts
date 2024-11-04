/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreatePostInput } from './inputs/createPost.js';
import { CreateProfileInput } from './inputs/createProfile.js';
import { CreateUserInput } from './inputs/createUser.js';

import { postType } from '../types/post.js';
import { userType } from '../types/user.js';
import { profileType } from '../types/profile.js';
import { IPrismaContext } from '../interfaces/prisma/prismaContext.js';

export const postMutations = {
  createPost: {
    type: postType,
    args: {
      dto: {
        type: CreatePostInput,
      },
    },
    resolve: async (_root, { dto }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.post.create({
        data: dto,
      });
    },
  },
  createUser: {
    type: userType,
    args: {
      dto: {
        type: CreateUserInput,
      },
    },
    resolve: async (_root, { dto }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.user.create({
        data: dto,
      });
    },
  },
  createProfile: {
    type: profileType,
    args: {
      dto: {
        type: CreateProfileInput,
      },
    },
    resolve: async (_root, { dto }, context: IPrismaContext) => {
      const { prisma } = context;
      return await prisma.profile.create({
        data: dto,
      });
    },
  },
};