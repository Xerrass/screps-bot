export var Worker: Role= {
  stats: {
    name: "Worker",
    body: [WORK, CARRY],
    oneMove: true,
    memory: {
      role: "worker",
      full: false
    }
  },
  run: function (creep: Creep) {
    let sites = _.filter(Game.constructionSites, site => site.progress < site.progressTotal);
    creep.say("🛠️");

    if (sites.length > 0) {
      if (!creep.pos.inRangeTo(sites[0], 2)) {
        creep.moveTo(sites[0]);
      } else {
        creep.build(sites[0]);
      }
    }
  }
};
