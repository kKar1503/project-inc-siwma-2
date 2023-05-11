interface ICompaniesBookmarks {
  id?: number;
  userId: string;
  companyId: number;
  createdAt?: Date;
}

const CompaniesBookmarks: ICompaniesBookmarks[] = [
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    companyId: 1,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    companyId: 2,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    companyId: 3,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    companyId: 4,
  },
];

export type { ICompaniesBookmarks };
export { CompaniesBookmarks };
