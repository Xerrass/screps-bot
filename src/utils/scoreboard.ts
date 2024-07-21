export default function scoreboard() {
  if (Game.time % 15 == 0) {
    var rclp = Game.spawns.HQ.room.controller?.progress ?? 0;
    var rclpt = Game.spawns.HQ.room.controller?.progressTotal ?? 0;
    var rclpercent = (rclp / rclpt) * 100;

    var gclp = Game.gcl.progress;
    var gclpt = Game.gcl.progressTotal;
    var gclpercent = (gclp / gclpt) * 100;
    let form = new Intl.NumberFormat("de-DE");

    let bucket = form.format(Game.cpu.bucket);
    console.log("---------------------------------------------------");
    console.log("----------------------RCL/GCL----------------------");
    console.log(
      "RCL     LVL: " +
        Game.spawns.HQ.room.controller?.level +
        "  : " +
        form.format(rclp) +
        "/" +
        form.format(rclpt) +
        " - " +
        rclpercent.toFixed(2) +
        "%"
    );
    console.log("------------------------GCL------------------------");
    console.log(
      "GCL     LVL: " +
        Game.gcl.level +
        "  : " +
        form.format(Math.round(gclp)) +
        "/" +
        form.format(Math.round(gclpt)) +
        " - " +
        gclpercent.toFixed(2) +
        "%"
    );
    console.log("------------------------CPU------------------------");
    console.log(
      "CPU Limit/Usage :     " + Game.cpu.limit + " / " + form.format(Math.round(Game.cpu.getUsed() * 10) / 10)
    );
    console.log("CPU Bucket      : " + bucket + " / 10.000");
    console.log("---------------------------------------------------");
  }

  if (Game.spawns["HQ"].spawning) {
    var spawningCreep = Game.creeps[Game.spawns["HQ"].spawning.name];
    Game.spawns["HQ"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["HQ"].pos.x + 3,
      Game.spawns["HQ"].pos.y + 1,
      { align: "left", opacity: 0.8 }
    );
  }

  Game.spawns["HQ"].room.visual.text(
    "⚡: " + Game.spawns["HQ"].room.energyAvailable + "/" + Game.spawns.HQ.room.energyCapacityAvailable,
    Game.spawns["HQ"].pos.x - 3,
    Game.spawns["HQ"].pos.y - 2,
    { align: "left", opacity: 0.8 }
  );
}
