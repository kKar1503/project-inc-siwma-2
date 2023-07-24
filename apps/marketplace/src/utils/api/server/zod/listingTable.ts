import { z } from 'zod';
import { ListingType, ParameterType, DataType } from '@inc/db-enums';
import { zodParseToBoolean, zodParseToInteger, zodParseToNumber } from '@/utils/api/apiHelper';

export const SortableFields = {
  ListingName: 'name',
  Price: 'price',
  Quantiy: 'quantity',
  CreatedAt: 'createdAt',
} as const;

export type TSortableField = (typeof SortableFields)[keyof typeof SortableFields];

export const SortableDirection = {
  Asc: 'asc',
  Dsc: 'desc',
} as const;

export type TSortableDirection = (typeof SortableDirection)[keyof typeof SortableDirection];

export const getQueryParameters = z.object({
  limit: z.string().transform(zodParseToInteger).optional().default('10'),
  page: z.string().transform(zodParseToInteger).optional().default('0'),
  category: z.string().transform(zodParseToInteger).optional(),
  sortBy: z.nativeEnum(SortableFields).optional().default(SortableFields.CreatedAt),
  sortDirection: z.nativeEnum(SortableDirection).optional().default(SortableDirection.Dsc),
  // Currently unused:
  type: z.nativeEnum(ListingType).optional(),
  negotiable: z.string().transform(zodParseToBoolean).optional(),
  minPrice: z.string().transform(zodParseToNumber).optional(),
  maxPrice: z.string().transform(zodParseToNumber).optional(),
});

// -- Listing properties -- //
const id = z.string();
const price = z.number();
const negotiable = z.boolean();
const quantity = z.number();
const type = z.nativeEnum(ListingType);
const createdAt = z.string();

// -- Company Properties -- //
const company = z.object({
  name: z.string(),
  website: z.string().nullable(),
});

// -- Owner Properties -- //
const owner = z.object({
  id: z.string(),
  name: z.string(),
  company,
  profilePic: z.string().nullable(),
});

// -- Paramter Properties -- //
const parameter = z.object({
  parameterId: z.number(),
  value: z.string(),
});

// -- Listing Schema -- //
export const listingSchema = z.object({
  id,
  price,
  negotiable,
  quantity,
  type,
  createdAt,
  owner,
  parameters: z.array(parameter),
});

export const listingsSchema = z.array(listingSchema);

export const paginationSchema = z.object({
  totalCount: z.number(),
  totalPage: z.number(),
  page: z.number().default(0),
  prevPage: z.number().nullable(),
  nextPage: z.number().nullable(),
  limit: z.number().default(10),
});

export const listingTableResponseSchema = z.object({
  pagination: paginationSchema,
  listings: listingsSchema,
});

export type Listing = z.infer<typeof listingSchema>;
export type GetListingsQueryParameter = z.infer<typeof getQueryParameters>;
export type Pagination = z.infer<typeof paginationSchema>;
