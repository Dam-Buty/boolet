<schedule>
  <section>
    Schedule a <i>boolet</i> in
      <select value="{ delay }">
        <option value="10">10 seconds</option>
        <option value="20">20 seconds</option>
        <option value="30">30 seconds</option>
      </select>
    <button click="{ doSchedule }">GO</button>
    <p>{ boocode }</p>
  </section>

  <script>
    delay = 10

    doSchedule = () => {
      const timestamp = moment().add(delay, "s").format("x")

      superagent
      .post("/api/schedule/" + timestamp)
      .end((err, res) => {
        route("boolet/" + res.text)
      })
    }
  </script>
</schedule>
