"use client";

import { useTransition } from "react";
import { Save, User } from "lucide-react";
import ImageUploader from "@/app/components/ImageUploader";
import { upsertProfile } from "@/app/actions/profile";
import { useToast } from "@/app/components/ToastProvider";

interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  educationalBackground: string;
  location: string;
  email: string;
  avatarUrl: string | null;
  github: string;
  linkedin: string;
  googleScholar: string;
  website: string;
}

export default function SettingsClient({
  profile,
}: {
  profile: Profile | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await upsertProfile(formData);
        showToast("Settings saved successfully!", "success");
      } catch (error) {
        showToast("Failed to save settings", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Profile Photo */}
      <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-heading flex items-center gap-2">
          <User className="h-5 w-5" /> Profile Photo
        </h2>
        <ImageUploader
          name="avatarUrl"
          label="Avatar Image"
          defaultValue={profile?.avatarUrl || ""}
        />
      </div>

      {/* Personal Info */}
      <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-heading">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={profile?.name || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">
              Job Title / Role
            </label>
            <input
              id="title"
              name="title"
              defaultValue={profile?.title || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Full Stack Developer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={profile?.email || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              defaultValue={profile?.location || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Jakarta, Indonesia"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="bio">
            Bio / About Me
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            defaultValue={profile?.bio || ""}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            placeholder="Write a short description about yourself..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="educationalBackground">
            Educational Background
          </label>
          <textarea
            id="educationalBackground"
            name="educationalBackground"
            rows={4}
            defaultValue={profile?.educationalBackground || ""}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            placeholder="Write your education history or academic background..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-card border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold font-heading">Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="github">
              GitHub URL
            </label>
            <input
              id="github"
              name="github"
              type="url"
              defaultValue={profile?.github || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="https://github.com/username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="linkedin">
              LinkedIn URL
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              defaultValue={profile?.linkedin || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="googleScholar">
              Google Scholar URL
            </label>
            <input
              id="googleScholar"
              name="googleScholar"
              type="url"
              defaultValue={profile?.googleScholar || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="https://scholar.google.com/citations?user=..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="website">
              Personal Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              defaultValue={profile?.website || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-primary/90 bg-primary text-primary-foreground h-10 px-4 py-2 gap-2 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
