// TODO: To be re-implemented with when pusher is implemented
// import { apiHandler, formatAPIResponse, formatMessageResponse } from '@/utils/api';
// import { chatSchema } from '@/utils/api/server/zod';
// import PrismaClient from '@inc/db';
// import { ForbiddenError, InvalidRangeError } from '@inc/errors';
//
// async function getUserChats(userId: string, lastIdPointer: string | undefined, limit: number) {
//   // Fetch chats for the user
//   const chats = await PrismaClient.rooms.findMany({
//     where: {
//       OR: [{ seller: userId }, { buyer: userId }],
//       id: lastIdPointer
//         ? {
//             gt: lastIdPointer,
//           }
//         : undefined,
//     },
//     select: {
//       id: true,
//       createdAt: true,
//       usersRoomsBuyerTousers: {
//         select: {
//           id: true,
//           name: true,
//           profilePicture: true,
//           enabled: true,
//         },
//       },
//       usersRoomsSellerTousers: {
//         select: {
//           id: true,
//           name: true,
//           profilePicture: true,
//           enabled: true,
//         },
//       },
//       listingRoomsListingTolisting: {
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           unitPrice: true,
//           type: true,
//           multiple: true,
//           offersOffersListingTolistings: {
//             select: {
//               id: true,
//               messages: {
//                 select: {
//                   author: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       messages: {
//         orderBy: {
//           createdAt: 'desc',
//         },
//         take: 1,
//       },
//     },
//     orderBy: {
//       id: 'asc',
//     },
//     take: limit,
//   });
//
//   return chats;
// }
//
// // Fetch the number of unread messages
// async function fetchUreadMessages(chats: Awaited<ReturnType<typeof getUserChats>>, userId: string) {
//   const result = await PrismaClient.$transaction(
//     chats.map((chat) =>
//       PrismaClient.messages.count({
//         where: {
//           room: chat.id,
//           author: {
//             not: userId,
//           },
//           read: false,
//         },
//       })
//     )
//   );
//
//   return result;
// }
//
// export default apiHandler().get(async (req, res) => {
//   // Parse and validate user id, lastIdPointer and limit
//   const { id: userId, lastIdPointer, limit = 10 } = chatSchema.get.query.parse(req.query);
//
//   // Verify the limit
//   if (limit !== undefined) {
//     if (limit < 1 || limit > 10) {
//       throw new InvalidRangeError('limit');
//     }
//   }
//
//   // Verify if the user is the one requesting
//   if (!req.token || !req.token.user || req.token.user.id !== userId) {
//     throw new ForbiddenError();
//   }
//
//   // Fetch chats
//   const chats = await getUserChats(userId, lastIdPointer, limit);
//
//   // Fetch unread messages
//   const unreadMessageCount = await fetchUreadMessages(chats, userId);
//
//   // Format chats
//   const formattedChats = chats.map((chat, index) => ({
//     id: chat.id,
//     seller: {
//       id: chat.usersRoomsSellerTousers.id,
//       name: chat.usersRoomsSellerTousers.name,
//       profilePicture: chat.usersRoomsSellerTousers.profilePicture,
//       enabled: chat.usersRoomsSellerTousers.enabled,
//     },
//     buyer: {
//       id: chat.usersRoomsBuyerTousers.id,
//       name: chat.usersRoomsBuyerTousers.name,
//       profilePicture: chat.usersRoomsBuyerTousers.profilePicture,
//       enabled: chat.usersRoomsBuyerTousers.enabled,
//     },
//     listing: {
//       id: chat.listingRoomsListingTolisting.id.toString(),
//       name: chat.listingRoomsListingTolisting.name,
//       price: chat.listingRoomsListingTolisting.price.toNumber(),
//       unitPrice: chat.listingRoomsListingTolisting.unitPrice,
//       type: chat.listingRoomsListingTolisting.type,
//       // Whether or not the listing is still available for purchase
//       open:
//         chat.listingRoomsListingTolisting.multiple ||
//         chat.listingRoomsListingTolisting.offersOffersListingTolistings.length === 0,
//       // Whether or not the user has purchased the listing
//       purchased:
//         chat.listingRoomsListingTolisting.offersOffersListingTolistings.filter(
//           (e) => e.messages[0].author === userId
//         ).length > 0,
//     },
//     latestMessage: chat.messages.length > 0 ? formatMessageResponse(chat.messages[0]) : null,
//     unreadMessagesCount: unreadMessageCount[index],
//     createdAt: chat.createdAt.toISOString(),
//   }));
//
//   // Sort the chats by the latest message
//   formattedChats.sort((a, b) => {
//     if (a.latestMessage && b.latestMessage) {
//       return (
//         new Date(b.latestMessage.createdAt).getTime() -
//         new Date(a.latestMessage.createdAt).getTime()
//       );
//     }
//     if (a.latestMessage) {
//       return -1;
//     }
//     if (b.latestMessage) {
//       return 1;
//     }
//     return 0;
//   });
//
//   // Return the result
//   res.status(200).json(formatAPIResponse(formattedChats));
// });
