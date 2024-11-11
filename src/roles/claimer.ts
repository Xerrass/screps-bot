export var Claimer: Role = {
  stats: {
    name: "C_",
    body: [CLAIM],
    oneMove: true,
    memory: {
      role: "claimer",
    }
  },
  run: function (creep: Creep) {
    let done = false;
    if (typeof creep.memory.room === "undefined") {
      console.log("isundefined for " + creep.name);
      for (let source in creep.room.memory.sources) {
        console.log("source: " + source);
        for (let ss in Memory.scoutRooms) {
          if (Memory.scoutRooms[ss].scoutCreep == "") {
            creep.memory.room = Memory.scoutRooms[ss].name;
            Memory.scoutRooms[ss].scoutCreep = creep.name;
            done = true;
            break;
          }
        }
        if (done) break;
      }
    }

    if (creep.room.name != creep.memory.room){
      creep.moveTo(new RoomPosition(25,25, creep.room.name))
    }

  }
};
