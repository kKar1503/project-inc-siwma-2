export const ConditionType = {
  'good': 'good',
  'bad': 'bad',
  'excellent': 'excellent',
} as const;

export const ContentType = {
  'text': 'text',
  'file': 'file',
  'image': 'image',
  'offer': 'offer',
} as const;

export const DataType = {
  'string': 'string',
  'number': 'number',
  'boolean': 'boolean',
} as const;

export const ListingType = {
  'BUY': 'BUY',
  'SELL': 'SELL',
} as const;

export const LogType = {
  'info': 'info',
  'error': 'error',
  'fatal': 'fatal',
} as const;

export const ParameterType = {
  'WEIGHT': 'WEIGHT',
  'DIMENSION': 'DIMENSION',
  'TWO_CHOICES': 'TWO_CHOICES',
  'MANY_CHOICES': 'MANY_CHOICES',
  'OPEN_ENDED': 'OPEN_ENDED',
} as const;

export const ReasonType = {
  'Offensive_Content_Behaviour': 'Offensive_Content_Behaviour',
  'Suspicious_Account': 'Suspicious_Account',
  'Cancelling_on_deal': 'Cancelling_on_deal',
  'Inaccurate_Listings': 'Inaccurate_Listings',
} as const;

export const UnitType = {
  'kg': 'kg',
  'm': 'm',
  'unit': 'unit',
} as const;

export const UserContacts = {
  'whatsapp': 'whatsapp',
  'phone': 'phone',
  'telegram': 'telegram',
  'facebook': 'facebook',
  'email': 'email',
} as const;
