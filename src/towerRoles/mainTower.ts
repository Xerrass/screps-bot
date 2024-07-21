export var Towers = {
    run: function (tower: StructureTower){
        let repairStructures = tower.room.find(FIND_STRUCTURES, {filter: s => s.hits < s.hitsMax});
        tower.repair(repairStructures[0]);
    }
}
