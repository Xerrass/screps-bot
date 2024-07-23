import { Harvester } from "roles/harvester";
import { Transport } from "roles/transport";
import { TransportUpgrader } from "roles/transportUpgrader";
import { Upgrader } from "roles/upgrader";
import { Worker } from "roles/worker";

export function creepsMain(creep: Creep) {
  if (creep.spawning) return;
  let home = Game.spawns.HQ;

  if (creep.ticksToLive! <= 200) creep.memory.ttl = true;

  if (creep.ticksToLive! >= 1400) creep.memory.ttl = false;

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
    case Worker.stats.memory.role:
      Worker.run(creep);
      break;
    case Harvester.stats.memory.role:
      Harvester.run(creep);
      break;
    case Transport.stats.memory.role:
      Transport.run(creep);
      break;
    case Upgrader.stats.memory.role:
      Upgrader.run(creep);
      break;
    case TransportUpgrader.stats.memory.role:
      TransportUpgrader.run(creep);
      break;
  }
}
