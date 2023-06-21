export type Occupants = [User1: string, User2: string];

export default class OccupantsSet {
  #occupants: Occupants[];

  constructor(occupants?: Occupants) {
    this.#occupants = [];

    if (occupants) {
      this.#occupants.push(occupants);
    }
  }

  add(occupants: Occupants) {
    for (const occupant of this.#occupants) {
      if (occupant[0] === occupants[0] && occupant[1] === occupants[1]) {
        return false;
      }

      if (occupant[0] === occupants[1] && occupant[1] === occupants[0]) {
        return false;
      }
    }

    this.#occupants.push(occupants);
  }

  delete(occupants: Occupants) {
    for (let i = 0; i < this.#occupants.length; i++) {
      const occupant = this.#occupants[i];

      if (occupant[0] === occupants[0] && occupant[1] === occupants[1]) {
        this.#occupants.splice(i, 1);
        return true;
      }

      if (occupant[0] === occupants[1] && occupant[1] === occupants[0]) {
        this.#occupants.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  has(occupants: Occupants) {
    for (const occupant of this.#occupants) {
      if (occupant[0] === occupants[0] && occupant[1] === occupants[1]) {
        return true;
      }

      if (occupant[0] === occupants[1] && occupant[1] === occupants[0]) {
        return true;
      }
    }

    return false;
  }

  clear() {
    this.#occupants = [];
  }

  get(index: number) {
    return this.#occupants[index];
  }

  get size() {
    return this.#occupants.length;
  }

  [Symbol.iterator]() {
    return this.#occupants[Symbol.iterator]();
  }
}
