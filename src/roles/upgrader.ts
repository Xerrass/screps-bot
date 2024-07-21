export var Upgrader: Role = {
  stats: {
    name: "Upgrader",
    body: [WORK],
    oneMove: true,
    oneCarry: true,
    memory: {
      role: "upgrader",
      full: false
    }
  },
  run: function (creep: Creep) {
    if (!creep.pos.inRangeTo(creep.room.controller!.pos, 3)) {
      creep.moveTo(creep.room.controller!);
    } else {
      creep.upgradeController(creep.room.controller!);
    }
  }
};
