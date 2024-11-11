export var Towers = {
  run: function (tower: StructureTower) {
    let enemys = tower.room.find(FIND_HOSTILE_CREEPS);
    if (enemys.length > 0) {
      Object.values(enemys).forEach(enemy => {
        if (enemy.owner.username == "Harabi") return;
        tower.attack(enemys[0]);
        return;
      });
    } else {
      let mystrucfind = tower.room.find(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax && s.hits < 110000
      }) as AnyOwnedStructure[];
      let repairStructures = _.min(mystrucfind, "hits") as AnyOwnedStructure;
      tower.repair(repairStructures);
    }
  }
};
