import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import EventImageCollage from "@/components/events/EventImageCollage";
import { getEvents, getEventBySlug } from "@/lib/events";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "te"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const events = getEvents(locale);
    for (const event of events) {
      params.push({ locale, slug: event.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEventBySlug(locale, slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [event.image] : [],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const event = getEventBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: "events" });

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString(
    locale === "te" ? "te-IN" : "en-IN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="bg-white py-12">
      <Container>
        {/* Back link */}
        <Link
          href={`/${locale}/events`}
          className="mb-8 inline-flex items-center gap-2 text-saffron-600 transition-colors hover:text-saffron-700"
        >
          <ArrowLeft size={18} />
          <span>{t("backToEvents")}</span>
        </Link>

        {/* Title & Date */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-temple-maroon md:text-4xl">
            {event.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-gray-500">
            <Calendar size={18} />
            <time dateTime={event.date}>{formattedDate}</time>
          </div>
        </div>

        {/* Hero image */}
        {event.image && (
          <div className="relative mb-10 h-[300px] overflow-hidden rounded-2xl shadow-lg md:h-[450px]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="mx-auto mb-12 max-w-none text-gray-700">
          {event.content.split("\n\n").map((paragraph, i) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Headings
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-8 text-2xl font-bold text-temple-maroon"
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            // Bold-only line (closing statement)
            if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
              return (
                <p
                  key={i}
                  className="mt-6 text-center text-xl font-bold text-saffron-600"
                >
                  {trimmed.replace(/\*\*/g, "")}
                </p>
              );
            }

            // List block (lines starting with -)
            const lines = trimmed.split("\n");
            if (lines.every((l) => l.trim().startsWith("- "))) {
              return (
                <ul key={i} className="mb-4 space-y-2">
                  {lines.map((line, j) => {
                    const text = line.replace(/^-\s*/, "");
                    return (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-lg leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0">•</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: text.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong class="font-semibold text-temple-maroon">$1</strong>'
                            ),
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // Regular paragraph with bold support
            return (
              <p
                key={i}
                className="mb-4 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: trimmed.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-semibold">$1</strong>'
                  ),
                }}
              />
            );
          })}
        </div>

        {/* YouTube Video */}
        {event.youtube && (
          <div className="my-10">
            <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${event.youtube.includes('v=') ? event.youtube.split('v=')[1].split('&')[0] : event.youtube}`}
                title={event.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Image Collage */}
        {event.images && event.images.length > 0 && (
          <div className="mt-8">
            <EventImageCollage images={event.images} title={event.title} />
          </div>
        )}
      </Container>
    </section>
  );
}
