export type TCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active: boolean;
  parameters: Array<{
    parameterId: '1';
    required: true;
  }>;
};