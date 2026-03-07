import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" }
  })

  if (existingAdmin) {
    console.log("Admin user already exists!")
    return
  }

  const hashedPassword = await bcrypt.hash("admin123", 10)

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  })

  console.log("Default admin created successfully.")
  console.log("Username: admin")
  console.log("Password: admin123")
  console.log("Please change these credentials in a real environment!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
