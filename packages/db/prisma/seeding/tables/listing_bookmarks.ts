interface IListingBookmarks {
  id?: number;
  user_id: string;
  listing_id: number;
  created_at?: Date;
}

const ListingBookmarks: IListingBookmarks[] = [
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 1,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 2,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 3,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 4,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 5,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 6,
  },
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listing_id: 7,
  },
];

export type { IListingBookmarks };
export { ListingBookmarks };
