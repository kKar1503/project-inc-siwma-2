import { createStoreTemplate, MamaStore, PapaStore } from '@inc/node-store';
import logger from '../utils/logger';
import type { Users as User } from '@inc/db';

type RoomOccupants = [Occupant1: string, Occupant2: string];

type InferFromMama<T> = T extends MamaStore<infer Sons> ? PapaStore<Sons> : never;

// ** Data Store Templates
const roomOccupantsTemplate = createStoreTemplate<RoomOccupants>(['', ''], 'roomOccupantsTemplate');
const socketUserTemplate = createStoreTemplate<User | null>(null, 'socketUserTemplate');

let mamaStore = new MamaStore({
  roomOccupants: roomOccupantsTemplate,
  socketUser: socketUserTemplate,
});

let instance: { instance: InferFromMama<typeof mamaStore> | undefined } = {
  instance: undefined,
};

export function spawnPapa() {
  logger.trace('spawnPapa() | Creating new instance of PapaStore.');
  instance.instance = new PapaStore(mamaStore);
}

export default instance;
