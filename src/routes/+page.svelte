<script>
  import "@fontsource/advent-pro";
  import Area from "./Area.svelte";
</script>

<div id="title">Lootcode 10</div>
<div id="content">
  <div id="map-container">
    <img src="/map.jpg" alt="Lootcode Map" id="lootcode-map" />
    <Area message="" vertical={40} horizontal={51.5}></Area>
  </div>
</div>

<style>

  #title {
    text-align: center;
    color: white;
    font-size: 48px;
    margin-top: 128px;
    font-family: 'Advent Pro', sans-serif;
  }

  #lootcode-map {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px; 
  }

</style>
