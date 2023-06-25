interface ICategoriesParameters {
  categoryId: number;
  parameterId: number;
  required?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategoriesParameters: ICategoriesParameters[] = [
  {
    categoryId: 1,
    parameterId: 2,
  },
  {
    categoryId: 3,
    parameterId: 2,
  },
  {
    categoryId: 8,
    parameterId: 2,
  },
  {
    categoryId: 3,
    parameterId: 4,
  },
  {
    categoryId: 1,
    parameterId: 10,
  },
  {
    categoryId: 2,
    parameterId: 2,
  },
  {
    categoryId: 2,
    parameterId: 27,
  },
  {
    categoryId: 2,
    parameterId: 28,
  },
  {
    categoryId: 2,
    parameterId: 29,
  },
  {
    categoryId: 3,
    parameterId: 11,
  },
  {
    categoryId: 4,
    parameterId: 2,
  },
  {
    categoryId: 4,
    parameterId: 12,
  },
  {
    categoryId: 4,
    parameterId: 13,
  },
  {
    categoryId: 4,
    parameterId: 14,
  },
  {
    categoryId: 5,
    parameterId: 2,
  },
  {
    categoryId: 5,
    parameterId: 15,
  },
  {
    categoryId: 5,
    parameterId: 16,
  },
  {
    categoryId: 5,
    parameterId: 17,
  },
  {
    categoryId: 6,
    parameterId: 2,
  },
  {
    categoryId: 6,
    parameterId: 18,
  },
  {
    categoryId: 6,
    parameterId: 19,
  },
  {
    categoryId: 6,
    parameterId: 20,
  },
  {
    categoryId: 7,
    parameterId: 2,
  },
  {
    categoryId: 7,
    parameterId: 4,
  },
  {
    categoryId: 7,
    parameterId: 21,
  },
  {
    categoryId: 8,
    parameterId: 22,
  },
  {
    categoryId: 9,
    parameterId: 23,
  },
  {
    categoryId: 10,
    parameterId: 2,
  },
  {
    categoryId: 10,
    parameterId: 24,
  },
  {
    categoryId: 10,
    parameterId: 25,
  },
  {
    categoryId: 9,
    parameterId: 2,
  },
  {
    categoryId: 2,
    parameterId: 26,
  },
  {
    categoryId: 2,
    parameterId: 31,
  },
  {
    categoryId: 2,
    parameterId: 4,
  },
];

export type { ICategoriesParameters };
export { CategoriesParameters };
