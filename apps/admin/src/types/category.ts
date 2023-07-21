export type TCategory = {
  image: string;
  description: string;
  active: boolean;
  id: string;
  name: string;
  crossSectionImage: string;
  parameters?: { parameterId: string; required: boolean }[] | undefined;
};
