import { creepsMain } from "creepMain";
import { RoomSetup } from "room/roomSetup";
import { runSpawner } from "structures/spawner";
import { Towers } from "towerRoles/mainTower";
import scoreboard from "utils/scoreboard";

export default function screepsMain() {
  let CPU = true;

  if (Game.time % 10 == 1) {
    for (let room in Game.rooms) {
      if (typeof Game.rooms[room].memory.sources === "undefined") {
        RoomSetup.setupSources(Game.rooms[room]);
        console.log("Room Setup - Sources Setup");
      }
    }
  }

  Object.values(Game.rooms).forEach(room => {
    let beforeRoom = Game.cpu.getUsed()
    let towers = room.find(FIND_MY_STRUCTURES, {
      filter: s => s.structureType == STRUCTURE_TOWER && s.isActive()
    }) as StructureTower[];
    Object.values(towers).forEach(tower => {
      Towers.run(tower);
    });

    let spawns = room.find(FIND_MY_SPAWNS);
    Object.values(spawns).forEach(spawn => {
      runSpawner(spawn);
    });

      let beforeCreep = Game.cpu.getUsed();
    let creeps = room.find(FIND_MY_CREEPS);
    Object.values(creeps).forEach(creep => {
      creepsMain(creep);
    });
      if (CPU) console.log("Room CPU: " + (Game.cpu.getUsed() - beforeRoom));
  });

  let beforeScoreboard = Game.cpu.getUsed();
  scoreboard();
  if (CPU) console.log("Scoreboard CPU: " + (Game.cpu.getUsed() - beforeScoreboard));
}
