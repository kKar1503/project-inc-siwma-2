import { z } from 'zod';

const companyId = z.number();
const image = z.string().url();
const description = z.string();
const link = z.string().url();
// Admin Fields
const active = z.boolean().optional();
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

const createAdvertisement = z.object({ companyId });
const getAdvertisements = advertisement.array();
const getAdvertisement = advertisement;
const updateAdvertisement = advertisement;
const deleteAdvertisement = z.object({});

export default {
  create: createAdvertisement,
  getAll: getAdvertisements,
  getById: getAdvertisement,
  update: updateAdvertisement,
  delete: deleteAdvertisement,
};
