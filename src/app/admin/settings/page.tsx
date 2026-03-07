import { prisma } from "@/lib/prisma"
import { upsertProfile } from "@/app/actions/profile"
import ImageUploader from "@/app/components/ImageUploader"
import { Save, User } from "lucide-react"

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

      <form action={upsertProfile} className="flex flex-col gap-6">
        {/* Profile Photo */}
        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
            <User className="h-5 w-5" /> Profile Photo
          </h2>
          <ImageUploader name="avatarUrl" label="Avatar Image" defaultValue={profile?.avatarUrl || ""} />
        </div>

        {/* Personal Info */}
        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold font-heading">Personal Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Full Name</label>
              <input id="name" name="name" defaultValue={profile?.name || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">Job Title / Role</label>
              <input id="title" name="title" defaultValue={profile?.title || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Full Stack Developer" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" defaultValue={profile?.email || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="location">Location</label>
              <input id="location" name="location" defaultValue={profile?.location || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Jakarta, Indonesia" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="bio">Bio / About Me</label>
            <textarea id="bio" name="bio" rows={5} defaultValue={profile?.bio || ""}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="Write a short description about yourself..." />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold font-heading">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="github">GitHub URL</label>
              <input id="github" name="github" type="url" defaultValue={profile?.github || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="https://github.com/username" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="linkedin">LinkedIn URL</label>
              <input id="linkedin" name="linkedin" type="url" defaultValue={profile?.linkedin || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="twitter">Twitter / X URL</label>
              <input id="twitter" name="twitter" type="url" defaultValue={profile?.twitter || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="https://twitter.com/username" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="website">Personal Website</label>
              <input id="website" name="website" type="url" defaultValue={profile?.website || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="https://yourwebsite.com" />
            </div>
          </div>
        </div>

        <button type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-6 self-start">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </form>
    </div>
  )
}
