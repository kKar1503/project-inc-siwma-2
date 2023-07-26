import { Prisma, ListingsParametersValue } from '../../../index';

interface IListingsParametersValue {
  listingId: number;
  parameters: Prisma.JsonArray;
  createdAt?: Date;
  updatedAt?: Date;
}

const ListingsParametersValue: IListingsParametersValue[] = [
  {
    listingId: 1,
    parameters: [
      { parameterId: 2, value: '139' },
      { parameterId: 9, value: '125' },
      { parameterId: 10, value: '96' },
    ],
  },
  {
    listingId: 2,
    parameters: [
      { parameterId: 2, value: '53' },
      { parameterId: 9, value: '127' },
      { parameterId: 10, value: '194' },
    ],
  },
  {
    listingId: 3,
    parameters: [
      { parameterId: 2, value: '147' },
      { parameterId: 9, value: '102' },
      { parameterId: 10, value: '30' },
    ],
  },
  {
    listingId: 4,
    parameters: [
      { parameterId: 2, value: '148' },
      { parameterId: 22, value: '1' },
    ],
  },
  {
    listingId: 5,
    parameters: [
      { parameterId: 23, value: '129' },
      { parameterId: 2, value: '81' },
    ],
  },
  {
    listingId: 6,
    parameters: [
      { parameterId: 23, value: '69' },
      { parameterId: 2, value: '154' },
    ],
  },
  {
    listingId: 7,
    parameters: [
      { parameterId: 23, value: '176' },
      { parameterId: 2, value: '97' },
    ],
  },
  {
    listingId: 8,
    parameters: [
      { parameterId: 23, value: '32' },
      { parameterId: 2, value: '17' },
    ],
  },
  {
    listingId: 9,
    parameters: [
      { parameterId: 2, value: '163' },
      { parameterId: 22, value: '197' },
    ],
  },
  {
    listingId: 10,
    parameters: [
      { parameterId: 2, value: '98' },
      { parameterId: 4, value: '64' },
      { parameterId: 11, value: '40' },
    ],
  },
  {
    listingId: 11,
    parameters: [
      { parameterId: 2, value: '61' },
      { parameterId: 4, value: '69' },
      { parameterId: 21, value: '107' },
    ],
  },
  {
    listingId: 12,
    parameters: [
      { parameterId: 2, value: '38' },
      { parameterId: 24, value: '170' },
      { parameterId: 25, value: '181' },
    ],
  },
  {
    listingId: 13,
    parameters: [
      { parameterId: 2, value: '193' },
      { parameterId: 22, value: '140' },
    ],
  },
  {
    listingId: 14,
    parameters: [
      { parameterId: 2, value: '33' },
      { parameterId: 4, value: '94' },
      { parameterId: 11, value: '141' },
    ],
  },
  {
    listingId: 15,
    parameters: [
      { parameterId: 2, value: '186' },
      { parameterId: 9, value: '65' },
      { parameterId: 10, value: '140' },
    ],
  },
  {
    listingId: 16,
    parameters: [
      { parameterId: 2, value: '59' },
      { parameterId: 9, value: '67' },
      { parameterId: 10, value: '85' },
    ],
  },
  {
    listingId: 17,
    parameters: [
      { parameterId: 2, value: '197' },
      { parameterId: 18, value: '126' },
      { parameterId: 19, value: '167' },
      { parameterId: 20, value: '97' },
    ],
  },
  {
    listingId: 18,
    parameters: [
      { parameterId: 2, value: '168' },
      { parameterId: 9, value: '134' },
      { parameterId: 10, value: '181' },
    ],
  },
  {
    listingId: 19,
    parameters: [
      { parameterId: 2, value: '63' },
      { parameterId: 15, value: '128' },
      { parameterId: 16, value: '33' },
      { parameterId: 17, value: '191' },
    ],
  },
  {
    listingId: 20,
    parameters: [
      { parameterId: 2, value: '132' },
      { parameterId: 9, value: '88' },
      { parameterId: 10, value: '127' },
    ],
  },
  {
    listingId: 21,
    parameters: [
      { parameterId: 2, value: '198' },
      { parameterId: 9, value: '128' },
      { parameterId: 10, value: '103' },
    ],
  },
  {
    listingId: 22,
    parameters: [
      { parameterId: 2, value: '168' },
      { parameterId: 18, value: '65' },
      { parameterId: 19, value: '9' },
      { parameterId: 20, value: '142' },
    ],
  },
  {
    listingId: 23,
    parameters: [
      { parameterId: 2, value: '3' },
      { parameterId: 22, value: '174' },
    ],
  },
  {
    listingId: 24,
    parameters: [
      { parameterId: 23, value: '113' },
      { parameterId: 2, value: '152' },
    ],
  },
  {
    listingId: 25,
    parameters: [
      { parameterId: 2, value: '154' },
      { parameterId: 15, value: '131' },
      { parameterId: 16, value: '43' },
      { parameterId: 17, value: '17' },
    ],
  },
  {
    listingId: 26,
    parameters: [
      { parameterId: 23, value: '46' },
      { parameterId: 2, value: '134' },
    ],
  },
  {
    listingId: 27,
    parameters: [
      { parameterId: 2, value: '134' },
      { parameterId: 22, value: '125' },
    ],
  },
  {
    listingId: 28,
    parameters: [
      { parameterId: 2, value: '82' },
      { parameterId: 22, value: '198' },
    ],
  },
  {
    listingId: 29,
    parameters: [
      { parameterId: 2, value: '179' },
      { parameterId: 4, value: '115' },
      { parameterId: 21, value: '27' },
    ],
  },
  {
    listingId: 30,
    parameters: [
      { parameterId: 2, value: '52' },
      { parameterId: 4, value: '93' },
      { parameterId: 11, value: '107' },
    ],
  },
  {
    listingId: 31,
    parameters: [
      { parameterId: 2, value: '173' },
      { parameterId: 22, value: '114' },
    ],
  },
  {
    listingId: 32,
    parameters: [
      { parameterId: 2, value: '172' },
      { parameterId: 4, value: '55' },
      { parameterId: 11, value: '23' },
    ],
  },
  {
    listingId: 33,
    parameters: [
      { parameterId: 2, value: '117' },
      { parameterId: 4, value: '166' },
      { parameterId: 21, value: '170' },
    ],
  },
  {
    listingId: 34,
    parameters: [
      { parameterId: 2, value: '12' },
      { parameterId: 22, value: '142' },
    ],
  },
  {
    listingId: 35,
    parameters: [
      { parameterId: 2, value: '106' },
      { parameterId: 22, value: '179' },
    ],
  },
  {
    listingId: 36,
    parameters: [
      { parameterId: 23, value: '78' },
      { parameterId: 2, value: '139' },
    ],
  },
  {
    listingId: 37,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 22, value: '24' },
    ],
  },
  {
    listingId: 38,
    parameters: [
      { parameterId: 2, value: '186' },
      { parameterId: 4, value: '122' },
      { parameterId: 11, value: '59' },
    ],
  },
  {
    listingId: 39,
    parameters: [
      { parameterId: 2, value: '176' },
      { parameterId: 4, value: '171' },
      { parameterId: 21, value: '31' },
    ],
  },
  {
    listingId: 40,
    parameters: [
      { parameterId: 2, value: '32' },
      { parameterId: 9, value: '127' },
      { parameterId: 10, value: '84' },
    ],
  },
  {
    listingId: 41,
    parameters: [
      { parameterId: 2, value: '130' },
      { parameterId: 18, value: '109' },
      { parameterId: 19, value: '28' },
      { parameterId: 20, value: '67' },
    ],
  },
  {
    listingId: 42,
    parameters: [
      { parameterId: 2, value: '163' },
      { parameterId: 4, value: '114' },
      { parameterId: 21, value: '123' },
    ],
  },
  {
    listingId: 43,
    parameters: [
      { parameterId: 2, value: '82' },
      { parameterId: 4, value: '198' },
      { parameterId: 21, value: '68' },
    ],
  },
  {
    listingId: 44,
    parameters: [
      { parameterId: 2, value: '144' },
      { parameterId: 4, value: '139' },
      { parameterId: 11, value: '131' },
    ],
  },
  {
    listingId: 45,
    parameters: [
      { parameterId: 2, value: '165' },
      { parameterId: 18, value: '117' },
      { parameterId: 19, value: '134' },
      { parameterId: 20, value: '61' },
    ],
  },
  {
    listingId: 46,
    parameters: [
      { parameterId: 2, value: '173' },
      { parameterId: 22, value: '77' },
    ],
  },
  {
    listingId: 47,
    parameters: [
      { parameterId: 2, value: '8' },
      { parameterId: 18, value: '158' },
      { parameterId: 19, value: '196' },
      { parameterId: 20, value: '13' },
    ],
  },
  {
    listingId: 48,
    parameters: [
      { parameterId: 2, value: '71' },
      { parameterId: 18, value: '195' },
      { parameterId: 19, value: '62' },
      { parameterId: 20, value: '164' },
    ],
  },
  {
    listingId: 49,
    parameters: [
      { parameterId: 2, value: '127' },
      { parameterId: 4, value: '107' },
      { parameterId: 11, value: '63' },
    ],
  },
  {
    listingId: 50,
    parameters: [
      { parameterId: 2, value: '171' },
      { parameterId: 18, value: '192' },
      { parameterId: 19, value: '194' },
      { parameterId: 20, value: '103' },
    ],
  },
  {
    listingId: 51,
    parameters: [
      { parameterId: 2, value: '18' },
      { parameterId: 15, value: '44' },
      { parameterId: 16, value: '145' },
      { parameterId: 17, value: '93' },
    ],
  },
  {
    listingId: 52,
    parameters: [
      { parameterId: 2, value: '1' },
      { parameterId: 4, value: '85' },
      { parameterId: 11, value: '35' },
    ],
  },
  {
    listingId: 53,
    parameters: [
      { parameterId: 2, value: '31' },
      { parameterId: 18, value: '64' },
      { parameterId: 19, value: '110' },
      { parameterId: 20, value: '183' },
    ],
  },
  {
    listingId: 54,
    parameters: [
      { parameterId: 2, value: '150' },
      { parameterId: 9, value: '114' },
      { parameterId: 10, value: '72' },
    ],
  },
  {
    listingId: 55,
    parameters: [
      { parameterId: 23, value: '129' },
      { parameterId: 2, value: '159' },
    ],
  },
  {
    listingId: 56,
    parameters: [
      { parameterId: 2, value: '72' },
      { parameterId: 22, value: '69' },
    ],
  },
  {
    listingId: 57,
    parameters: [
      { parameterId: 2, value: '80' },
      { parameterId: 4, value: '83' },
      { parameterId: 11, value: '112' },
    ],
  },
  {
    listingId: 58,
    parameters: [
      { parameterId: 2, value: '87' },
      { parameterId: 4, value: '71' },
      { parameterId: 11, value: '127' },
    ],
  },
  {
    listingId: 59,
    parameters: [
      { parameterId: 2, value: '107' },
      { parameterId: 4, value: '157' },
      { parameterId: 11, value: '177' },
    ],
  },
  {
    listingId: 60,
    parameters: [
      { parameterId: 2, value: '138' },
      { parameterId: 22, value: '159' },
    ],
  },
  {
    listingId: 61,
    parameters: [
      { parameterId: 2, value: '161' },
      { parameterId: 4, value: '103' },
      { parameterId: 11, value: '175' },
    ],
  },
  {
    listingId: 62,
    parameters: [
      { parameterId: 2, value: '126' },
      { parameterId: 4, value: '94' },
      { parameterId: 21, value: '142' },
    ],
  },
  {
    listingId: 63,
    parameters: [
      { parameterId: 2, value: '59' },
      { parameterId: 24, value: '4' },
      { parameterId: 25, value: '194' },
    ],
  },
  {
    listingId: 64,
    parameters: [
      { parameterId: 2, value: '147' },
      { parameterId: 22, value: '84' },
    ],
  },
  {
    listingId: 65,
    parameters: [
      { parameterId: 2, value: '101' },
      { parameterId: 9, value: '4' },
      { parameterId: 10, value: '55' },
    ],
  },
  {
    listingId: 66,
    parameters: [
      { parameterId: 23, value: '55' },
      { parameterId: 2, value: '91' },
    ],
  },
  {
    listingId: 67,
    parameters: [
      { parameterId: 2, value: '157' },
      { parameterId: 4, value: '125' },
      { parameterId: 21, value: '168' },
    ],
  },
  {
    listingId: 68,
    parameters: [
      { parameterId: 2, value: '48' },
      { parameterId: 9, value: '48' },
      { parameterId: 10, value: '119' },
    ],
  },
  {
    listingId: 69,
    parameters: [
      { parameterId: 2, value: '186' },
      { parameterId: 22, value: '164' },
    ],
  },
  {
    listingId: 70,
    parameters: [
      { parameterId: 2, value: '187' },
      { parameterId: 22, value: '177' },
    ],
  },
  {
    listingId: 71,
    parameters: [
      { parameterId: 2, value: '137' },
      { parameterId: 18, value: '108' },
      { parameterId: 19, value: '95' },
      { parameterId: 20, value: '56' },
    ],
  },
  {
    listingId: 72,
    parameters: [
      { parameterId: 2, value: '191' },
      { parameterId: 4, value: '194' },
      { parameterId: 11, value: '16' },
    ],
  },
  {
    listingId: 73,
    parameters: [
      { parameterId: 2, value: '166' },
      { parameterId: 27, value: '9' },
      { parameterId: 28, value: '198' },
      { parameterId: 29, value: '42' },
      { parameterId: 26, value: '31' },
      { parameterId: 31, value: '174' },
      { parameterId: 33, value: 'SHS' },
      { parameterId: 33, value: '196' },
      { parameterId: 34 },
      { parameterId: 34, value: '166' },
      { parameterId: 35, value: 'MTC Type 2.2' },
      { parameterId: 35, value: '136' },
    ],
  },
  {
    listingId: 74,
    parameters: [
      { parameterId: 2, value: '131' },
      { parameterId: 24, value: '127' },
      { parameterId: 25, value: '182' },
    ],
  },
  {
    listingId: 75,
    parameters: [
      { parameterId: 2, value: '191' },
      { parameterId: 22, value: '96' },
    ],
  },
  {
    listingId: 76,
    parameters: [
      { parameterId: 2, value: '84' },
      { parameterId: 4, value: '170' },
      { parameterId: 21, value: '157' },
    ],
  },
  {
    listingId: 77,
    parameters: [
      { parameterId: 2, value: '166' },
      { parameterId: 9, value: '114' },
      { parameterId: 10, value: '138' },
    ],
  },
  {
    listingId: 78,
    parameters: [
      { parameterId: 2, value: '118' },
      { parameterId: 22, value: '135' },
    ],
  },
  {
    listingId: 79,
    parameters: [
      { parameterId: 2, value: '61' },
      { parameterId: 22, value: '124' },
    ],
  },
  {
    listingId: 80,
    parameters: [
      { parameterId: 2, value: '106' },
      { parameterId: 4, value: '94' },
      { parameterId: 21, value: '177' },
    ],
  },
  {
    listingId: 81,
    parameters: [
      { parameterId: 23, value: '120' },
      { parameterId: 2, value: '47' },
    ],
  },
  {
    listingId: 82,
    parameters: [
      { parameterId: 2, value: '81' },
      { parameterId: 18, value: '38' },
      { parameterId: 19, value: '182' },
      { parameterId: 20, value: '108' },
    ],
  },
  {
    listingId: 83,
    parameters: [
      { parameterId: 23, value: '85' },
      { parameterId: 2, value: '150' },
    ],
  },
  {
    listingId: 84,
    parameters: [
      { parameterId: 2, value: '117' },
      { parameterId: 4, value: '185' },
      { parameterId: 21, value: '84' },
    ],
  },
  {
    listingId: 85,
    parameters: [
      { parameterId: 2, value: '110' },
      { parameterId: 22, value: '195' },
    ],
  },
  {
    listingId: 86,
    parameters: [
      { parameterId: 2, value: '134' },
      { parameterId: 4, value: '56' },
      { parameterId: 11, value: '100' },
    ],
  },
  {
    listingId: 87,
    parameters: [
      { parameterId: 2, value: '127' },
      { parameterId: 22, value: '29' },
    ],
  },
  {
    listingId: 88,
    parameters: [
      { parameterId: 2, value: '149' },
      { parameterId: 4, value: '154' },
      { parameterId: 21, value: '127' },
    ],
  },
  {
    listingId: 89,
    parameters: [
      { parameterId: 2, value: '21' },
      { parameterId: 4, value: '51' },
      { parameterId: 11, value: '173' },
    ],
  },
  {
    listingId: 90,
    parameters: [
      { parameterId: 2, value: '90' },
      { parameterId: 22, value: '199' },
    ],
  },
  {
    listingId: 91,
    parameters: [
      { parameterId: 2, value: '42' },
      { parameterId: 4, value: '49' },
      { parameterId: 11, value: '17' },
    ],
  },
  {
    listingId: 92,
    parameters: [
      { parameterId: 2, value: '7' },
      { parameterId: 22, value: '167' },
    ],
  },
  {
    listingId: 93,
    parameters: [
      { parameterId: 2, value: '131' },
      { parameterId: 4, value: '6' },
      { parameterId: 11, value: '149' },
    ],
  },
  {
    listingId: 94,
    parameters: [
      { parameterId: 23, value: '108' },
      { parameterId: 2, value: '66' },
    ],
  },
  {
    listingId: 95,
    parameters: [
      { parameterId: 2, value: '130' },
      { parameterId: 22, value: '180' },
    ],
  },
  {
    listingId: 96,
    parameters: [
      { parameterId: 2, value: '112' },
      { parameterId: 22, value: '70' },
    ],
  },
  {
    listingId: 97,
    parameters: [
      { parameterId: 2, value: '160' },
      { parameterId: 27, value: '72' },
      { parameterId: 28, value: '143' },
      { parameterId: 29, value: '123' },
      { parameterId: 26, value: '9' },
      { parameterId: 31, value: '135' },
      { parameterId: 33, value: 'UC' },
      { parameterId: 33, value: '82' },
      { parameterId: 34 },
      { parameterId: 34, value: '151' },
      { parameterId: 35, value: 'MTC Type 2.2' },
      { parameterId: 35, value: '137' },
    ],
  },
  {
    listingId: 98,
    parameters: [
      { parameterId: 2, value: '86' },
      { parameterId: 22, value: '52' },
    ],
  },
  {
    listingId: 99,
    parameters: [
      { parameterId: 2, value: '75' },
      { parameterId: 4, value: '186' },
      { parameterId: 11, value: '107' },
    ],
  },
  {
    listingId: 100,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 9, value: '54' },
      { parameterId: 10, value: '1' },
    ],
  },
];

export type { IListingsParametersValue };
export { ListingsParametersValue };
