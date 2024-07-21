import { MainBase } from "templates/mainbase";

export var RoomSetup = {
  setupSources: function (room: Room) {
    let positions = [
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ];
    let terain = room.getTerrain();
    let sources = room.find(FIND_SOURCES);
    let plainSpots = 0;
    room.memory.sources = new Array<RoomSource>();
    for (let s = 0; s < sources.length; s++) {
      for (let i = 0; i < positions.length; i++) {
        if (terain.get(sources[s].pos.x + positions[i].x, sources[s].pos.y + positions[i].y) == 0) {
          plainSpots++;
        }
      }
      if (plainSpots < 2) {
        room.memory.sources.push({
          id: s,
          plainTiles: plainSpots,
          sourceHarv: [{ harvname: "" }]
        });
      } else {
        room.memory.sources.push({ id: s, plainTiles: plainSpots, sourceHarv: [{ harvname: "" }, { harvname: "" }] });
      }
      plainSpots = 0;
    }
    let harvesters = 0;
    for (let s = 0; s < room.memory.sources.length; s++) {
      if (room.memory.sources[s].plainTiles < 2) {
        harvesters++;
      } else {
        harvesters += 2;
      }
    }
    room.memory.harvestersNeeded = harvesters;
  },

};
