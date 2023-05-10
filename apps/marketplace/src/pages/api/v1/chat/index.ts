import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { NotFoundError, ParamError, AuthError } from '@inc/errors';

// -- Type definitions -- //
export type ChatResponse = {
  id: number;
  author: string;
  room: string;
  read: boolean;
  createdAt: Date;
  contentType: string;
  offer: number;
  content: string;
};

// -- Helper functions -- //
export function formatChatResponse(chatData: any) {
  return formatAPIResponse(chatData);
}

/**
 * Zod schema for the POST request body
 */
export const chatRequestBody = z.object({
  sellerId: z.string().refine((value) => value.trim() !== '', {
    message: 'invalid seller id',
  }),
  buyerId: z.string().refine((value) => value.trim() !== '', {
    message: 'invalid buyer id',
  }),
  listingId: z.number().refine((value) => !Number.isNaN(value), {
    message: 'invalid listing id',
  }),
});

export default apiHandler().post(async (req, res) => {
  // Parse and validate the request body
  const parseResult = chatRequestBody.safeParse(req.body);

  if (!parseResult.success) {
    const error = parseResult.error.issues[0];
    const paramName = error.path[0] ? error.path[0].toString() : 'Unknown';
    const detail = error.message || 'Invalid Unknown supplied';

    const customError = new ParamError(paramName);
    customError.message = detail;
    customError.status = ParamError.status;
    customError.code = ParamError.code;
    throw customError;
  }

  const data = parseResult.data;

  if (data.sellerId === data.buyerId) {
    throw new ParamError('buyerId and sellerId');
  }

  // Verify the user is not creating a chat room for their own listing
  const listing = await PrismaClient.listing.findUnique({
    where: { id: data.listingId },
  });

  if (!listing) {
    throw new NotFoundError('Listing');
  }

  if (!req.token || !req.token.user) {
    throw new AuthError();
  }

  // Ensure the authenticated user is the buyer
  if (data.buyerId !== req.token.user.id) {
    throw new ParamError('buyerId');
  }

  // Ensure the sellerId matches the listing owner
  if (data.sellerId !== listing.owner) {
    throw new ParamError('sellerId');
  }

  // Check if a chat room with the same buyer and seller already exists
  const existingChat = await PrismaClient.rooms.findFirst({
    where: {
      buyer: data.buyerId,
      seller: data.sellerId,
    },
  });

  // If a chat room with the same buyer and seller exists, return an error response
  if (existingChat) {
    return res.status(400).json({
      success: false,
      error: 'A chat room with the same buyer and seller already exists',
    });
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
  res.status(201).json({ room: result.id });
});