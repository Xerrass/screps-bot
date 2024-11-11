import { creepsMain } from "creepMain";
import { RoomSetup } from "room/roomSetup";
import { runSpawner } from "structures/spawner";
import { Towers } from "towerRoles/mainTower";
import scoreboard from "utils/scoreboard";

export default function screepsMain() {
  let CPU = false;

  if (Game.time % 25 == 0) {
    for (let room in Game.rooms) {
      if (typeof Game.rooms[room].memory.sources === "undefined") {
        RoomSetup.setupSources(Game.rooms[room]);
        console.log("Room Setup - Sources Setup");
      }
    }
  }

  Object.values(Game.rooms).forEach(room => {
    let beforeRoom = Game.cpu.getUsed();
    if (Game.time % 1 == 0) {
      room;
    }
    if (room.find(FIND_HOSTILE_CREEPS).length > 2 || room.find(FIND_HOSTILE_POWER_CREEPS).length > 2)
      room.controller?.activateSafeMode();

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
