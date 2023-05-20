import {
  ContentType,
  DataType,
  ListingType,
  NotificationType,
  ParameterType,
  UserContacts,
} from './index';

type TContentType = keyof typeof ContentType;
type TDataType = keyof typeof DataType;
type TListingType = keyof typeof ListingType;
type TNotificationType = keyof typeof NotificationType;
type TParameterType = keyof typeof ParameterType;
type TUserContacts = keyof typeof UserContacts;

export type { TContentType, TDataType, TListingType, TNotificationType, TParameterType, TUserContacts };
