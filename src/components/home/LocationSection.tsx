import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin } from "lucide-react";

export default function LocationSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading title={t("locationTitle")} />
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-center gap-2 text-center text-lg text-gray-700">
            <MapPin size={24} className="shrink-0 text-saffron-500" />
            <p>
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
              <br />
              {t("addressLine3")}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Sri+Prassananjaneya+Swamy+Devalayam+Narsingi+Papannapet+Medak+Telangana&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Prassananjaneya Swamy Devalayam Location"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://maps.app.goo.gl/2CY7ccSafhzgKZgp9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-saffron-500 px-6 py-3 font-medium text-white transition-colors hover:bg-saffron-600"
            >
              <MapPin size={18} />
              {t("openInMaps")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
