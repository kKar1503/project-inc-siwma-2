import { apiHandler, formatAPIResponse } from '@inc/api/api';
import { chatSchema } from '@inc/api/api/server/zod';
import PrismaClient from '@inc/db';
import { ForbiddenError, InvalidRangeError } from '@inc/errors';

async function getUserChats(userId: string, lastIdPointer: string | undefined, limit: number) {
  // Fetch chats for the user
  const chats = await PrismaClient.rooms.findMany({
    where: {
      OR: [{ seller: userId }, { buyer: userId }],
      id: lastIdPointer
        ? {
            gt: lastIdPointer,
          }
        : undefined,
    },
    select: {
      id: true,
      createdAt: true,
      usersRoomsBuyerTousers: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
          enabled: true,
        },
      },
      usersRoomsSellerTousers: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
          enabled: true,
        },
      },
      listingRoomsListingTolisting: {
        select: {
          id: true,
          name: true,
          price: true,
          unitPrice: true,
          type: true,
          multiple: true,
          offersOffersListingTolistings: {
            select: {
              id: true,
              messages: {
                select: {
                  author: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
    take: limit,
  });

  return chats;
}

export default apiHandler().get(async (req, res) => {
  // Parse and validate user id, lastIdPointer and limit
  const { id: userId, lastIdPointer, limit = 10 } = chatSchema.get.query.parse(req.query);

  // Verify the limit
  if (limit !== undefined) {
    if (limit < 1 || limit > 10) {
      throw new InvalidRangeError('limit');
    }
  }

  // Verify if the user is the one requesting
  if (!req.token || !req.token.user || req.token.user.id !== userId) {
    throw new ForbiddenError();
  }

  // Fetch chats
  const chats = await getUserChats(userId, lastIdPointer, limit);

  // Format chats
  const formattedChats = chats.map((chat) => ({
    id: chat.id,
    seller: {
      id: chat.usersRoomsSellerTousers.id,
      name: chat.usersRoomsSellerTousers.name,
      profilePicture: chat.usersRoomsSellerTousers.profilePicture,
      enabled: chat.usersRoomsSellerTousers.enabled,
    },
    buyer: {
      id: chat.usersRoomsBuyerTousers.id,
      name: chat.usersRoomsBuyerTousers.name,
      profilePicture: chat.usersRoomsBuyerTousers.profilePicture,
      enabled: chat.usersRoomsBuyerTousers.enabled,
    },
    listing: {
      id: chat.listingRoomsListingTolisting.id.toString(),
      name: chat.listingRoomsListingTolisting.name,
      price: chat.listingRoomsListingTolisting.price,
      unitPrice: chat.listingRoomsListingTolisting.unitPrice,
      type: chat.listingRoomsListingTolisting.type,
      // Whether or not the listing is still available for purchase
      open:
        chat.listingRoomsListingTolisting.multiple ||
        chat.listingRoomsListingTolisting.offersOffersListingTolistings.length === 0,
      // Whether or not the user has purchased the listing
      purchased:
        chat.listingRoomsListingTolisting.offersOffersListingTolistings.filter(
          (e) => e.messages[0].author === userId
        ).length > 0,
    },
    createdAt: chat.createdAt.toISOString(),
  }));

  // Return the result
  res.status(200).json(formatAPIResponse(formattedChats));
});
