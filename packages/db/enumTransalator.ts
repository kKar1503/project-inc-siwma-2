import {
  ContentType,
  DataType,
  ListingType,
  ParameterType,
  UserContacts,
} from '@prisma/client';

type TContentType = keyof typeof ContentType;
type TDataType = keyof typeof DataType;
type TListingType = keyof typeof ListingType;
type TParameterType = keyof typeof ParameterType;
type TUserContacts = keyof typeof UserContacts;

export type { TContentType, TDataType, TListingType, TParameterType, TUserContacts };
