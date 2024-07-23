export var MainBase: Base = {
  structures: {
    Extensions: [
      // Oebn links

      { x: -2, y: -1 },
      { x: -3, y: -1 },
      { x: -1, y: -2 },
      { x: -2, y: -2 },
      { x: -3, y: -2 },
      { x: -1, y: -3 },
      { x: -2, y: -3 },

      //Unten Links
      { x: -2, y: +1 },
      { x: -3, y: +1 },
      { x: -1, y: +2 },
      { x: -2, y: +2 },
      { x: -3, y: +2 },
      { x: -1, y: +3 },
      { x: -2, y: +3 },

      // Oebn rechts

      { x: 2, y: -1 },
      { x: 3, y: -1 },
      { x: 1, y: -2 },
      { x: 2, y: -2 },
      { x: 3, y: -2 },
      { x: 1, y: -3 },
      { x: 2, y: -3 },

      //Unten rechts
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 }
    ],
    Roads: [
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: +1 },
      { x: +1, y: 0 },
      { x: 0, y: -2 },
      { x: -2, y: 0 },
      { x: 0, y: +2 },
      { x: +2, y: 0 },
      { x: -3, y: 0 },
      { x: +3, y: 0 },
      { x: 0, y: -3 },
      { x: 0, y: +3 },
      { x: +4, y: +1 },
      { x: +4, y: +2 },
      { x: +3, y: +3 },
      { x: +4, y: -1 },
      { x: +4, y: -2 },
      { x: +3, y: -3 },
      { x: -4, y: +1 },
      { x: -4, y: +2 },
      { x: -3, y: +3 },
      { x: -4, y: -1 },
      { x: -4, y: -2 },
      { x: +4, y: +1 },
      { x: +4, y: +2 },
      { x: +3, y: +3 },
      { x: -3, y: -3 },
      { x: +4, y: -1 },
      { x: +4, y: -2 },
      { x: +3, y: -3 },

      { x: +1, y: +4 },
      { x: +2, y: +4 },
      { x: +1, y: -4 },
      { x: +2, y: -4 },
      { x: -1, y: -4 },
      { x: -2, y: -4 },
      { x: -1, y: +4 },
      { x: -2, y: +4 },
      { x: -5, y: 0 },
      { x: +5, y: 0 },
      { x: 0, y: +5 },
      { x: 0, y: -5 }
    ],
    Walls: [],
    Rampparts: [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 4 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
      { x: -1, y: 4 },
      { x: -2, y: 4 },
      { x: -3, y: 3 },
      { x: -4, y: 2 },
      { x: -4, y: 1 },
      { x: -4, y: 0 },
      { x: -4, y: -1 },
      { x: -4, y: -2 },
      { x: -3, y: -3 },
      { x: -2, y: -4 },
      { x: -1, y: -4 },
      { x: 0, y: -4 },
      { x: 1, y: -4 },
      { x: 2, y: -4 },
      { x: 3, y: -3 },
      { x: 4, y: -2 },
      { x: 4, y: -1 }
    ],
    Towers: [
      { x: 0, y: -4 },
      { x: 0, y: 4 },
      { x: -4, y: 0 },
      { x: 4, y: 0 }
    ],
    Links: [{ x: -1, y: 1 }],
    Exits: [],
    storagePos: { x: 1, y: 1 }
  }
};

interface Base {
  structures: {
    Extensions: Array<Offset>;
    Roads: Array<Offset>;
    Walls: Array<Offset>;
    Rampparts: Array<Offset>;
    Towers: Array<Offset>;
    Links: Array<Offset>;
    Exits: Array<Offset>;
    storagePos: Offset;
  };
}

interface Offset {
  x: number;
  y: number;
}
