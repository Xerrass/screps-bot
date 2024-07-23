export var Template: Role = {
  stats: {
    name: "Harvester",
    body: [WORK],
    oneMove: true,
    memory: {
      role: "harvester",
      full: false
    }
  },
  run: function (creep: Creep) {
    let done = false;
    if (typeof creep.memory.sid === "undefined") {
      console.log("isundefined for " + creep.name);
      for (let source in creep.room.memory.sources) {
        console.log("source: " + source);
        for (let ss in creep.room.memory.sources[source].sourceHarv) {
          if (creep.room.memory.sources[source].sourceHarv[ss].harvname == "") {
            creep.memory.sid = creep.room.memory.sources[source].id;
            creep.room.memory.sources[source].sourceHarv[ss].harvname = creep.name;
            done = true;
            break;
          }
        }
        if (done) break;
      }
    }
    let engSource = creep.room.find(FIND_SOURCES)[creep.memory.sid!];
    //console.log(engSource);
    if (!creep.pos.inRangeTo(engSource, 1)) {
      creep.moveTo(engSource);
    } else {
      creep.harvest(engSource);
    }
    creep.drop(RESOURCE_ENERGY);
  }
};
