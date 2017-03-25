const Boolet = require("./Boolet")

const Scheduler = class Scheduler {
  constructor() {
    this.queue = []
  }

  create(timestamp) {
    const boolet = new Boolet(timestamp)
    const idx = this.queue.length

    this.queue.push(boolet)

    console.log("Schedule index : " + idx)
    return idx
  }

  get(idx) {
    return this.queue[idx] || undefined
  }
}

module.exports = Scheduler
