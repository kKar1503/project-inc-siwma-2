// TODO: leaving invites empty for now, please seed this table with data

interface IInvite {
  id?: number;
  name: string;
  email: string;
  token: string;
  expiry?: Date;
  companyId: number;
  createdAt?: Date;
}

const Invite: IInvite[] = [];

export type { IInvite };
export { Invite };
