export var Transport: Role = {
  stats: {
    name: "T_",
    body: [CARRY],
    oneMove: false,
    memory: {
      role: "transport",
      full: false
    }
  },
  run: function (creep: Creep) {
    creep.say("🚛");
    if (creep.store.getUsedCapacity() == 0) creep.memory.full = false;

    if (creep.store.getFreeCapacity() == 0) creep.memory.full = true;

    if (creep.memory.full) {
      full(creep);
    } else {
      empty(creep);
    }
  }
};

function full(creep: Creep) {
  let core = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_SPAWN
  })! as StructureSpawn;

  let extensions = creep.room.find(FIND_MY_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  })! as StructureExtension[];
  let workers = _.filter(
    Game.creeps,
    creep => creep.memory.role == "worker" && creep.store.getUsedCapacity(RESOURCE_ENERGY) < 20
  )! as Creep[];

  if (creep.transfer(core, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && core.store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
    creep.moveTo(core);
    return;
  }
  if (creep.room.storage) {
    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.storage);
      return;
    }
  }

  if (extensions.length > 0) {
    extensions.forEach(e => {
      if (e.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extensions[0]);
        }
      }
    });
  }
  let towers = creep.room.find(FIND_MY_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_TOWER && s.isActive() && s.store.getFreeCapacity(RESOURCE_ENERGY) > 50
  }) as StructureTower[];

  if (towers.length > 0) {
    if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(towers[0]);
      return;
    }
  }

  if (workers.length > 0 && workers[0].store.getUsedCapacity() <= 10 && extensions.length == 0) {
    if (creep.transfer(workers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(workers[0]);
      return;
    }
  }
  if (creep.room.storage) {
    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.storage);
      return;
    }
  }
}

function empty(creep: Creep) {
  let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
    filter: s => s.amount >= creep.store.getCapacity() / 1.5
  })!;
  if (creep.pickup(res) == ERR_NOT_IN_RANGE) {
    creep.moveTo(res, { reusePath: 5 });
  } else {
    creep.memory.full = true;
  }
}
