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

      fetch('api/schedule/' + timestamp, { method: 'post' })
      .then(res=> {
        return res.text()
      })
      .then(boolet => {
        route("boolet/" + boolet)
      })
    }
  </script>
</schedule>
