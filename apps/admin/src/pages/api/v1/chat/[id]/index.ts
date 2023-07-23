import { apiHandler, formatAPIResponse, formatMessageResponse } from '@/utils/api';
import { ChatRoom } from '@/utils/api/client/zod/chat';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';

function parseChatId($uuid: string) {
  // Check if $uuid is defined
  if (!$uuid) {
    throw new NotFoundError('chat room');
  }

  // Validate the provided UUID
  if (
    !$uuid.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    )
  ) {
    throw new NotFoundError('chat room');
  }

  return $uuid;
}

export async function checkChatExists(chatId: string) {
  // Check if the chat exists
  const chat = await PrismaClient.rooms.findUnique({
    where: {
      id: chatId,
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
          listingItem: {
            select: {
              name: true,
              unit: true,
            },
          },
          id: true,
          price: true,
          type: true,
          quantity: true,
          offers: {
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
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('chat room');
  }

  return chat;
}

// Fetch the number of unread messages
async function fetchUreadMessages(
  chat: Awaited<ReturnType<typeof checkChatExists>>,
  userId: string
) {
  const result = await PrismaClient.messages.count({
    where: {
      room: chat.id,
      author: {
        not: userId,
      },
      read: false,
    },
  });

  return result;
}

export default apiHandler().get(async (req, res) => {
  // Retrieve chatroom details for a specific chat
  // Parse and validate chat id provided
  const id = parseChatId(req.query.id as string);

  // Check if the chat exists
  const chat = await checkChatExists(id);

  // Verify if the user is a participant of the chat room
  if (
    !req.token ||
    !req.token.user ||
    (req.token.user.id !== chat.usersRoomsBuyerTousers.id &&
      req.token.user.id !== chat.usersRoomsSellerTousers.id)
  ) {
    throw new NotFoundError('chat room');
  }

  // Format chats
  const formattedResponse: ChatRoom = {
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
      name: chat.listingRoomsListingTolisting.listingItem.name,
      price: chat.listingRoomsListingTolisting.price.toNumber(),
      unit: chat.listingRoomsListingTolisting.listingItem.unit,
      type: chat.listingRoomsListingTolisting.type,
      // Whether or not the listing is still available for purchase
      open: chat.listingRoomsListingTolisting.quantity.toNumber() > 0,
      // Whether or not the user has purchased the listing
      purchased:
        chat.listingRoomsListingTolisting.offers.filter(
          (e) => e.messages[0].author === req.token?.user.id
        ).length > 0,
    },
    latestMessage: chat.messages.length > 0 ? formatMessageResponse(chat.messages[0]) : null,
    unreadMessagesCount: await fetchUreadMessages(chat, req.token.user.id),
    createdAt: chat.createdAt.toISOString(),
  };

  // Return the result
  res.status(200).json(formatAPIResponse(formattedResponse));
});
