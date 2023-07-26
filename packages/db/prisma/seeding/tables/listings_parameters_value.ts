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
      { parameterId: 2, value: '16' },
      { parameterId: 9, value: '63' },
      { parameterId: 10, value: '139' },
    ],
  },
  {
    listingId: 2,
    parameters: [
      { parameterId: 2, value: '2' },
      { parameterId: 9, value: '4' },
      { parameterId: 10, value: '43' },
    ],
  },
  {
    listingId: 3,
    parameters: [
      { parameterId: 2, value: '58' },
      { parameterId: 9, value: '32' },
      { parameterId: 10, value: '1' },
    ],
  },
  {
    listingId: 4,
    parameters: [
      { parameterId: 2, value: '169' },
      { parameterId: 22, value: '136' },
    ],
  },
  {
    listingId: 5,
    parameters: [
      { parameterId: 23, value: '160' },
      { parameterId: 2, value: '64' },
    ],
  },
  {
    listingId: 6,
    parameters: [
      { parameterId: 23, value: '176' },
      { parameterId: 2, value: '129' },
    ],
  },
  {
    listingId: 7,
    parameters: [
      { parameterId: 23, value: '173' },
      { parameterId: 2, value: '184' },
    ],
  },
  {
    listingId: 8,
    parameters: [
      { parameterId: 23, value: '144' },
      { parameterId: 2, value: '9' },
    ],
  },
  {
    listingId: 9,
    parameters: [
      { parameterId: 2, value: '95' },
      { parameterId: 22, value: '62' },
    ],
  },
  {
    listingId: 10,
    parameters: [
      { parameterId: 2, value: '107' },
      { parameterId: 4, value: '110' },
      { parameterId: 11, value: '36' },
    ],
  },
  {
    listingId: 11,
    parameters: [
      { parameterId: 2, value: '131' },
      { parameterId: 4, value: '90' },
      { parameterId: 21, value: '198' },
    ],
  },
  {
    listingId: 12,
    parameters: [
      { parameterId: 2, value: '36' },
      { parameterId: 24, value: '44' },
      { parameterId: 25, value: '98' },
    ],
  },
  {
    listingId: 13,
    parameters: [
      { parameterId: 2, value: '188' },
      { parameterId: 22, value: '104' },
    ],
  },
  {
    listingId: 14,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 4, value: '64' },
      { parameterId: 11, value: '158' },
    ],
  },
  {
    listingId: 15,
    parameters: [
      { parameterId: 2, value: '185' },
      { parameterId: 9, value: '72' },
      { parameterId: 10, value: '77' },
    ],
  },
  {
    listingId: 16,
    parameters: [
      { parameterId: 2, value: '132' },
      { parameterId: 9, value: '166' },
      { parameterId: 10, value: '184' },
    ],
  },
  {
    listingId: 17,
    parameters: [
      { parameterId: 2, value: '38' },
      { parameterId: 18, value: '90' },
      { parameterId: 19, value: '191' },
      { parameterId: 20, value: '40' },
    ],
  },
  {
    listingId: 18,
    parameters: [
      { parameterId: 2, value: '93' },
      { parameterId: 9, value: '53' },
      { parameterId: 10, value: '199' },
    ],
  },
  {
    listingId: 19,
    parameters: [
      { parameterId: 2, value: '90' },
      { parameterId: 15, value: '128' },
      { parameterId: 16, value: '71' },
      { parameterId: 17, value: '88' },
    ],
  },
  {
    listingId: 20,
    parameters: [
      { parameterId: 2, value: '186' },
      { parameterId: 9, value: '52' },
      { parameterId: 10, value: '79' },
    ],
  },
  {
    listingId: 21,
    parameters: [
      { parameterId: 2, value: '14' },
      { parameterId: 9, value: '177' },
      { parameterId: 10, value: '53' },
    ],
  },
  {
    listingId: 22,
    parameters: [
      { parameterId: 2, value: '81' },
      { parameterId: 18, value: '116' },
      { parameterId: 19, value: '115' },
      { parameterId: 20, value: '46' },
    ],
  },
  {
    listingId: 23,
    parameters: [
      { parameterId: 2, value: '178' },
      { parameterId: 22, value: '134' },
    ],
  },
  {
    listingId: 24,
    parameters: [
      { parameterId: 23, value: '147' },
      { parameterId: 2, value: '112' },
    ],
  },
  {
    listingId: 25,
    parameters: [
      { parameterId: 2, value: '118' },
      { parameterId: 15, value: '49' },
      { parameterId: 16, value: '45' },
      { parameterId: 17, value: '38' },
    ],
  },
  {
    listingId: 26,
    parameters: [
      { parameterId: 23, value: '109' },
      { parameterId: 2, value: '141' },
    ],
  },
  {
    listingId: 27,
    parameters: [
      { parameterId: 2, value: '83' },
      { parameterId: 22, value: '79' },
    ],
  },
  {
    listingId: 28,
    parameters: [
      { parameterId: 2, value: '79' },
      { parameterId: 22, value: '69' },
    ],
  },
  {
    listingId: 29,
    parameters: [
      { parameterId: 2, value: '86' },
      { parameterId: 4, value: '76' },
      { parameterId: 21, value: '83' },
    ],
  },
  {
    listingId: 30,
    parameters: [
      { parameterId: 2, value: '43' },
      { parameterId: 4, value: '134' },
      { parameterId: 11, value: '32' },
    ],
  },
  {
    listingId: 31,
    parameters: [
      { parameterId: 2, value: '84' },
      { parameterId: 22, value: '118' },
    ],
  },
  {
    listingId: 32,
    parameters: [
      { parameterId: 2, value: '193' },
      { parameterId: 4, value: '132' },
      { parameterId: 11, value: '49' },
    ],
  },
  {
    listingId: 33,
    parameters: [
      { parameterId: 2, value: '24' },
      { parameterId: 4, value: '152' },
      { parameterId: 21, value: '12' },
    ],
  },
  {
    listingId: 34,
    parameters: [
      { parameterId: 2, value: '157' },
      { parameterId: 22, value: '47' },
    ],
  },
  {
    listingId: 35,
    parameters: [
      { parameterId: 2, value: '108' },
      { parameterId: 22, value: '27' },
    ],
  },
  {
    listingId: 36,
    parameters: [
      { parameterId: 23, value: '124' },
      { parameterId: 2, value: '131' },
    ],
  },
  {
    listingId: 37,
    parameters: [
      { parameterId: 2, value: '19' },
      { parameterId: 22, value: '8' },
    ],
  },
  {
    listingId: 38,
    parameters: [
      { parameterId: 2, value: '185' },
      { parameterId: 4, value: '76' },
      { parameterId: 11, value: '60' },
    ],
  },
  {
    listingId: 39,
    parameters: [
      { parameterId: 2, value: '182' },
      { parameterId: 4, value: '144' },
      { parameterId: 21, value: '193' },
    ],
  },
  {
    listingId: 40,
    parameters: [
      { parameterId: 2, value: '74' },
      { parameterId: 9, value: '140' },
      { parameterId: 10, value: '1' },
    ],
  },
  {
    listingId: 41,
    parameters: [
      { parameterId: 2, value: '76' },
      { parameterId: 18, value: '175' },
      { parameterId: 19, value: '126' },
      { parameterId: 20, value: '3' },
    ],
  },
  {
    listingId: 42,
    parameters: [
      { parameterId: 2, value: '8' },
      { parameterId: 4, value: '195' },
      { parameterId: 21, value: '7' },
    ],
  },
  {
    listingId: 43,
    parameters: [
      { parameterId: 2, value: '126' },
      { parameterId: 4, value: '22' },
      { parameterId: 21, value: '21' },
    ],
  },
  {
    listingId: 44,
    parameters: [
      { parameterId: 2, value: '190' },
      { parameterId: 4, value: '47' },
      { parameterId: 11, value: '187' },
    ],
  },
  {
    listingId: 45,
    parameters: [
      { parameterId: 2, value: '96' },
      { parameterId: 18, value: '53' },
      { parameterId: 19, value: '54' },
      { parameterId: 20, value: '111' },
    ],
  },
  {
    listingId: 46,
    parameters: [
      { parameterId: 2, value: '95' },
      { parameterId: 22, value: '38' },
    ],
  },
  {
    listingId: 47,
    parameters: [
      { parameterId: 2, value: '19' },
      { parameterId: 18, value: '186' },
      { parameterId: 19, value: '41' },
      { parameterId: 20, value: '160' },
    ],
  },
  {
    listingId: 48,
    parameters: [
      { parameterId: 2, value: '149' },
      { parameterId: 18, value: '175' },
      { parameterId: 19, value: '42' },
      { parameterId: 20, value: '17' },
    ],
  },
  {
    listingId: 49,
    parameters: [
      { parameterId: 2, value: '125' },
      { parameterId: 4, value: '134' },
      { parameterId: 11, value: '182' },
    ],
  },
  {
    listingId: 50,
    parameters: [
      { parameterId: 2, value: '198' },
      { parameterId: 18, value: '137' },
      { parameterId: 19, value: '62' },
      { parameterId: 20, value: '7' },
    ],
  },
  {
    listingId: 51,
    parameters: [
      { parameterId: 2, value: '167' },
      { parameterId: 15, value: '49' },
      { parameterId: 16, value: '106' },
      { parameterId: 17, value: '41' },
    ],
  },
  {
    listingId: 52,
    parameters: [
      { parameterId: 2, value: '62' },
      { parameterId: 4, value: '72' },
      { parameterId: 11, value: '53' },
    ],
  },
  {
    listingId: 53,
    parameters: [
      { parameterId: 2, value: '10' },
      { parameterId: 18, value: '138' },
      { parameterId: 19, value: '147' },
      { parameterId: 20, value: '23' },
    ],
  },
  {
    listingId: 54,
    parameters: [
      { parameterId: 2, value: '122' },
      { parameterId: 9, value: '193' },
      { parameterId: 10, value: '44' },
    ],
  },
  {
    listingId: 55,
    parameters: [
      { parameterId: 23, value: '146' },
      { parameterId: 2, value: '131' },
    ],
  },
  {
    listingId: 56,
    parameters: [
      { parameterId: 2, value: '16' },
      { parameterId: 22, value: '56' },
    ],
  },
  {
    listingId: 57,
    parameters: [
      { parameterId: 2, value: '7' },
      { parameterId: 4, value: '92' },
      { parameterId: 11, value: '78' },
    ],
  },
  {
    listingId: 58,
    parameters: [
      { parameterId: 2, value: '26' },
      { parameterId: 4, value: '18' },
      { parameterId: 11, value: '160' },
    ],
  },
  {
    listingId: 59,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 4, value: '37' },
      { parameterId: 11, value: '18' },
    ],
  },
  {
    listingId: 60,
    parameters: [
      { parameterId: 2, value: '159' },
      { parameterId: 22, value: '170' },
    ],
  },
  {
    listingId: 61,
    parameters: [
      { parameterId: 2, value: '190' },
      { parameterId: 4, value: '172' },
      { parameterId: 11, value: '43' },
    ],
  },
  {
    listingId: 62,
    parameters: [
      { parameterId: 2, value: '4' },
      { parameterId: 4, value: '194' },
      { parameterId: 21, value: '165' },
    ],
  },
  {
    listingId: 63,
    parameters: [
      { parameterId: 2, value: '170' },
      { parameterId: 24, value: '65' },
      { parameterId: 25, value: '124' },
    ],
  },
  {
    listingId: 64,
    parameters: [
      { parameterId: 2, value: '94' },
      { parameterId: 22, value: '14' },
    ],
  },
  {
    listingId: 65,
    parameters: [
      { parameterId: 2, value: '102' },
      { parameterId: 9, value: '118' },
      { parameterId: 10, value: '122' },
    ],
  },
  {
    listingId: 66,
    parameters: [
      { parameterId: 23, value: '159' },
      { parameterId: 2, value: '171' },
    ],
  },
  {
    listingId: 67,
    parameters: [
      { parameterId: 2, value: '32' },
      { parameterId: 4, value: '126' },
      { parameterId: 21, value: '130' },
    ],
  },
  {
    listingId: 68,
    parameters: [
      { parameterId: 2, value: '63' },
      { parameterId: 9, value: '50' },
      { parameterId: 10, value: '6' },
    ],
  },
  {
    listingId: 69,
    parameters: [
      { parameterId: 2, value: '69' },
      { parameterId: 22, value: '103' },
    ],
  },
  {
    listingId: 70,
    parameters: [
      { parameterId: 2, value: '167' },
      { parameterId: 22, value: '127' },
    ],
  },
  {
    listingId: 71,
    parameters: [
      { parameterId: 2, value: '191' },
      { parameterId: 18, value: '51' },
      { parameterId: 19, value: '130' },
      { parameterId: 20, value: '117' },
    ],
  },
  {
    listingId: 72,
    parameters: [
      { parameterId: 2, value: '12' },
      { parameterId: 4, value: '90' },
      { parameterId: 11, value: '191' },
    ],
  },
  {
    listingId: 73,
    parameters: [
      { parameterId: 2, value: '135' },
      { parameterId: 27, value: '93' },
      { parameterId: 28, value: '38' },
      { parameterId: 29, value: '65' },
      { parameterId: 26, value: '163' },
      { parameterId: 31, value: '3' },
      { parameterId: 33, value: 'S275' },
      { parameterId: 34, value: 'PFC' },
      { parameterId: 35, value: 'MTC Type 2.2' },
    ],
  },
  {
    listingId: 74,
    parameters: [
      { parameterId: 2, value: '96' },
      { parameterId: 24, value: '130' },
      { parameterId: 25, value: '67' },
    ],
  },
  {
    listingId: 75,
    parameters: [
      { parameterId: 2, value: '105' },
      { parameterId: 22, value: '153' },
    ],
  },
  {
    listingId: 76,
    parameters: [
      { parameterId: 2, value: '168' },
      { parameterId: 4, value: '96' },
      { parameterId: 21, value: '142' },
    ],
  },
  {
    listingId: 77,
    parameters: [
      { parameterId: 2, value: '166' },
      { parameterId: 9, value: '32' },
      { parameterId: 10, value: '35' },
    ],
  },
  {
    listingId: 78,
    parameters: [
      { parameterId: 2, value: '138' },
      { parameterId: 22, value: '151' },
    ],
  },
  {
    listingId: 79,
    parameters: [
      { parameterId: 2, value: '38' },
      { parameterId: 22, value: '200' },
    ],
  },
  {
    listingId: 80,
    parameters: [
      { parameterId: 2, value: '9' },
      { parameterId: 4, value: '35' },
      { parameterId: 21, value: '145' },
    ],
  },
  {
    listingId: 81,
    parameters: [
      { parameterId: 23, value: '2' },
      { parameterId: 2, value: '96' },
    ],
  },
  {
    listingId: 82,
    parameters: [
      { parameterId: 2, value: '39' },
      { parameterId: 18, value: '143' },
      { parameterId: 19, value: '65' },
      { parameterId: 20, value: '189' },
    ],
  },
  {
    listingId: 83,
    parameters: [
      { parameterId: 23, value: '142' },
      { parameterId: 2, value: '110' },
    ],
  },
  {
    listingId: 84,
    parameters: [
      { parameterId: 2, value: '58' },
      { parameterId: 4, value: '111' },
      { parameterId: 21, value: '114' },
    ],
  },
  {
    listingId: 85,
    parameters: [
      { parameterId: 2, value: '64' },
      { parameterId: 22, value: '189' },
    ],
  },
  {
    listingId: 86,
    parameters: [
      { parameterId: 2, value: '34' },
      { parameterId: 4, value: '27' },
      { parameterId: 11, value: '44' },
    ],
  },
  {
    listingId: 87,
    parameters: [
      { parameterId: 2, value: '71' },
      { parameterId: 22, value: '137' },
    ],
  },
  {
    listingId: 88,
    parameters: [
      { parameterId: 2, value: '95' },
      { parameterId: 4, value: '163' },
      { parameterId: 21, value: '71' },
    ],
  },
  {
    listingId: 89,
    parameters: [
      { parameterId: 2, value: '139' },
      { parameterId: 4, value: '150' },
      { parameterId: 11, value: '11' },
    ],
  },
  {
    listingId: 90,
    parameters: [
      { parameterId: 2, value: '29' },
      { parameterId: 22, value: '50' },
    ],
  },
  {
    listingId: 91,
    parameters: [
      { parameterId: 2, value: '168' },
      { parameterId: 4, value: '2' },
      { parameterId: 11, value: '16' },
    ],
  },
  {
    listingId: 92,
    parameters: [
      { parameterId: 2, value: '133' },
      { parameterId: 22, value: '37' },
    ],
  },
  {
    listingId: 93,
    parameters: [
      { parameterId: 2, value: '16' },
      { parameterId: 4, value: '25' },
      { parameterId: 11, value: '141' },
    ],
  },
  {
    listingId: 94,
    parameters: [
      { parameterId: 23, value: '185' },
      { parameterId: 2, value: '158' },
    ],
  },
  {
    listingId: 95,
    parameters: [
      { parameterId: 2, value: '11' },
      { parameterId: 22, value: '29' },
    ],
  },
  {
    listingId: 96,
    parameters: [
      { parameterId: 2, value: '64' },
      { parameterId: 22, value: '103' },
    ],
  },
  {
    listingId: 97,
    parameters: [
      { parameterId: 2, value: '77' },
      { parameterId: 27, value: '96' },
      { parameterId: 28, value: '175' },
      { parameterId: 29, value: '178' },
      { parameterId: 26, value: '185' },
      { parameterId: 31, value: '174' },
      { parameterId: 33, value: 'S355' },
      { parameterId: 34, value: 'SHS' },
      { parameterId: 35, value: 'MTC Type 2.2' },
    ],
  },
  {
    listingId: 98,
    parameters: [
      { parameterId: 2, value: '17' },
      { parameterId: 22, value: '84' },
    ],
  },
  {
    listingId: 99,
    parameters: [
      { parameterId: 2, value: '84' },
      { parameterId: 4, value: '154' },
      { parameterId: 11, value: '43' },
    ],
  },
  {
    listingId: 100,
    parameters: [
      { parameterId: 2, value: '1' },
      { parameterId: 9, value: '152' },
      { parameterId: 10, value: '103' },
    ],
  },
];

export type { IListingsParametersValue };
export { ListingsParametersValue };
