// TODO: leaving invites empty for now, please seed this table with data

interface IInvite {
  id?: number;
  name: string;
  email: string;
  token: string;
  expiry?: Date;
  company_id: number;
  created_at?: Date;
}

const Invite: IInvite[] = [];

export type { IInvite };
export { Invite };
