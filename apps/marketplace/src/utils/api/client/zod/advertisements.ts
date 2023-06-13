import { z } from 'zod';

const companyId = z.string();
const image = z.string().nullable();
const description = z.string();
const link = z.string();
// Admin Fields
const active = z.boolean().optional();
const startDate = z.string().datetime().optional();
const endDate = z.string().datetime().optional();

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

const createAdvertisement = z.object({ companyId });
const getAdvertisements = advertisement.array();
const getAdvertisement = advertisement;
const updateAdvertisement = advertisement;
const deleteAdvertisement = z.object({});

export type Advertisment = z.infer<typeof advertisement>;

export default {
  create: createAdvertisement,
  getAll: getAdvertisements,
  getById: getAdvertisement,
  update: updateAdvertisement,
  delete: deleteAdvertisement,
};
