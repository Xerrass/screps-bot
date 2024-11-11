export var Worker: Role= {
  stats: {
    name: "W_",
    body: [WORK, CARRY],
    oneMove: false,
    memory: {
      role: "worker",
      full: false
    }
  },
  run: function (creep: Creep) {
    let sites = _.filter(Game.constructionSites, site => site.progress < site.progressTotal);
    creep.say("🛠️");


    if (creep.room.storage && creep.store.getUsedCapacity() == 0) {
      if (
        creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
        creep.room.storage.store.energy >= 3000
      ) {
        creep.moveTo(creep.room.storage);
        return;
      }
    }
    if (sites.length > 0) {
      if (!creep.pos.inRangeTo(sites[0], 2)) {
        creep.moveTo(sites[0]);
      } else {
        creep.build(sites[0]);
      }
    } else {
      creep.moveTo(23, 23)
    }
  }
};
