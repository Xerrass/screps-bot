export var TransportUpgrader: Role = {
  stats: {
    name: "TransportUpgrader",
    body: [CARRY],
    oneMove: false,
    memory: {
      role: "transportUpgrader",
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

    var upgraders = _.filter(
      Game.creeps,
      creep => creep.memory.role == "upgrader" && creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 30
    );

    creep.say("🚛");

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) >= 0) {
      let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { filter: s => s.amount >= 20 })!;

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
      if (upgraders.length > 0) {
        upgraders.forEach(u => {
          if (creep.transfer(u, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(u);
          }
        });
        return;
      }
    }
  }
};
