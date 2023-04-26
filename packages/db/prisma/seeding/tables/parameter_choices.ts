interface IParameterChoices {
  id?: number;
  choice: string[];
  created_at?: Date;
  updated_at?: Date;
}

const ParameterChoices: IParameterChoices[] = [
  {
    choice: ['Long', 'Medium', 'Short'],
  },
  {
    choice: ['short', 'long'],
  },
];

export type { IParameterChoices };
export { ParameterChoices };
