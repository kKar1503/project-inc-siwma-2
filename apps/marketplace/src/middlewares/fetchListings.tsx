import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import apiClient from '@/utils/api/client/apiClient';
import listings from '@/utils/api/client/zod/listings';

const fetchListings = async (lastListingId: number) => {
  const response = await apiClient.get(`/v1/listings?limit=10&lastIdPointer=${lastListingId}`);
  let listingsArr: Array<ProductListingItemProps> = [];

  // parse data through zod to ensure that data is correct
  const listingsData = listings.getAll.parse(response.data.data);

  listingsData.forEach((listing) => {
    const newListingsObj = {
        productId: +listing.id,
        img: listing.coverImage,
        profileImg: listing.owner.profilePic!,
        type: listing.type,
        name: listing.name,
        rating: listing.rating,
        price: listing.price,
        negotiable: listing.negotiable,
        ownerId: listing.owner.id,
        ownerFullName: listing.owner.name,
        createdAt: listing.createdAt,
        companyName: listing.owner.company.name,
        isUnitPrice: listing.unitPrice,
        isOwnProfile: true,
      };

      listingsArr.push(newListingsObj);
  })

  return listingsArr;
};

export default fetchListings;