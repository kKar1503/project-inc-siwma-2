import { createStoreTemplate, MamaStore, PapaStore } from '@inc/node-store';

interface User {
  first: string;
  last: string;
  age: {
    value: number;
  };
}

type InferFromMama<T> = T extends MamaStore<infer Sons> ? PapaStore<Sons> : never;

const numStoreTemplate = createStoreTemplate(0, 'numTemplate');

const userStoreTemplate = createStoreTemplate<User>(
  {
    first: 'First',
    last: 'Last',
    age: {
      value: 0,
    },
  },
  'userTemplate'
);

let mamaStore = new MamaStore({
  num: numStoreTemplate,
  user: userStoreTemplate,
});

let instance: { instance: InferFromMama<typeof mamaStore> | undefined } = {
  instance: undefined,
};

export function spawnPapa() {
  instance.instance = new PapaStore(mamaStore);
}

export default instance;
