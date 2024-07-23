export default function scoreboard() {
  if (Game.time % 1 == 0) {
    var gclp = Game.gcl.progress;
    var gclpt = Game.gcl.progressTotal;
    var gclpercent = (gclp / gclpt) * 100;
    let form = new Intl.NumberFormat("de-DE");

    let bucket = form.format(Game.cpu.bucket);
    console.log("---------------------------------------------------");
    console.log("----------------------RCL/ENG----------------------");

    Object.values(Game.rooms).forEach(room => {
      if (!room.controller) return;
      var rclp = room.controller?.progress ?? 0;
      var rclpt = room.controller?.progressTotal ?? 0;
      var rclpercent = (rclp / rclpt) * 100;

      console.log(
        room.name +
          "   LVL: " +
          room.controller?.level +
          "  : " +
          form.format(rclp) +
          "/" +
          form.format(rclpt) +
          " - " +
          rclpercent.toFixed(2) +
          "%"
      );
      let sources = room.find(FIND_SOURCES);
      console.log("               --- Room Sources ---                 ");
      Object.values(sources).forEach(source => {
        let ttr = "ENG Full";
        if (source.ticksToRegeneration) {
          ttr = String(source.ticksToRegeneration);
        }
        console.log("       ENG: " + source.energy + "/" + source.energyCapacity + " REG:" + ttr);
      });
    });
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
}
