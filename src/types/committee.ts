export interface CommitteeMember {
  id: string;
  name: {
    en: string;
    te: string;
  };
  role: {
    en: string;
    te: string;
  };
  photo?: string;
  order: number;
}
