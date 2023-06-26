import { Sibkeys } from '@inc/db';

export type GetAPIKeyResponseBody = {
  success: boolean;
  key?: Sibkeys;
};
