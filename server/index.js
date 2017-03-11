const SseChannel = require('sse-channel')
const http = require('http')
const Router = require('node-simple-router')
const identifiers = require("./identifiers")

const calibrateChannel = new SseChannel()

const router = Router()

let scheduler = {}

const getIdentifier = () => {
  let thisOnesFree

  let isOneFree = identifiers.some(id => {
    if (scheduler[id] === undefined) {
      thisOnesFree = id
      return true
    }

    return false
  })

  if (isOneFree) {
    return thisOnesFree
  } else {
    return null
  }
}

// Return the date every second to recalibrate
setInterval(() => {
    calibrateChannel.send(Date.now())
}, 1000)

router.get("/schedule/:timestamp", (req, res) => {
  const triggerChannel = new SseChannel()
  const timestamp = req.params.timestamp

  const id = getIdentifier()

  console.log("Scheduling event " + id + "at timestamp " + timestamp)

  if (id === null) {
    res.writeHead(500)
    res.end()
  } else {

    scheduler[id] = {
      when: timestamp,
      channel: triggerChannel
    }

    const delay = timestamp - Date.now()

    console.log("---")
    console.log(timestamp)
    console.log(Date.now())
    console.log(delay)
    console.log("---")

    if (delay < 0) {
      res.writeHead(422)
      res.end()
    } else {
      setTimeout(() => {
        console.log("Sending trigger for job " + id)
        triggerChannel.send(true)
        console.log("Deleting from scheduler")
        scheduler[id] = undefined
        console.log(scheduler)
      }, delay)

      console.log("Sending trigger for job " + id + " in " + delay + "milliseconds")
      console.log(scheduler)
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(id)
    }
  }
})

router.get("/subscribe/:id", (req, res) => {
  const id = req.params.id

  if (scheduler[id]) {
    const triggerChannel = scheduler[id].channel

    console.log("Added listener on " + id + " channel")

    triggerChannel.addClient(req, res)
  } else {
    res.writeHead(404)
    res.end()
  }
})

router.get("/calibrate", (req, res) => {
  calibrateChannel.addClient(req, res)
})

// Create a regular HTTP server (works with express, too)
http
.createServer(router)
.listen(7788, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:7788/')
})
