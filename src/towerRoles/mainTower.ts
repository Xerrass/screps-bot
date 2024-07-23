import { object } from "lodash";

export var Towers = {
  run: function (tower: StructureTower) {
    let enemys = tower.room.find(FIND_HOSTILE_CREEPS);
    Object.values(enemys).forEach( enemy => {
        if (enemy.owner.username != "Harabi")
        tower.attack(enemys[0]);
    })
    let mystrucfind = tower.room.find(FIND_MY_STRUCTURES, { filter: s => s.hits < s.hitsMax && s.hits < 100000 })as AnyOwnedStructure[]
    let repairStructures = _.min(mystrucfind, 'hits') as AnyOwnedStructure;
    tower.repair(repairStructures);
  }
};
