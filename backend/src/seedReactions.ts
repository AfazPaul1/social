import { PrismaClient, ReactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Fetch existing data
  const posts = await prisma.post.findMany({ select: { id: true } });
  const users = await prisma.user.findMany({ select: { id: true } });
  
  const reactionTypes = Object.values(ReactionType);

  // 2. Generate reaction data
  const data = posts.flatMap((post) => {
    // Pick 30 random users for each post to ensure variety
    const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 30);
    
    return randomUsers.map((user) => ({
      postId: post.id,
      userId: user.id,
      type: reactionTypes[Math.floor(Math.random() * reactionTypes.length)],
    }));
  });

  // 3. Bulk insert with skipDuplicates to respect the composite primary key
  const result = await prisma.reaction.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`${result.count} reactions created.`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());