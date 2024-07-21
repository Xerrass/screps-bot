import { Harvester } from "roles/harvester";
import { Transport } from "roles/transport";
import { TransportUpgrader } from "roles/transportUpgrader";
import { Upgrader } from "roles/upgrader";
import { Worker } from "roles/worker";
import { MainBase } from "templates/mainbase";

export function runSpawner(spawner: StructureSpawn) {
  if (!spawner.memory.extensionsStage) spawner.memory.extensionsStage = 0;
  if (!spawner.memory.stage) spawner.memory.stage = 0;


  if (spawner.spawning) return


  var harvesters = _.filter(Game.creeps, creep => creep.memory.role == "harvester");
  var transports = _.filter(Game.creeps, creep => creep.memory.role == "transport");
  var upgraders = _.filter(Game.creeps, creep => creep.memory.role == "upgrader");
  var workers = _.filter(Game.creeps, creep => creep.memory.role == "worker");
  var transportUpgraders = _.filter(Game.creeps, creep => creep.memory.role == "transportUpgrader");
  roomSetup(Game.spawns.HQ.room, Game.spawns.HQ);

  if (harvesters.length < spawner.room.memory.harvestersNeeded) {
    spawnCreepByRole(spawner, Harvester);
  } else if (transports.length < 2) {
    spawnCreepByRole(spawner, Transport);
  } else if (upgraders.length < 2) {
    spawnCreepByRole(spawner, Upgrader);
  } else if (transportUpgraders.length < 1) {
    spawnCreepByRole(spawner, TransportUpgrader);
  } else if (workers.length < 2) {
    spawnCreepByRole(spawner, Worker);
  }
  var ttls = _.filter(Game.creeps, creep => creep.saying == "Ttl");
  var sacri = _.filter(Game.creeps, creeps => creeps.saying == "🪦");

  if (ttls.length > 0) {
    ttls.forEach(creep => {
      spawner.renewCreep(creep);
    });
  }

  if (sacri.length > 0) {
    spawner.recycleCreep(sacri[0]);
  }
}

function spawnCreepByRole(spawn: StructureSpawn, role: Role) {
  if (spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) return;

  console.log(
    spawn.spawnCreep(generateBody(role, spawn.room), role.stats.name + Game.time, {
      memory: role.stats.memory, directions: [RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT]
    })
  );
}

function roomSetup(room: Room, spawner: StructureSpawn) {
  if (!room.memory.roadSetup) {
    for (let road of MainBase.structures.Roads) {
      room.createConstructionSite(spawner.pos.x + road.x, spawner.pos.y + road.y, STRUCTURE_ROAD);
    }

    for (let tower in MainBase.structures.Towers){
      room.createConstructionSite(
        MainBase.structures.Towers[tower].x + spawner.pos.x,
        MainBase.structures.Towers[tower].y + spawner.pos.y,
        STRUCTURE_TOWER
      );
    }


    let engSource = spawner.room.find(FIND_SOURCES);
    engSource.forEach(element => {
      let closestRoadConst = element.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        ignoreCreeps: true,
        filter: s => s.structureType == "road"
      })!;
      if (typeof closestRoadConst === "undefined") {
        let closestRoad = element.pos.findClosestByPath(FIND_STRUCTURES, {
          ignoreCreeps: true,
          filter: s => s.structureType == "road"
        })!;
        let path = room.findPath(closestRoad.pos, element.pos, { ignoreCreeps: true });
        path.forEach(pos => {
          room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        });
      } else {
        let path = room.findPath(closestRoadConst.pos, element.pos, { ignoreCreeps: true });
        path.forEach(pos => {
          room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        });
      }
    });
    room.memory.roadSetup = true;
  }

  for (let extension of MainBase.structures.Extensions) {
    room.createConstructionSite(spawner.pos.x + extension.x, spawner.pos.y + extension.y, STRUCTURE_EXTENSION);
  }
}

function generateBody(creepRole: Role, room: Room) {
  let body: Array<BodyPartConstant> = new Array<BodyPartConstant>();
  let avEng = room.energyAvailable;
  console.log(avEng);

  if (creepRole.stats.oneMove) {
    body.push("move");
    avEng -= 50;
  } else {
    let engDrained = 0;
    for (let i = 0; i < avEng / 2; i += 50) {
      body.push("move");
      engDrained += 50;
    }
    avEng = avEng - engDrained;
  }
  if (creepRole.stats.oneCarry){
    body.push("carry")
    avEng -= 50
  }

  console.log(avEng);
  let i2 = 0;
  while (i2 < avEng) {
    let rand = Math.floor(Math.random() * creepRole.stats.body.length);
    console.log(BODYPART_COST[creepRole.stats.body[rand]]);
    if (BODYPART_COST[creepRole.stats.body[rand]] <= avEng) {
      body.push(creepRole.stats.body[rand]);
    }
    avEng -= BODYPART_COST[creepRole.stats.body[rand]];
  }
  console.log(body);

  return body;
}
