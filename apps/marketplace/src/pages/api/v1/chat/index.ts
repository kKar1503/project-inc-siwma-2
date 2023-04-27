import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from "@inc/db";
import { z } from "zod";

//-- Type definitions --//
// Define the type of the response object
export type ChatResponse = {
  // Add the fields relevant to chat response
};

//-- Helper functions --//
export function formatChatResponse(chatData: any) {
  // Modify this function to format the response as required

  return formatAPIResponse(chatData);
}

/**
 * Zod schema for the POST request body
 */
export const chatRequestBody = z.object({
  // Define the request body schema
  // Add the fields relevant to chat request
});

export default apiHandler()
  .get(async (req, res) => {
    // Retrieve the relevant data from the database
    const chatData = await PrismaClient.chat.findMany();

    // Return the result
    res.status(200).json(formatChatResponse(chatData));
  })
  .post(async (req, res) => {
      // Parse and validate the request body
      const data = chatRequestBody.parse(req.body);

      // Insert the data into the database
      const result = await PrismaClient.chat.create({
        data: {
          // Add the fields relevant to chat data
        },
      });

      // Return the result
      res.status(201).json({ chatId: result.id });
  });