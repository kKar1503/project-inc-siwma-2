import Pointer, { PointerMutator } from './pointer';
import cloneDeep from 'lodash.clonedeep';

export interface CreatableStore {
  createStore(newName: string, data?: unknown): Store<unknown>;
}

export interface MutableStore {
  mutate(...mutators: unknown[]): Store<unknown>;
  mutateWithArray(mutators: unknown[]): Store<unknown>;
}

export function createStoreTemplate<T>(defaultData: T, name: string) {
  return new Store<T>(defaultData, name);
}

export default class Store<T> implements CreatableStore, MutableStore {
  private _dataPointer?: Pointer<T>;
  private _default?: T;
  private _isTemplate: boolean;

  constructor(defaultData: T, private _name: string) {
    this._default = defaultData;
    this._isTemplate = true;
    return this;
  }

  public mutate(...mutators: PointerMutator<T>[]) {
    this._dataPointer.callMutators(mutators);
    return this;
  }

  public mutateWithArray(mutators: PointerMutator<T>[]) {
    this._dataPointer.callMutators(mutators);
    return this;
  }

  public createStore(newName: string, data?: T) {
    if (!this._isTemplate) {
      return this;
    }

    let temp = this._default;
    let templateName = this._name;

    // By doing all the mutations before we clone, and then we change the values back, opens the opportunity
    // prevent the need to expose the internal properties like `_isTemplate` and potentially dangerous setters
    // like for the `data` field.
    this._isTemplate = false;
    this._default = undefined;
    this._name = newName;
    if (data !== undefined) {
      this._dataPointer = new Pointer(data);
    } else {
      this._dataPointer = new Pointer(cloneDeep(temp));
    }

    let newStore = cloneDeep(this);

    this._isTemplate = true;
    this._dataPointer = undefined;
    this._default = temp;
    this._name = templateName;

    return newStore;
  }

  public get data() {
    return this._dataPointer.value;
  }

  public get pointer() {
    return this._dataPointer;
  }

  public get default() {
    return this._default;
  }

  public get isTemplate() {
    return this._isTemplate;
  }
}
