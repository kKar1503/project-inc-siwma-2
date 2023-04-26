interface ICategoriesParameters {
  category_id: number;
  parameter_id: number;
  required?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const CategoriesParameters: ICategoriesParameters[] = [
  {
    category_id: 1,
    parameter_id: 2,
  },
  {
    category_id: 3,
    parameter_id: 2,
  },
  {
    category_id: 8,
    parameter_id: 2,
  },
  {
    category_id: 3,
    parameter_id: 4,
  },
  {
    category_id: 1,
    parameter_id: 10,
  },
  {
    category_id: 2,
    parameter_id: 2,
  },
  {
    category_id: 2,
    parameter_id: 27,
  },
  {
    category_id: 2,
    parameter_id: 28,
  },
  {
    category_id: 2,
    parameter_id: 29,
  },
  {
    category_id: 3,
    parameter_id: 11,
  },
  {
    category_id: 4,
    parameter_id: 2,
  },
  {
    category_id: 4,
    parameter_id: 12,
  },
  {
    category_id: 4,
    parameter_id: 13,
  },
  {
    category_id: 4,
    parameter_id: 14,
  },
  {
    category_id: 5,
    parameter_id: 2,
  },
  {
    category_id: 5,
    parameter_id: 15,
  },
  {
    category_id: 5,
    parameter_id: 16,
  },
  {
    category_id: 5,
    parameter_id: 17,
  },
  {
    category_id: 6,
    parameter_id: 2,
  },
  {
    category_id: 6,
    parameter_id: 18,
  },
  {
    category_id: 6,
    parameter_id: 19,
  },
  {
    category_id: 6,
    parameter_id: 20,
  },
  {
    category_id: 7,
    parameter_id: 2,
  },
  {
    category_id: 7,
    parameter_id: 4,
  },
  {
    category_id: 7,
    parameter_id: 21,
  },
  {
    category_id: 8,
    parameter_id: 22,
  },
  {
    category_id: 9,
    parameter_id: 23,
  },
  {
    category_id: 10,
    parameter_id: 2,
  },
  {
    category_id: 10,
    parameter_id: 24,
  },
  {
    category_id: 10,
    parameter_id: 25,
  },
  {
    category_id: 9,
    parameter_id: 2,
  },
  {
    category_id: 2,
    parameter_id: 26,
  },
  {
    category_id: 2,
    parameter_id: 31,
  },
  {
    category_id: 2,
    parameter_id: 4,
  },
];

export type { ICategoriesParameters };
export { CategoriesParameters };
