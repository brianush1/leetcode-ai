<script>
  import "@fontsource/advent-pro";
  import Area from "./Area.svelte";
</script>

<div class="main">
  <div id="title">Lootcode 10</div>
  <div id="content">
    <div id="map-container">
      <img src="/map.jpg" alt="Lootcode Map" id="lootcode-map" />
      <Area message="" vertical={40} horizontal={52.5}></Area>
    </div>
  </div>
</div>

<style>

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
  }

  #title {
    text-align: center;
    color: white;
    font-size: 48px;
    margin-bottom: 48px;
    font-family: 'Advent Pro', sans-serif;
  }

  #map-container {
    display: inline-block;
    position: relative;
  }

  #lootcode-map {
    border-radius: 15px; 
  }

</style>
