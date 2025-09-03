import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  try {
    const slug = `cli-test-${Date.now()}`;
    const r = await prisma.restaurant.create({
      data: {
        name: "CLI Test Restaurant",
        slug,
        defaultLocale: "en",
        description: "Created by test script",
      },
    });
    console.log("CREATED_RESTAURANT", r.id, r.slug);
  } catch (e) {
    console.error("CREATE_ERROR", e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
