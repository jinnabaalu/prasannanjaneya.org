import { useTranslations } from "next-intl";
import { PlayCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import type { YouTubeVideo } from "@/types/gallery";

interface YouTubeSectionProps {
  videos: YouTubeVideo[];
  channelUrl: string;
}

export default function YouTubeSection({
  videos,
  channelUrl,
}: YouTubeSectionProps) {
  const t = useTranslations("gallery");

  return (
    <div>
      {videos.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
              />
              <p className="mt-2 font-medium text-temple-maroon">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button href={channelUrl} variant="outline">
          <PlayCircle size={20} className="mr-2" />
          {t("visitChannel")}
        </Button>
      </div>
    </div>
  );
}
