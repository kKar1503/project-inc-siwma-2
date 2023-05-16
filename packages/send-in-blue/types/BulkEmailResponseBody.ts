import { EmailError } from '@inc/errors';

export type BulkEmailResponseBody = {
  success: boolean;
  error?: EmailError;
};

