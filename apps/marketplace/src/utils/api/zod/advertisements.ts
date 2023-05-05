import { z } from 'zod';

const companyId = z.number();
const image = z.string().url();
const description = z.string();
const link = z.string().url();
const active = z.boolean();
const startDate = z.date();
const endDate = z.date();

const advertisement = {
  companyId,
  image,
  description,
  link,
};

const advertisementAdmin = {
  active,
  startDate,
  endDate,
  ...advertisement,
};


export const getAdvertisements = z.object(advertisement).array();
export const getAdvertisementsAdmin = z.object(advertisementAdmin).array();
export const getAdvertisement = z.object(advertisement);
export const getAdvertisementAdmin = z.object(advertisementAdmin);
export const createAdvertisement = z.object({ companyId });
export const updateAdvertisement = getAdvertisementAdmin;
export const deleteAdvertisement = z.object({});
