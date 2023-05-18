interface ISibKeys {
  key: string;
  remainingCount?: number;
  senderEmail: string;
}

const SibKeys: ISibKeys[] = [
  {
    key: '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',
    senderEmail: 'karandeepsingh00@icloud.com',
  },
  {
    key: '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',
    senderEmail: 'garliclaunch@gmail.com',
  },
];

export type { ISibKeys };
export { SibKeys };
