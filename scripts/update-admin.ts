import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("syahrul123", 10)

  // Delete old admin if exists
  await prisma.admin.deleteMany({
    where: { username: "admin" }
  })

  // Create or update admin with new credentials
  await prisma.admin.upsert({
    where: { username: "syahrul" },
    update: {
      password: hashedPassword,
    },
    create: {
      username: "syahrul",
      password: hashedPassword,
    },
  })

  console.log("✅ Admin credentials updated successfully!")
  console.log("Username: syahrul")
  console.log("Password: syahrul123")
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
