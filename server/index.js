
const http = require('http')
const Router = require('node-simple-router')

// const router = new Router({static_route: __dirname + "/../frontend"})
const router = new Router()

const Scheduler = require("./classes/Scheduler")

let scheduler = new Scheduler()

router.post("/api/schedule/:timestamp", (req, res) => {
  const idx = scheduler.create(req.params.timestamp)

  res.writeHead(200)
  res.end(idx)
})

router.get("/api/boolet/:idx/:action", (req, res) => {
  const idx = req.params.idx
  const action = req.params.action

  const boolet = scheduler.get(idx)

  if (boolet) {
    switch(action) {
      case "subscribe":
        boolet.channel.addClient(req, res)
        break;
      case "when":
        res.writeHead(200)
        res.end(boolet.when)
    }
  } else {
    res.writeHead(404)
    res.end()
  }
})

// Create a regular HTTP server (works with express, too)
http
.createServer(router)
.listen(7788, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:7788/')
})
