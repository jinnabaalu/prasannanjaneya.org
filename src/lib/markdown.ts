import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMarkdownContent(filePath: string) {
  const fullPath = path.join(/* turbopackIgnore: true */ process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}
