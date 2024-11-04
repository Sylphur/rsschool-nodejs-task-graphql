import { PrismaClient } from "@prisma/client";
import { DataLoaderMapT } from "../../index.js";

export interface IPrismaContext {
  prisma: PrismaClient;
  dataloaders: DataLoaderMapT;
};