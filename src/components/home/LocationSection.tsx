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
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-lg text-gray-700">
            <MapPin size={24} className="text-saffron-500" />
            <p>
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
              <br />
              {t("addressLine3")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
