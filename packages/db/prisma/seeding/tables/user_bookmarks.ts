interface IUserBookmarks {
  id?: number;
  userId: string;
  targetUser: string;
  createdAt?: Date;
}

const UserBookmarks: IUserBookmarks[] = [
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    targetUser: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
];

export type { IUserBookmarks };
export { UserBookmarks };
