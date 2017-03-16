<boolet>
  <section>
    This boolet will shoot in { delay } seconds
  </section>

  <script>
    this.on("route", boolet => {
      const source = new EventSource("/api/subscribe/" + boolet)

      source.onmessage = event => {
        console.log(event)
      }
    })

  </script>
</boolet>
