import { PrismaClient } from "@prisma/client";
import { DataLoaderMapT } from "../../index.js";

export type IPrismaContext = {
  prisma: PrismaClient;
  dataloaders: DataLoaderMapT;
};