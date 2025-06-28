// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // 1. Create 2 Users
  const user1 = await prisma.User.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'Bob',
    },
  });

  console.log(`Created users: ${user1.name} (ID: ${user1.id}) and ${user2.name} (ID: ${user2.id})`);

  const userIds = [user1.id, user2.id];

  // 2. Fetch all existing Posts
  const posts = await prisma.post.findMany();
  console.log(`Found ${posts.length} existing posts.`);

  // 3. Randomly assign each post to one of the two users
  const updates = posts.map(post => {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)]; // Randomly pick user1 or user2
    return prisma.post.update({
      where: { id: post.id },
      data: { userId: randomUserId },
    });
  });

  await prisma.$transaction(updates); // Run all updates in a single transaction
  console.log('Successfully assigned existing posts to users.');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed.');
  });
