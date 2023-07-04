interface IListingImages {
  id?: number;
  listingId: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  order: number;
}

const ListingImages: IListingImages[] = [];

export type { IListingImages };
export { ListingImages };
