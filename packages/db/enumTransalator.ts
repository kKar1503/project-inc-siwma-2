import {
  ContentType,
  DataType,
  ListingType,
  ParameterType,
  UserContacts,
  ReasonType,
} from '@prisma/client';

type TContentType = keyof typeof ContentType;
type TDataType = keyof typeof DataType;
type TListingType = keyof typeof ListingType;
type TParameterType = keyof typeof ParameterType;
type TUserContacts = keyof typeof UserContacts;
type TReasonType = keyof typeof ReasonType;

export type { TContentType, TDataType, TListingType, TParameterType, TUserContacts, TReasonType };
