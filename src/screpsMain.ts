import { Harvester } from "roles/harvester";
import { Transport } from "roles/transport";
import { TransportUpgrader } from "roles/transportUpgrader";
import { Upgrader } from "roles/upgrader";
import { Worker } from "roles/worker";
import { RoomSetup } from "room/roomSetup";
import { runSpawner } from "structures/spawner";
import { Towers } from "towerRoles/mainTower";
import scoreboard from "utils/scoreboard";

export default function screepsMain() {
  let home = Game.spawns.HQ;
  let CPU = false;

  if (Game.time % 10 == 1) {
    for (let room in Game.rooms) {
      if (typeof Game.rooms[room].memory.sources === "undefined") {
        RoomSetup.setupSources(Game.rooms[room]);
        console.log("Room Setup - Sources Setup");
      }
    }
  }

  Object.values(Game.spawns).forEach(spawn => {
    runSpawner(spawn);
  });

  Object.values(Game.rooms).forEach(room => {
    let towers = room.find(FIND_MY_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER && s.isActive() }) as StructureTower[];
    Object.values(towers).forEach(tower => {
      Towers.run(tower);
    });
  });

  Object.values(Game.creeps).forEach(creep => {
    if (creep.spawning) return;

    if (creep.ticksToLive! <= 100) creep.memory.ttl = true;

    if (creep.ticksToLive! >= 1200) creep.memory.ttl = false;

    if (creep.memory.ttl) {
      creep.moveTo(home);
      creep.say("Ttl");
      return;
    }

    if (creep.memory.role === "sacrifice") {
      creep.moveTo(24, 25);
      creep.say("🪦");
    }

    switch (creep.memory.role) {
      case "worker":
        Worker.run(creep);
        break;
      case "harvester":
        Harvester.run(creep);
        break;
      case "transport":
        Transport.run(creep);
        break;
      case "upgrader":
        Upgrader.run(creep);
        break;
      case "transportUpgrader":
        TransportUpgrader.run(creep);
        break;
    }
  });
  if (CPU) console.log("Creeps CPU After:" + Game.cpu.getUsed());

  scoreboard();

  if (CPU) console.log("Scoreboard CPU After:" + Game.cpu.getUsed());
}
