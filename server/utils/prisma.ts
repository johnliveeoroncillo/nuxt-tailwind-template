// server/plugins/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse/node';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withPulse({
    apiKey: process.env?.PULSE_API_KEY ?? '',
  }));
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

let prisma: ReturnType<typeof prismaClientSingleton>;

if (process.server) { // Only run on the server
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
  }
}

export default prisma;