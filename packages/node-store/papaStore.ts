import MamaStore, { InferStoreType } from './mamaStore';

export default class PapaStore<TStoreMaps> {
  private _stores: Map<
    string,
    {
      [K in keyof TStoreMaps]: TStoreMaps[K] | null;
    }
  >;

  constructor(private _mama: MamaStore<TStoreMaps>) {
    this._stores = new Map();
  }

  public meetNewStepmom<TStoreKey extends keyof TStoreMaps>(
    key: string,
    store: TStoreKey,
    data?: InferStoreType<TStoreMaps[TStoreKey]>
  ) {
    let hasStepmom = this._stores.has(key);
    if (hasStepmom) {
      let stepMom = this._stores.get(key);
      if (stepMom[store] === null) {
        let newSon = this._mama.giveBirth(store, key, data);
        stepMom[store] = newSon;
      }
    } else {
      let newSon = this._mama.giveBirth(store, key, data);
      let newStepmom = Object.fromEntries(
        this._mama.keys.map((k) => {
          if (k === store) {
            return [k, newSon];
          }
          return [k, null];
        })
      ) as unknown as {
        [K in keyof TStoreMaps]: TStoreMaps[K] | null;
      };
      this._stores.set(key, newStepmom);
    }
  }

  public getStepmom(key: string) {
    return this._stores.get(key);
  }

  public getSon<TStoreKey extends keyof TStoreMaps>(key: string, store: TStoreKey) {
    return this._stores.get(key)[store];
  }

  public buyMilk(key: string, store: keyof TStoreMaps) {
    if (!this._stores.has(key)) {
      return;
    }

    let stepmom = this._stores.get(key);

    if (stepmom[store] === null) {
      return;
    }

    stepmom[store] = null;
  }

  public divorce(key: string) {
    return this._stores.delete(key);
  }
}
