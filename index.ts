import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
    // cleanup old data
    await prisma.a.deleteMany();
    await prisma.b.deleteMany();
    // create one parent
    await prisma.a.create({
        data: {
            id: 1
        }
    });
    // create 100k children
    await prisma.$executeRaw`
        INSERT INTO "B" (id)
        SELECT generate_series(1, 100000);
    `;
    // connect 100k children to parent
    await prisma.$executeRaw`
        INSERT INTO "_AToB" ("A", "B")
        SELECT 1, generate_series(1, 100000);
    `;

    // this throws the following error:
    /*
     await prisma.a.findUnique(
Assertion violation on the database: `too many bind variables in prepared statement, expected maximum of 32767, received 32770`
    at Rn.handleRequestError (node_modules/@prisma/client/runtime/library.js:174:7325)
    at Rn.handleAndLogRequestError (node_modules/@prisma/client/runtime/library.js:174:6754)
    at Rn.request (node_modules/@prisma/client/runtime/library.js:174:6344) {
  code: 'P2035',
  clientVersion: '4.16.0',
  meta: {
    database_error: 'too many bind variables in prepared statement, expected maximum of 32767, received 32770'
  }
}
     */
    await prisma.a.findUnique({
        where: {
            id: 1
        },
        include: {
            B: {
                where: {
                    id: {
                        in: [1,2,3]
                    }
                }
            }
        }
    });
}

main().catch((e) => {
    console.error(e);
})