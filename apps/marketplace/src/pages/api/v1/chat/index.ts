import { apiHandler, formatAPIResponse } from '@/utils/api';
import { PrismaClient } from '@inc/db';
import { z } from 'zod';

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
  sellerId: z.string(),
  buyerId: z.string(),
  listingId: z.number(),
});

const prisma = new PrismaClient();

export default apiHandler().post(async (req, res) => {
  // Parse and validate the request body
  const data = chatRequestBody.parse(req.body);

  // Insert the data into the database and create a new chat room
  const result = await prisma.rooms.create({
    data: {
      seller: data.sellerId,
      buyer: data.buyerId,
      listing: data.listingId,
    },
  });

  // Return the result
  res.status(201).json({ room: result.id });
});
