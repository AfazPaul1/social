import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUsers() {
  // 1. Generate the hash exactly like your register API [1]
  const password = "password123";
  const hash = await bcrypt.hash(password, 10);

  // 2. Prepare the user data based on your User model [2]
  const userData = Array.from({ length: 50 }).map((_, i) => ({
    email: `test_user_${i}@example.com`,
    name: `User ${i}`,
    password: hash, 
  }));

  // 3. Bulk insert for efficiency
  const result = await prisma.user.createMany({
    data: userData,
    skipDuplicates: true, // Prevents errors if unique emails already exist
  });

  console.log(`${result.count} users registered successfully.`);
}

seedUsers()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());