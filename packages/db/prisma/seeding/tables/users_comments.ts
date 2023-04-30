interface IUsersComments {
  id?: number;
  user_id: string;
  comments?: string;
  created_at?: Date;
}

const UsersComments: IUsersComments[] = [
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    comments: 'Great place to buy metals online, trustworthy website!',
  },
  {
    user_id: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    comments: 'Excellent customer service, transaction was smooth overall',
  },
  {
    user_id: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    user_id: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    comments: 'You can find whatever you want or need easily.',
  },
  {
    user_id: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    comments:
      'Never had problems with sellers or buyers on that page all went successfuly until today.',
  },
  {
    user_id: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    comments: 'Smooth deals, I recommed this app',
  },
];

export type { IUsersComments };
export { UsersComments };
