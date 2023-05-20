import { z } from 'zod';

const companyId = z.string().transform((val) => Number(val));
const image = z.string().url();
const description = z.string();
const link = z.string().url();
// Admin Fields
// default is true because if we are not admin, we would not be able to see fields that are not active
const active = z.string().optional().default('true').transform((val) => val === 'true');
const startDate = z.date().optional();
const endDate = z.date().optional();

const advertisement = z.object({
  companyId,
  image,
  description,
  link,
  // Admin Fields
  active,
  startDate,
  endDate,
});

export const createAdvertisement = z.object({ companyId });
export const getAdvertisements = advertisement.array();
export const getAdvertisement = advertisement;
export const updateAdvertisement = advertisement;
export const deleteAdvertisement = z.object({});
