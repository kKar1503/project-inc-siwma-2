import { apiHandler, formatAPIResponse } from '@inc/api/api';
import { chatSchema } from '@inc/api/api/server/zod';
import PrismaClient from '@inc/db';
import {
  ParamError,
  SameBuyerSellerError,
  NotSellerError,
  SellerNotOwnerError,
  ChatRoomExistsError,
} from '@inc/errors';

export default apiHandler().post(async (req, res) => {
  // Parse and validate the request body
  const parseResult = chatSchema.post.body.parse(req.body);

  const data = parseResult;

  // Ensure the buyer and seller are not the same
  if (data.sellerId === data.buyerId) {
    throw new SameBuyerSellerError();
  }

  // Verify the user is not creating a chat room for their own listing
  const listing = await PrismaClient.listing.findUnique({
    where: { id: data.listingId },
  });

  if (!listing) {
    throw new ParamError('listingId');
  }

  // Ensure the authenticated user is the buyer
  if (!req.token || !req.token.user || data.buyerId !== req.token.user.id) {
    throw new ParamError('buyerId');
  }

  // Ensure the authenticated user is not the seller
  if (req.token?.user.id === data.sellerId) {
    throw new NotSellerError();
  }

  // Ensure the sellerId matches the listing owner
  if (data.sellerId !== listing.owner) {
    throw new SellerNotOwnerError();
  }

  // Check if a chat room with the same buyer and seller already exists
  const existingChat = await PrismaClient.rooms.findFirst({
    where: {
      buyer: data.buyerId,
      seller: data.sellerId,
      listing: data.listingId,
    },
  });

  // If a chat room with the same buyer and seller exists, return an error response
  if (existingChat) {
    throw new ChatRoomExistsError();
  }

  // Insert the data into the database and create a new chat room
  const result = await PrismaClient.rooms.create({
    data: {
      seller: data.sellerId,
      buyer: data.buyerId,
      listing: data.listingId,
    },
  });

  // Return the result
  res.status(201).json(formatAPIResponse({ room: result.id }));
});
