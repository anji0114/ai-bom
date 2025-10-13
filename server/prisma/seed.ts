import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const main = async () => {
  const userId = process.env.SEED_USER_ID;
  const userEmail = process.env.SEED_USER_EMAIL;
  const uuid = uuidv4();

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

  const tenant = await prisma.tenant.create({
    data: {
      id: uuid,
      name: '株式会社AI-BOM',
    },
  });

  if (!tenant) {
    throw new Error('Tenant not found');
  }

  const user = await prisma.user.create({
    data: {
      id: userId,
      tenantId: tenant.id,
      name: '田中 杏直',
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
