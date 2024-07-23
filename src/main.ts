import screepsMain from "screpsMain";
import { ErrorMapper } from "utils/ErrorMapper";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    scoutRooms: Array<ScoutRoom>;
  }
  interface ScoutRoom {
    name: string
    visited: boolean
    enemy: boolean
  }
  interface CreepMemory {
    role: string;
    room?: string;
    working?: boolean;
    full?: boolean;
    cont?: boolean;
    sid?: number;
    ttl?: boolean;
  }

  interface SpawnMemory {
    extensionsStage: number;
    stage: number;
  }

  interface RoomMemory {
    roadSetup: boolean;
    sources: Array<RoomSource>;
    harvestersNeeded: number;
  }

  interface SourceHarvester {
    harvname: string;
  }
  interface RoomSource {
    id: number;
    plainTiles: number;
    sourceHarv: Array<SourceHarvester>;
  }

  interface Role {
    stats: {
      name: string;
      body: Array<BodyPartConstant>;
      oneMove: boolean;
      oneCarry?: boolean;
      memory: {
        role: string;
        full: boolean;
      };
    };
    run: Function;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);

  //if (Game.cpu.bucket < 100) return;
  //Object.keys(Memory).forEach(k => console.log(`Key ${k} has length ${JSON.stringify(Memory[k]).length}`));

  // Automatically delete memory of missing creeps
  if (Game.time % 10 == 0) {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        for (let room in Game.rooms) {
          for (let source in Game.rooms[room].memory.sources) {
            for (let harv in Game.rooms[room].memory.sources[source].sourceHarv) {
              if (Game.rooms[room].memory.sources[source].sourceHarv[harv].harvname == name)
                Game.rooms[room].memory.sources[source].sourceHarv[harv].harvname = "";
            }
          }
        }
        delete Memory.creeps[name];
      }
    }
  }
  screepsMain();

  //console.log(`Bucket is (${Game.cpu.bucket} of 10,000 | last CPU was ${Game.cpu.getUsed()})`);
});
