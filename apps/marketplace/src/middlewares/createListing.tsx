import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';
import { ImageProps } from '@/components/marketplace/createListing/ImageUploadForm';
import { ParameterFormProps } from '@/components/marketplace/createListing/ParameterForm';
import { ListingTypeProps } from '@/components/marketplace/createListing/ListingTypeForm';

export interface CreateListingProps {
  name: string;
  description: string;
  price: number;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: number;
  type: ListingTypeProps;
  images?: ImageProps[];
  coverImage?: null;
  parameters?: ParameterFormProps[];
}

// backend not confirmed yet, backend stuff still in progress...
const createListing = async (listing: CreateListingProps | undefined) => {
  const parsedListing = listings.create.parse(listing);
  const response = await apiClient.post('/v1/listings', parsedListing);

  return response;
};

export default createListing;
