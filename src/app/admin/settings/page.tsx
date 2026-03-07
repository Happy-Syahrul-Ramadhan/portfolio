import { prisma } from "@/lib/prisma"
import SettingsClient from "./SettingsClient"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } })

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-heading">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Update your public profile. Changes will reflect on the Home page.
        </p>
      </div>

      <SettingsClient profile={profile} />
    </div>
  )
}
