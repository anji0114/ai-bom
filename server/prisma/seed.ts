import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const userId = process.env.SEED_USER_ID;
  const userEmail = process.env.SEED_USER_EMAIL;

  if (!userId || !userEmail) {
    throw new Error('SEED_USER_ID and SEED_USER_EMAIL must be set in .env');
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) {
    console.log(`User already exists: ${existingUser.email}`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      id: userId,
      email: userEmail,
    },
  });

  console.log(`Created user: ${user.email} with id: ${user.id}`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
