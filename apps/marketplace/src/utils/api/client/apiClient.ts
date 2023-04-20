import { AuthError } from "@/errors/AuthError";
import axios from "axios";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";

//-- Global Variables --//
const maxRetries = 1; // The total number of times axios will retry a request
let currRetries = 0; // The current number of times axios has retried a request

let tokenRefreshPromise: Promise<Session | null> | null; // Holds the promise for the token refresh

// Create axios client
const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach an error handler as a response interceptor
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error was due to an invalid token
    if (error.response.status === AuthError.status) {
      // Refresh the token
      // Check if the token is already being refreshed
      if (!tokenRefreshPromise) {
        // It is not being refreshed, refresh it
        tokenRefreshPromise = getSession();
      }

      // Wait for the token to be refreshed
      await tokenRefreshPromise;

      // Clear the token refresh promise
      tokenRefreshPromise = null;

      // Retry the request (if we didn't already)
      if (currRetries < maxRetries) {
        // Increment the number of retries and retry the request
        currRetries++;
        const res = await client.request(error.config);

        // Reset the number of retries and return the result
        currRetries = 0;
        return res;
      }

      // We have already hit the max number of retries, the user is no longer authenticated
      // Clear the user session and redirect the user to the login page
      await signOut();
      window.location.href = "/login";
    }
  }
);

// Export axios client
export default client;
