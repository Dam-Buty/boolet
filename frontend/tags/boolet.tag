<boolet>
  <section>
    This boolet will shoot in { delay } seconds
  </section>

  <script>
    delay = "xXx"

    this.on("route", boolet => {
      console.log(boolet)
      fetch("/api/boolet/" + boolet + "/when")
      .then(delay => {
          this.delay = delay
      })
      .then(() => {
        const source = new EventSource("/api/boolet/" + boolet + "/subscribe")

        source.onmessage = event => {
          console.log(event)
        }
      })
    })

    setInterval(() => {
      this.delay = this.delay - 1
    }, 1000)

  </script>
</boolet>
