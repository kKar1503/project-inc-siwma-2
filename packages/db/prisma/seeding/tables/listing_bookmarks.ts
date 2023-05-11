interface IListingBookmarks {
  id?: number;
  userId: string;
  listingId: number;
  createdAt?: Date;
}

const ListingBookmarks: IListingBookmarks[] = [
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 1,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 2,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 3,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 4,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 5,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 6,
  },
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingId: 7,
  },
];

export type { IListingBookmarks };
export { ListingBookmarks };
