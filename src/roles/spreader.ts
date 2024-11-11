export var Spreader: Role = {
  stats: {
    name: "SP_",
    body: [CARRY],
    oneMove: false,
    memory: {
      role: "spreader",
      full: false
    }
  },
  run: function (creep: Creep) {
    if (creep.store.getUsedCapacity() == 0) creep.memory.full = false;

    if (creep.store.getFreeCapacity() == 0) creep.memory.full = true;

    if (creep.memory.full) {
      full(creep);
    } else {
      empty(creep);
    }
  }
};

function empty(creep: Creep) {
  if (!creep.room.storage) {
    creep.suicide();
  }
  if (creep.withdraw(creep.room.storage!, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.storage!);
  }
}
function full(creep: Creep) {
  let core = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_SPAWN
  })! as StructureSpawn;

  if (creep.transfer(core, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && core.store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
    creep.moveTo(core);
    return;
  }

  let extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  })! as StructureExtension;

  if (extension) {
    if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(extension);
    }
  }

  let towers = creep.room.find(FIND_MY_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_TOWER && s.isActive() && s.store.getFreeCapacity(RESOURCE_ENERGY) > 200
  }) as StructureTower[];
  if (towers.length > 0) {
    if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(towers[0]);
      return;
    }
  }
}
