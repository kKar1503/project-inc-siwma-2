interface ICompaniesBookmarks {
  id?: number;
  user_id: string;
  company_id: number;
  created_at?: Date;
}

const CompaniesBookmarks: ICompaniesBookmarks[] = [
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    company_id: 1,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    company_id: 2,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    company_id: 3,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    company_id: 4,
  },
];

export type { ICompaniesBookmarks };
export { CompaniesBookmarks };
