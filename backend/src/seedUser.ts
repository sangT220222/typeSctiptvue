import { prisma } from "./db.js";

async function main() {
  const base_user = await prisma.user.create({
    data: { email: "test@yahoo.com" },
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
