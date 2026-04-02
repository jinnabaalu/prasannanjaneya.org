import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Event } from "@/types/event";

export function getEvents(locale: string): Event[] {
  const eventsDir = path.join(process.cwd(), "content", locale, "events");

  if (!fs.existsSync(eventsDir)) {
    return [];
  }

  const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(eventsDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(".md", ""),
        title: data.title,
        date: data.date,
        description: data.description,
        image: data.image,
        images: data.images,
        youtube: data.youtube,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventBySlug(locale: string, slug: string): Event | null {
  const eventsDir = path.join(process.cwd(), "content", locale, "events");
  const filePath = path.join(eventsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    image: data.image,
    images: data.images,
    youtube: data.youtube,
    content,
  };
}
