import { PrismaClient } from "@prisma/client/extension";

const globalForprisma=globalThis as unknown as {
    prisma :PrismaClient | undefined ;
};

export const prisma=
globalForprisma.prisma ??
new PrismaClient({
    log:["error"],
});

if(process.env.NODE_ENV!=="production"){
    globalForprisma.prisma=prisma;
}