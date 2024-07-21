export var Transport: Role = {
  stats: {
    name: "Transport",
    body: [CARRY],
    oneMove: false,
    memory: {
      role: "transport",
      full: false
    }
  },
  run: function (creep: Creep) {
    let engSource = creep.room.find(FIND_SOURCES_ACTIVE)[0];
    /* let storage = creep.room.find(FIND_MY_STRUCTURES, {
   filter: s => s.structureType === STRUCTURE_STORAGE && s.pos.findInRange(FIND_SOURCES, 2).length === 0
 });*/
    //console.log('source is '+engSource);
    let core: StructureSpawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    })!;

    let extensions: Array<StructureExtension> = creep.room.find(FIND_MY_STRUCTURES, {
      filter: s => s.structureType == STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    })!;
    let workers = _.filter(
      Game.creeps,
      creep => creep.memory.role == "worker" && creep.store.getUsedCapacity(RESOURCE_ENERGY) < 20
    )!;

    creep.say("🚛");

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) >= 0) {
      let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { filter: s => s.amount >= 100 })!;

      if (creep.pickup(res) == ERR_NOT_IN_RANGE) {
        creep.moveTo(res);
      }
    }
    if (creep.store.getUsedCapacity() > 0) {
      if (
        creep.transfer(core, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
        core.store.getFreeCapacity(RESOURCE_ENERGY) != 0
      ) {
        creep.moveTo(core);
        return;
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

      if (workers.length > 0 && workers[0].store.getUsedCapacity() <= 10 && extensions.length == 0) {
        if (creep.transfer(workers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(workers[0]);
          return;
        }
      }
    }
  }
};
