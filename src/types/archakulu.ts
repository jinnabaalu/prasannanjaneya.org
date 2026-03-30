export interface Archakulu {
  id: string;
  name: {
    en: string;
    te: string;
  };
  title: {
    en: string;
    te: string;
  };
  bio?: {
    en: string;
    te: string;
  };
  photo?: string;
  order: number;
}
