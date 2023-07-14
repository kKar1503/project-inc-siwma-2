import { Prisma, ListingsParametersValue } from '../../../index';

interface IListingsParametersValue {
  listingId: number;
  parameters: Prisma.JsonArray;
  createdAt?: Date;
  updatedAt?: Date;
}

const ListingsParametersValue: IListingsParametersValue[] = [
  {
    listingId: 2,
    parameters: [
      { parameterId: 2, value: '54' },
      { parameterId: 4, value: '56' },
      { parameterId: 21, value: '154' },
    ],
  },
  {
    listingId: 3,
    parameters: [
      { parameterId: 2, value: '128' },
      { parameterId: 4, value: '169' },
      { parameterId: 21, value: '166' },
    ],
  },
  {
    listingId: 4,
    parameters: [
      { parameterId: 2, value: '193' },
      { parameterId: 4, value: '15' },
      { parameterId: 21, value: '53' },
    ],
  },
  {
    listingId: 5,
    parameters: [
      { parameterId: 2, value: '179' },
      { parameterId: 22, value: '17' },
    ],
  },
  {
    listingId: 6,
    parameters: [
      { parameterId: 2, value: '81' },
      { parameterId: 22, value: '175' },
    ],
  },
  {
    listingId: 7,
    parameters: [
      { parameterId: 2, value: '183' },
      { parameterId: 22, value: '66' },
    ],
  },
  {
    listingId: 8,
    parameters: [
      { parameterId: 2, value: '100' },
      { parameterId: 22, value: '136' },
    ],
  },
  {
    listingId: 10,
    parameters: [
      { parameterId: 2, value: '84' },
      { parameterId: 22, value: '134' },
    ],
  },
  {
    listingId: 11,
    parameters: [
      { parameterId: 2, value: '179' },
      { parameterId: 27, value: '192' },
      { parameterId: 28, value: '25' },
      { parameterId: 29, value: '59' },
      { parameterId: 26, value: '101' },
      { parameterId: 31, value: '131' },
    ],
  },
  {
    listingId: 12,
    parameters: [
      { parameterId: 2, value: '135' },
      { parameterId: 4, value: '95' },
      { parameterId: 21, value: '128' },
    ],
  },
  {
    listingId: 13,
    parameters: [
      { parameterId: 2, value: '157' },
      { parameterId: 15, value: '43' },
      { parameterId: 16, value: '141' },
      { parameterId: 17, value: '116' },
    ],
  },
  {
    listingId: 15,
    parameters: [
      { parameterId: 2, value: '196' },
      { parameterId: 27, value: '177' },
      { parameterId: 28, value: '4' },
      { parameterId: 29, value: '70' },
      { parameterId: 26, value: '50' },
      { parameterId: 31, value: '109' },
    ],
  },
  {
    listingId: 16,
    parameters: [
      { parameterId: 2, value: '116' },
      { parameterId: 4, value: '33' },
      { parameterId: 11, value: '21' },
    ],
  },
  {
    listingId: 17,
    parameters: [
      { parameterId: 2, value: '110' },
      { parameterId: 12, value: '119' },
      { parameterId: 13, value: '6' },
      { parameterId: 14, value: '166' },
    ],
  },
  {
    listingId: 18,
    parameters: [
      { parameterId: 2, value: '63' },
      { parameterId: 15, value: '78' },
      { parameterId: 16, value: '23' },
      { parameterId: 17, value: '36' },
    ],
  },
  {
    listingId: 19,
    parameters: [
      { parameterId: 2, value: '172' },
      { parameterId: 18, value: '193' },
      { parameterId: 19, value: '65' },
      { parameterId: 20, value: '7' },
    ],
  },
  {
    listingId: 20,
    parameters: [
      { parameterId: 2, value: '88' },
      { parameterId: 4, value: '194' },
      { parameterId: 21, value: '191' },
    ],
  },
  {
    listingId: 22,
    parameters: [
      { parameterId: 2, value: '152' },
      { parameterId: 12, value: '142' },
      { parameterId: 13, value: '75' },
      { parameterId: 14, value: '31' },
    ],
  },
  {
    listingId: 24,
    parameters: [
      { parameterId: 2, value: '151' },
      { parameterId: 22, value: '189' },
    ],
  },
  {
    listingId: 25,
    parameters: [
      { parameterId: 2, value: '196' },
      { parameterId: 18, value: '121' },
      { parameterId: 19, value: '132' },
      { parameterId: 20, value: '135' },
    ],
  },
  {
    listingId: 26,
    parameters: [
      { parameterId: 2, value: '177' },
      { parameterId: 4, value: '186' },
      { parameterId: 21, value: '122' },
    ],
  },
  {
    listingId: 27,
    parameters: [
      { parameterId: 23, value: '57' },
      { parameterId: 2, value: '12' },
    ],
  },
  {
    listingId: 28,
    parameters: [
      { parameterId: 2, value: '48' },
      { parameterId: 9, value: '82' },
      { parameterId: 10, value: '119' },
    ],
  },
  {
    listingId: 29,
    parameters: [
      { parameterId: 2, value: '95' },
      { parameterId: 27, value: '160' },
      { parameterId: 28, value: '85' },
      { parameterId: 29, value: '39' },
      { parameterId: 26, value: '13' },
      { parameterId: 31, value: '18' },
    ],
  },
  {
    listingId: 30,
    parameters: [
      { parameterId: 2, value: '79' },
      { parameterId: 4, value: '66' },
      { parameterId: 11, value: '176' },
    ],
  },
  {
    listingId: 31,
    parameters: [
      { parameterId: 2, value: '132' },
      { parameterId: 15, value: '114' },
      { parameterId: 16, value: '49' },
      { parameterId: 17, value: '66' },
    ],
  },
  {
    listingId: 32,
    parameters: [
      { parameterId: 2, value: '77' },
      { parameterId: 12, value: '33' },
      { parameterId: 13, value: '117' },
      { parameterId: 14, value: '70' },
    ],
  },
  {
    listingId: 33,
    parameters: [
      { parameterId: 2, value: '189' },
      { parameterId: 18, value: '2' },
      { parameterId: 19, value: '170' },
      { parameterId: 20, value: '113' },
    ],
  },
  {
    listingId: 34,
    parameters: [
      { parameterId: 2, value: '169' },
      { parameterId: 15, value: '83' },
      { parameterId: 16, value: '160' },
      { parameterId: 17, value: '120' },
    ],
  },
  {
    listingId: 35,
    parameters: [
      { parameterId: 2, value: '18' },
      { parameterId: 27, value: '135' },
      { parameterId: 28, value: '33' },
      { parameterId: 29, value: '181' },
      { parameterId: 26, value: '76' },
      { parameterId: 31, value: '26' },
    ],
  },
  {
    listingId: 36,
    parameters: [
      { parameterId: 2, value: '40' },
      { parameterId: 4, value: '143' },
      { parameterId: 21, value: '141' },
    ],
  },
  {
    listingId: 37,
    parameters: [
      { parameterId: 23, value: '172' },
      { parameterId: 2, value: '21' },
    ],
  },
  {
    listingId: 38,
    parameters: [
      { parameterId: 2, value: '113' },
      { parameterId: 9, value: '173' },
      { parameterId: 10, value: '169' },
    ],
  },
  {
    listingId: 39,
    parameters: [
      { parameterId: 2, value: '119' },
      { parameterId: 15, value: '150' },
      { parameterId: 16, value: '76' },
      { parameterId: 17, value: '63' },
    ],
  },
  {
    listingId: 41,
    parameters: [
      { parameterId: 2, value: '193' },
      { parameterId: 15, value: '29' },
      { parameterId: 16, value: '15' },
      { parameterId: 17, value: '16' },
    ],
  },
  {
    listingId: 42,
    parameters: [
      { parameterId: 2, value: '133' },
      { parameterId: 22, value: '40' },
    ],
  },
  {
    listingId: 43,
    parameters: [
      { parameterId: 2, value: '125' },
      { parameterId: 18, value: '85' },
      { parameterId: 19, value: '28' },
      { parameterId: 20, value: '14' },
    ],
  },
  {
    listingId: 44,
    parameters: [
      { parameterId: 2, value: '25' },
      { parameterId: 4, value: '43' },
      { parameterId: 21, value: '92' },
    ],
  },
  {
    listingId: 45,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 18, value: '172' },
      { parameterId: 19, value: '86' },
      { parameterId: 20, value: '177' },
    ],
  },
  {
    listingId: 46,
    parameters: [
      { parameterId: 2, value: '57' },
      { parameterId: 18, value: '99' },
      { parameterId: 19, value: '157' },
      { parameterId: 20, value: '21' },
    ],
  },
  {
    listingId: 47,
    parameters: [
      { parameterId: 2, value: '106' },
      { parameterId: 4, value: '20' },
      { parameterId: 21, value: '87' },
    ],
  },
  {
    listingId: 48,
    parameters: [
      { parameterId: 2, value: '146' },
      { parameterId: 4, value: '149' },
      { parameterId: 21, value: '188' },
    ],
  },
  {
    listingId: 49,
    parameters: [
      { parameterId: 2, value: '121' },
      { parameterId: 22, value: '63' },
    ],
  },
  {
    listingId: 50,
    parameters: [
      { parameterId: 2, value: '116' },
      { parameterId: 18, value: '107' },
      { parameterId: 19, value: '163' },
      { parameterId: 20, value: '16' },
    ],
  },
  {
    listingId: 51,
    parameters: [
      { parameterId: 2, value: '41' },
      { parameterId: 18, value: '179' },
      { parameterId: 19, value: '2' },
      { parameterId: 20, value: '71' },
    ],
  },
  {
    listingId: 52,
    parameters: [
      { parameterId: 23, value: '178' },
      { parameterId: 2, value: '152' },
    ],
  },
  {
    listingId: 53,
    parameters: [
      { parameterId: 2, value: '102' },
      { parameterId: 18, value: '55' },
      { parameterId: 19, value: '166' },
      { parameterId: 20, value: '51' },
    ],
  },
  {
    listingId: 54,
    parameters: [
      { parameterId: 2, value: '44' },
      { parameterId: 4, value: '32' },
      { parameterId: 11, value: '50' },
    ],
  },
  {
    listingId: 55,
    parameters: [
      { parameterId: 2, value: '26' },
      { parameterId: 4, value: '112' },
      { parameterId: 21, value: '146' },
    ],
  },
  {
    listingId: 56,
    parameters: [
      { parameterId: 2, value: '127' },
      { parameterId: 18, value: '70' },
      { parameterId: 19, value: '108' },
      { parameterId: 20, value: '158' },
    ],
  },
  {
    listingId: 57,
    parameters: [
      { parameterId: 2, value: '71' },
      { parameterId: 18, value: '133' },
      { parameterId: 19, value: '114' },
      { parameterId: 20, value: '9' },
    ],
  },
  {
    listingId: 58,
    parameters: [
      { parameterId: 2, value: '28' },
      { parameterId: 18, value: '38' },
      { parameterId: 19, value: '49' },
      { parameterId: 20, value: '126' },
    ],
  },
  {
    listingId: 60,
    parameters: [
      { parameterId: 2, value: '151' },
      { parameterId: 4, value: '151' },
      { parameterId: 21, value: '7' },
    ],
  },
  {
    listingId: 61,
    parameters: [
      { parameterId: 2, value: '195' },
      { parameterId: 22, value: '134' },
    ],
  },
  {
    listingId: 62,
    parameters: [
      { parameterId: 2, value: '113' },
      { parameterId: 22, value: '158' },
    ],
  },
  {
    listingId: 63,
    parameters: [
      { parameterId: 2, value: '177' },
      { parameterId: 15, value: '191' },
      { parameterId: 16, value: '188' },
      { parameterId: 17, value: '134' },
    ],
  },
  {
    listingId: 64,
    parameters: [
      { parameterId: 2, value: '187' },
      { parameterId: 18, value: '132' },
      { parameterId: 19, value: '109' },
      { parameterId: 20, value: '110' },
    ],
  },
  {
    listingId: 65,
    parameters: [
      { parameterId: 2, value: '14' },
      { parameterId: 4, value: '125' },
      { parameterId: 21, value: '80' },
    ],
  },
  {
    listingId: 66,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 22, value: '14' },
    ],
  },
  {
    listingId: 67,
    parameters: [
      { parameterId: 2, value: '174' },
      { parameterId: 18, value: '93' },
      { parameterId: 19, value: '109' },
      { parameterId: 20, value: '188' },
    ],
  },
  {
    listingId: 68,
    parameters: [
      { parameterId: 2, value: '105' },
      { parameterId: 18, value: '96' },
      { parameterId: 19, value: '119' },
      { parameterId: 20, value: '78' },
    ],
  },
  {
    listingId: 69,
    parameters: [
      { parameterId: 2, value: '32' },
      { parameterId: 4, value: '35' },
      { parameterId: 21, value: '4' },
    ],
  },
  {
    listingId: 71,
    parameters: [
      { parameterId: 2, value: '162' },
      { parameterId: 4, value: '62' },
      { parameterId: 21, value: '79' },
    ],
  },
  {
    listingId: 72,
    parameters: [
      { parameterId: 2, value: '35' },
      { parameterId: 18, value: '103' },
      { parameterId: 19, value: '157' },
      { parameterId: 20, value: '179' },
    ],
  },
  {
    listingId: 73,
    parameters: [
      { parameterId: 23, value: '71' },
      { parameterId: 2, value: '26' },
    ],
  },
  {
    listingId: 74,
    parameters: [
      { parameterId: 23, value: '34' },
      { parameterId: 2, value: '37' },
    ],
  },
  {
    listingId: 75,
    parameters: [
      { parameterId: 2, value: '84' },
      { parameterId: 4, value: '62' },
      { parameterId: 21, value: '158' },
    ],
  },
  {
    listingId: 76,
    parameters: [
      { parameterId: 2, value: '123' },
      { parameterId: 18, value: '180' },
      { parameterId: 19, value: '42' },
      { parameterId: 20, value: '27' },
    ],
  },
  {
    listingId: 77,
    parameters: [
      { parameterId: 2, value: '189' },
      { parameterId: 4, value: '93' },
      { parameterId: 21, value: '31' },
    ],
  },
  {
    listingId: 78,
    parameters: [
      { parameterId: 2, value: '107' },
      { parameterId: 4, value: '112' },
      { parameterId: 11, value: '12' },
    ],
  },
  {
    listingId: 80,
    parameters: [
      { parameterId: 2, value: '113' },
      { parameterId: 22, value: '80' },
    ],
  },
  {
    listingId: 81,
    parameters: [
      { parameterId: 2, value: '176' },
      { parameterId: 22, value: '61' },
    ],
  },
  {
    listingId: 82,
    parameters: [
      { parameterId: 23, value: '109' },
      { parameterId: 2, value: '40' },
    ],
  },
  {
    listingId: 84,
    parameters: [
      { parameterId: 2, value: '70' },
      { parameterId: 18, value: '51' },
      { parameterId: 19, value: '65' },
      { parameterId: 20, value: '59' },
    ],
  },

  {
    listingId: 85,
    parameters: [
      { parameterId: 4, value: '40' },
      { parameterId: 21, value: '52' },
    ],
  },
  {
    listingId: 86,
    parameters: [
      { parameterId: 2, value: '107' },
      { parameterId: 27, value: '196' },
      { parameterId: 28, value: '133' },
      { parameterId: 29, value: '2' },
      { parameterId: 26, value: '122' },
      { parameterId: 31, value: '77' },
    ],
  },
  {
    listingId: 87,
    parameters: [
      { parameterId: 2, value: '114' },
      { parameterId: 18, value: '137' },
      { parameterId: 19, value: '46' },
      { parameterId: 20, value: '18' },
    ],
  },
  {
    listingId: 88,
    parameters: [
      { parameterId: 2, value: '102' },
      { parameterId: 18, value: '74' },
      { parameterId: 19, value: '16' },
      { parameterId: 20, value: '45' },
    ],
  },
  {
    listingId: 89,
    parameters: [
      { parameterId: 2, value: '7' },
      { parameterId: 27, value: '183' },
      { parameterId: 28, value: '159' },
      { parameterId: 29, value: '73' },
      { parameterId: 26, value: '196' },
      { parameterId: 31, value: '34' },
    ],
  },
  {
    listingId: 90,
    parameters: [
      { parameterId: 2, value: '15' },
      { parameterId: 4, value: '158' },
      { parameterId: 11, value: '94' },
    ],
  },
  {
    listingId: 91,
    parameters: [
      { parameterId: 2, value: '144' },
      { parameterId: 4, value: '158' },
      { parameterId: 21, value: '72' },
    ],
  },
  {
    listingId: 92,
    parameters: [
      { parameterId: 2, value: '74' },
      { parameterId: 4, value: '20' },
      { parameterId: 21, value: '181' },
    ],
  },
  {
    listingId: 93,
    parameters: [
      { parameterId: 2, value: '79' },
      { parameterId: 27, value: '98' },
      { parameterId: 28, value: '41' },
    ],
  },

  {
    listingId: 94,
    parameters: [
      { parameterId: 2, value: '15' },
      { parameterId: 22, value: '102' },
    ],
  },
  {
    listingId: 95,
    parameters: [
      { parameterId: 2, value: '47' },
      { parameterId: 4, value: '46' },
      { parameterId: 21, value: '13' },
    ],
  },
  {
    listingId: 96,
    parameters: [
      { parameterId: 2, value: '197' },
      { parameterId: 4, value: '73' },
      { parameterId: 21, value: '123' },
    ],
  },
  {
    listingId: 97,
    parameters: [
      { parameterId: 2, value: '107' },
      { parameterId: 9, value: '198' },
      { parameterId: 10, value: '26' },
    ],
  },
  {
    listingId: 98,
    parameters: [
      { parameterId: 2, value: '147' },
      { parameterId: 4, value: '94' },
      { parameterId: 21, value: '167' },
    ],
  },
  {
    listingId: 99,
    parameters: [
      { parameterId: 2, value: '135' },
      { parameterId: 27, value: '42' },
      { parameterId: 28, value: '157' },
      { parameterId: 29, value: '64' },
      { parameterId: 26, value: '43' },
      { parameterId: 31, value: '52' },
    ],
  },
  {
    listingId: 100,
    parameters: [
      { parameterId: 2, value: '96' },
      { parameterId: 9, value: '197' },
      { parameterId: 10, value: '45' },
    ],
  },
];

export type { IListingsParametersValue };
export { ListingsParametersValue };
