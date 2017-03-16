riot.tag2('boolet', '<section> This boolet will shoot in {delay} seconds </section>', '', '', function(opts) {
    this.on("route", boolet => {
      const source = new EventSource("/api/subscribe/" + boolet)

      console.log(source)

      source.onmessage = event => {
        console.log(event)
      }
    })

});

riot.tag2('routes', '<app> <router> <route path="schedule"><schedule></schedule></route> <route path="boolet/*"><boolet></boolet></route> </router> </app>', '', '', function(opts) {
});

riot.tag2('schedule', '<section> Schedule a <i>boolet</i> in <select riot-value="{delay}"> <option value="10">10 seconds</option> <option value="20">20 seconds</option> <option value="30">30 seconds</option> </select> <button click="{doSchedule}">GO</button> <p>{boocode}</p> </section>', '', '', function(opts) {
    delay = 10
    boocode = "not yet"

    doSchedule = () => {
      const timestamp = moment().add(delay, "s").format("x")

      superagent
      .post("/api/schedule/" + timestamp)
      .end((err, res) => {
        route("boolet/" + res.text)
      })
    }
});
