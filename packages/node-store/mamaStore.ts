import Store, { CreatableStore } from './store';

export type InferStoreType<T> = T extends Store<infer StoreData> ? StoreData : unknown;

export default class MamaStore<T> {
  constructor(private _stores: T) {}

  public giveBirth<TKey extends keyof T>(
    storeKey: TKey,
    storeName: string,
    data?: InferStoreType<T[TKey]>
  ): T[TKey] {
    let mamaStore = this._stores[storeKey.toString()] as CreatableStore;
    if (data === undefined) {
      return mamaStore.createStore(storeName) as T[TKey];
    } else {
      return mamaStore.createStore(storeName, data) as T[TKey];
    }
  }

  /**
   * `checkDna()` is a method that only supports the following types:
   * - Primitives store
   * - Array store
   * - 1 layer-depth Object
   *
   * While it is possible to support deep layers validation with recursion, I don't think we
   * have any use case for it during Inc.
   */
  public checkDna<TKey extends keyof T>(store: any, storeKey: TKey): store is T[TKey] {
    let storeData = store['data'];
    let _store = this._stores[storeKey]['default'];
    let storeType = typeof storeData;
    let _storeType = typeof _store;

    // Validate primitives
    if (_storeType !== 'object') {
      return storeType === _storeType;
    }

    // Validate arrays
    if (Array.isArray(_store)) {
      return Array.isArray(storeData);
    }

    // Validate object
    if (this.isObj1TwinWithObj2(storeData, _store)) {
      return true;
    }

    // Unable to validate anything
    return false;
  }

  private isObj1TwinWithObj2<T1, T2 extends T1>(obj1: T1, obj2: T2): obj1 is T2 {
    let obj1Keys = Object.keys(obj1).sort();
    let obj2Keys = Object.keys(obj2).sort();

    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }

    for (let i = 0; i < obj1Keys.length; i++) {
      let obj1Key = obj1Keys[i];
      let obj2Key = obj2Keys[i];
      if (obj1Key !== obj2Key || typeof obj1[obj1Key] !== typeof obj2[obj2Key]) {
        return false;
      }
    }

    return true;
  }

  public get keys() {
    return Object.keys(this._stores);
  }
}
