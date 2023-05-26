import cloneDeep from 'lodash.clonedeep';

export type PointerMutator<T> = (data: T) => T;

/**
 * Using the store class allows the user to create a psuedo pointer to any data type, including primitives.
 * This essentially allows us to use the same value across the application.
 *
 * This makes use of the fact that JS passes object by reference, hence wrapping a primitive value, allow us
 * to work with the same value across as a persistent state.
 */
export default class Pointer<T> {
  constructor(public value: T) {}

  /**
   * The `callMutator()` method allows the user to apply a mutator to the value stored in this pointer.
   */
  public callMutators(mutators: PointerMutator<T>[]) {
    for (const mutator of mutators) {
      this.value = mutator(this.value);
    }
  }

  /**
   * The `clone()` method returns a cloned copy of the pointer and the value.
   * This creates a new copy of the value and its pointer. Use this if you want to pass a value
   * that this `Pointer` reference instead of the pointer itself.
   */
  public clone() {
    return new Pointer(cloneDeep(this.value));
  }

  /**
   * A static version of the `.clone()` method.
   */
  static clone<T>(pointer: Pointer<T>): Pointer<T> {
    return pointer.clone();
  }
}
