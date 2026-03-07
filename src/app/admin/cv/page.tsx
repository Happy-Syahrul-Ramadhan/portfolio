import { prisma } from "@/lib/prisma"
import CVClient from "./CVClient"

export const dynamic = "force-dynamic"

export default async function CVPage() {
  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } })

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-heading">CV Management</h1>
        <p className="text-muted-foreground mt-2">
          Upload and update your CV. The new CV will replace the existing one.
        </p>
      </div>

      <CVClient cvUrl={profile?.cvUrl || null} />
    </div>
  )
}
