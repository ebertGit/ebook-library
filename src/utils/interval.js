const schedule = require("node-schedule");

// Cron-style Scheduling:
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

module.exports = class Interval {
  constructor({name, rule}) {
    this.name = name;
    this.rule = rule;
  }

  /**
   * Create a schedule.
   * @param {Function} callback 
   */
  async create(callback) {
    schedule.scheduleJob(`${this.name}`, `${this.rule}`, callback);
  }
}