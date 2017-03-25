const SseChannel = require('sse-channel')

const Boolet = class Boolet {
  constructor(timestamp) {
    this.channel = new SseChannel()
    this.when = timestamp
    this.trigger = "SHOOT"

    const delay = timestamp - Date.now()

    setTimeout(() => {
      this.shoot()
    }, delay)

    console.log("Scheduling event in " + delay + " miliseconds")
  }

  shoot() {
    console.log("Triggering")
    this.channel.send(this.trigger)
  }
}

module.exports = Boolet
