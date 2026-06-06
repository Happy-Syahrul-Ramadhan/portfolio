import { prisma } from "@/lib/prisma";
import { Briefcase } from "lucide-react";
import ExperienceList from "./ExperienceList";

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await prisma.workExperience.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-8 mt-12 mb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading flex items-center gap-3">
          <Briefcase className="h-8 w-8" /> Work Experience
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          My professional journey and career history.
        </p>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
