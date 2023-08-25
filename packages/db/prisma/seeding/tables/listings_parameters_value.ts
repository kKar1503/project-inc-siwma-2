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
      { parameterId: 2, value: '64' },
      { parameterId: 26, value: '160' },
      { parameterId: 27, value: '160' },
      { parameterId: 28, value: '64' },
      { parameterId: 29, value: '64' },
      { parameterId: 31, value: '64' },
      { parameterId: 33, value: 'S275' },
      { parameterId: 34, value: 'UB' },
      { parameterId: 35, value: '64' },
    ],
  },
  {
    listingId: 2,
    parameters: [
      { parameterId: 2, value: '21' },
      { parameterId: 22, value: '24' },
      
    ],
  },
  {
    listingId: 3,
    parameters: [
      { parameterId: 2, value: '12' },
      { parameterId: 22, value: '54' },
    ],
  },
  {
    listingId: 4,
    parameters: [
      { parameterId: 2, value: '26' },
      { parameterId: 22, value: '21' },
    ],
  },
  {
    listingId: 5,
    parameters: [
      { parameterId: 2, value: '188' },
      { parameterId: 23, value: '128' },
     
    ],
  },
  {
    listingId: 6,
    parameters: [
      { parameterId: 2, value: '98' },
      { parameterId: 23, value: '38' },
    ],
  },
  {
    listingId: 7,
    parameters: [
      { parameterId: 2, value: '58' },
      { parameterId: 23, value: '11' },
    ],
  },
  {
    listingId: 8,
    parameters: [
      { parameterId: 2, value: '58' },
      { parameterId: 23, value: '121' },
    ],
  },
  {
    listingId: 9,
    parameters: [
      { parameterId: 2, value: '185' },
      { parameterId: 4, value: '72' },
      { parameterId: 21, value: '77' },
    ],
  },
  {
    listingId: 10,
    parameters: [
      { parameterId: 2, value: '93' },
      { parameterId: 4, value: '53' },
      { parameterId: 11, value: '199' },
     
    ],
  },
  {
    listingId: 11,
    parameters: [
      { parameterId: 2, value: '188' },
      { parameterId: 12, value: '64' },
      { parameterId: 13, value: '158' },
      { parameterId: 14, value: '64' },
    ],
  },
  {
    listingId: 12,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 18, value: '109' },
      { parameterId: 19, value: '109' },
      { parameterId: 20, value: '109' },
    ],
  },
  {
    listingId: 13,
    parameters: [
      { parameterId: 2, value: '188' },
      { parameterId: 22, value: '624' },
    ],
  },
  {
    
    listingId: 14,
    parameters: [
      { parameterId: 2, value: '188' },
      { parameterId: 12, value: '614' },
      { parameterId: 13, value: '458' },
      { parameterId: 14, value: '64' },
    ],
  },
  {
    listingId: 15,
    parameters: [
      { parameterId: 2, value: '185' },
      { parameterId: 4, value: '72' },
      { parameterId: 21, value: '77' },
    ],
  },
  {
    listingId: 16,
    parameters: [
      { parameterId: 2, value: '185' },
      { parameterId: 9, value: '712' },
      { parameterId: 10, value: '871' },
    ],
  },
  {
    listingId: 17,
    parameters: [
      { parameterId: 2, value: '64' },
      { parameterId: 23, value: '160' },
    ],
  },
  {
    listingId: 18,
    parameters: [
      { parameterId: 2, value: '145' },
      { parameterId: 9, value: '712' },
      { parameterId: 10, value: '971' },
    ],
  },
  {
    listingId: 19,
    parameters: [
      { parameterId: 2, value: '5123' },
      { parameterId: 15, value: '62' },
      { parameterId: 16, value: '12' },
      { parameterId: 17, value: '61' },
    ],
  },
  {
    listingId: 20,
    parameters: [
      { parameterId: 2, value: '186' },
      { parameterId: 22, value: '79' },
    ],
  },
  {
    listingId: 21,
    parameters: [
      { parameterId: 2, value: '25' },
      { parameterId: 9, value: '612' },
      { parameterId: 10, value: '51' },
    ],
  },
  {
    listingId: 22,
    parameters: [
      { parameterId: 2, value: '112' },
      { parameterId: 23, value: '147' },
    ],
  },
  {
    listingId: 23,
    parameters: [
      { parameterId: 2, value: '93' },
      { parameterId: 4, value: '53' },
      { parameterId: 11, value: '199' },
    ],
  },
  {
    listingId: 24,
    parameters: [
      { parameterId: 2, value: '112' },
      { parameterId: 23, value: '47' },
    ],
  },
  {
    listingId: 25,
    parameters: [
      { parameterId: 2, value: '53' },
      { parameterId: 15, value: '71' },
      { parameterId: 16, value: '91' },
      { parameterId: 17, value: '611' },
    ],
  },
  {
    listingId: 26,
    parameters: [
      { parameterId: 2, value: '12' },
      { parameterId: 23, value: '457' },
    ],
  },
  {
    listingId: 27,
    parameters: [
      { parameterId: 2, value: '26' },
      { parameterId: 24, value: '30' },
      { parameterId: 25, value: '617' },
    ],
  },
  {
    listingId: 28,
    parameters: [
      { parameterId: 2, value: '96' },
      { parameterId: 24, value: '130' },
      { parameterId: 25, value: '67' },
    ],
  },
  {
    listingId: 29,
    parameters: [
      { parameterId: 2, value: '688' },
      { parameterId: 12, value: '644' },
      { parameterId: 13, value: '158' },
      { parameterId: 14, value: '64' },
    ],
  },
  {
    listingId: 30,
    parameters: [
      { parameterId: 2, value: '112' },
      { parameterId: 23, value: '147' },
    ],
  },
  {
    listingId: 31,
    parameters: [
      { parameterId: 2, value: '756' },
      { parameterId: 4, value: '32' },
      { parameterId: 21, value: '21' },
    ],
  },
  {
    listingId: 32,
    parameters: [
      { parameterId: 2, value: '412' },
      { parameterId: 22, value: '419' },
    ],
  },
  {
    listingId: 33,
    parameters: [
      { parameterId: 2, value: '756' },
      { parameterId: 4, value: '32' },
      { parameterId: 21, value: '21' },
    ],
  },
  {
    listingId: 34,
    parameters: [
      { parameterId: 2, value: '215' },
      { parameterId: 9, value: '662' },
      { parameterId: 10, value: '51' },
    ],
  },
  {
    listingId: 35,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 18, value: '822' },
      { parameterId: 19, value: '751' },
      { parameterId: 20, value: '109' },
    ],
  },
  {
    listingId: 36,
    parameters: [
      { parameterId: 2, value: '1341' },
      { parameterId: 23, value: '1231' },
    ],
  },
  {
    listingId: 37,
    parameters: [
      { parameterId: 2, value: '112' },
      { parameterId: 24, value: '147' },
      { parameterId: 25, value: '512' },
    ],
  },
  {
    listingId: 38,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 4, value: '109' },
      { parameterId: 11, value: '109' },
    ],
  },
  {
    listingId: 39,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 22, value: '158' },
    ],
  },
  {
    listingId: 40,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 9, value: '64' },
      { parameterId: 10, value: '158' },
    ],
  },
  {
    listingId: 41,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 18, value: '119' },
      { parameterId: 19, value: '109' },
      { parameterId: 20, value: '199' },
    ],
  },
  {
    listingId: 42,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 22, value: '109' },
    ],
  },
  {
    listingId: 43,
    parameters: [
      { parameterId: 2, value: '53' },
      { parameterId: 15, value: '641' },
      { parameterId: 16, value: '871' },
      { parameterId: 17, value: '987' },
    ],
  },
  {
    listingId: 44,
    parameters: [
      { parameterId: 2, value: '126' },
      { parameterId: 22, value: '21' },
    ],
  },
  {
    listingId: 45,
    parameters: [
      { parameterId: 2, value: '657' },
      { parameterId: 18, value: '12' },
      { parameterId: 19, value: '634' },
      { parameterId: 20, value: '87546' },
    ],
  },
  {
    listingId: 46,
    parameters: [
      { parameterId: 2, value: '6527' },
      { parameterId: 18, value: '112' },
      { parameterId: 19, value: '1634' },
      { parameterId: 20, value: '546' },
    ],
  },
  {
    listingId: 47,
    parameters: [
      { parameterId: 2, value: '27' },
      { parameterId: 18, value: '1512' },
      { parameterId: 19, value: '634' },
      { parameterId: 20, value: '1546' },
    ],
  },
  {
    listingId: 48,
    parameters: [
      { parameterId: 2, value: '127' },
      { parameterId: 18, value: '512' },
      { parameterId: 19, value: '634' },
      { parameterId: 20, value: '5146' },
    ],
  },
  {
    listingId: 49,
    parameters: [
      { parameterId: 2, value: '125' },
      { parameterId: 22, value: '182' },
    ],
  },
  {
    listingId: 50,
    parameters: [
      { parameterId: 2, value: '126' },
      { parameterId: 4, value: '22' },
      { parameterId: 21, value: '21' },
    ],
  },
  {
    listingId: 51,
    parameters: [
      { parameterId: 2, value: '53' },
      { parameterId: 15, value: '71' },
      { parameterId: 16, value: '91' },
      { parameterId: 17, value: '611' },
    ],
  },
  {
    listingId: 52,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 4, value: '19' },
      { parameterId: 11, value: '29' },
    ],
  },
  {
    listingId: 53,
    parameters: [
      { parameterId: 2, value: '141' },
      { parameterId: 4, value: '19' },
      { parameterId: 21, value: '249' },
    ],
  },
  {
    listingId: 54,
    parameters: [
      { parameterId: 2, value: '13' },
      { parameterId: 9, value: '64' },
      { parameterId: 10, value: '58' },
    ],
  },
  {
    listingId: 55,
    parameters: [
      { parameterId: 2, value: '131' },
      { parameterId: 23, value: '146' },
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
      { parameterId: 11, value: '165' },
    ],
  },
  {
    listingId: 63,
    parameters: [
      { parameterId: 2, value: '127' },
      { parameterId: 18, value: '76' },
      { parameterId: 19, value: '81' },
      { parameterId: 20, value: '146' },
    ],
  },
  {
    listingId: 64,
    parameters: [
      { parameterId: 2, value: '94' },
      { parameterId: 4, value: '94' },
      { parameterId: 21, value: '14' },
    ],
  },
  {
    listingId: 65,
    parameters: [
      { parameterId: 2, value: '102' },
      { parameterId: 22, value: '122' },
    ],
  },
  {
    listingId: 66,
    parameters: [
      { parameterId: 2, value: '171' },
      { parameterId: 23, value: '159' },
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
      { parameterId: 2, value: '4' },
      { parameterId: 4, value: '94' },
      { parameterId: 11, value: '165' },
    ],
  },
  {
    listingId: 71,
    parameters: [
      { parameterId: 2, value: '619' },
      { parameterId: 23, value: '671' },
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
      { parameterId: 24, value: '93' },
      { parameterId: 25, value: '38' },
    ],
  },
  {
    listingId: 74,
    parameters: [
      { parameterId: 2, value: '139' },
      { parameterId: 18, value: '123' },
      { parameterId: 19, value: '65' },
      { parameterId: 20, value: '189' },
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
      { parameterId: 22, value: '35' },
    ],
  },
  {
    listingId: 78,
    parameters: [
      { parameterId: 2, value: '88' },
      { parameterId: 12, value: '544' },
      { parameterId: 13, value: '1258' },
      { parameterId: 14, value: '4' },
    ],
  },
  {
    listingId: 79,
    parameters: [
      { parameterId: 2, value: '38' },
      { parameterId: 4, value: '38' },
      { parameterId: 11, value: '200' },
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
      { parameterId: 9, value: '65' },
      { parameterId: 10, value: '189' },
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
      { parameterId: 2, value: '95' },
      { parameterId: 4, value: '163' },
      { parameterId: 21, value: '71' },
    ],
  },
  {
    listingId: 88,
    parameters: [
      { parameterId: 2, value: '195' },
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
      { parameterId: 2, value: '88' },
      { parameterId: 12, value: '144' },
      { parameterId: 13, value: '1258' },
      { parameterId: 14, value: '144' },
    ],
  },
  {
    listingId: 91,
    parameters: [
      { parameterId: 2, value: '168' },
      { parameterId: 23, value: '2' },
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
      { parameterId: 2, value: '158' },
      { parameterId: 23, value: '185' },
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
      { parameterId: 24, value: '103' },
      { parameterId: 25, value: '1013' },
    ],
  },
  {
    listingId: 97,
    parameters: [
      { parameterId: 2, value: '87' },
      { parameterId: 24, value: '612' },
      { parameterId: 25, value: '598' },
    ],
  },
  {
    listingId: 98,
    parameters: [
      { parameterId: 2, value: '17' },
      { parameterId: 9, value: '84' },
      { parameterId: 10, value: '761' },
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
      { parameterId: 2, value: '64' },
      { parameterId: 26, value: '160' },
      { parameterId: 27, value: '160' },
      { parameterId: 28, value: '64' },
      { parameterId: 29, value: '64' },
      { parameterId: 31, value: '64' },
      { parameterId: 33, value: 'S275' },
      { parameterId: 34, value: 'UB' },
      { parameterId: 35, value: '64' },
    ],
  },
];

export type { IListingsParametersValue };
export { ListingsParametersValue };
