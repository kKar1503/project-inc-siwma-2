interface ICompaniesComments {
  id?: number;
  company_id: number;
  comments: string;
  created_at?: Date;
}

const CompaniesComments: ICompaniesComments[] = [
  {
    company_id: 4,
    comments:
      'The SIWMA website has really automated some of our company’s processes. We now spend less time doing manual work. It’s making advertising and selling our metals very easy for us.',
  },
  {
    company_id: 6,
    comments:
      'SIWMA is the firm to work with if you want to keep up to high standards. The professional workflows they stick to result in exceptional quality.',
  },
  {
    company_id: 3,
    comments:
      'The system has produced a significant competitive advantage in the industry thanks to SIWMA well-thought opinions',
  },
  {
    company_id: 5,
    comments:
      'They are very sharp and have a high-quality team. We expect quality from people, and they have the kind of team we can work with. They were upfront about everything that needed to be done.',
  },
  {
    company_id: 7,
    comments:
      "We are impressed by SIWMA's prices, especially for the project we wanted to do and in comparison to the quotes we received from a lot of other companies.",
  },
];

export type { ICompaniesComments };
export { CompaniesComments };
