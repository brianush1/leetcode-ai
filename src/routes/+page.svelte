<script>
  import "@fontsource/advent-pro";
  import Area from "./Area.svelte";
</script>

<div class="main">
  <div id="title">Lootcode 10</div>
  <div id="content">
    <div id="map-container">
      <img src="/map.jpg" alt="Lootcode Map" id="lootcode-map" />
      <Area message="Sorting/Searching" vertical={40} horizontal={52.5}></Area>
      <Area message="Strings" vertical={40} horizontal={90}></Area>
      <Area message="DP" vertical={60} horizontal={64}></Area>
      <Area message="Graph Algorithms" vertical={80} horizontal={8}></Area>
      <Area message="Range Queries" vertical={30} horizontal={12}></Area>
      <Area message="Trees" vertical={70} horizontal={27}></Area>
      <Area message="Math" vertical={50} horizontal={20}></Area>
      <Area message="Geometry" vertical={10} horizontal={35}></Area>
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
