<script>
  import "@fontsource/advent-pro";
  import Area from "./Area.svelte";
</script>

<div class="main">
  <div class="title">Lootcode 10</div>
  <div class="content">
    <div class="map-container">
      <img src="/map.jpg" alt="Lootcode Map" class="lootcode-map" />
      <Area id="sorting-searching" vertical={40} horizontal={52.5}></Area>
      <Area id="strings" vertical={40} horizontal={90}></Area>
      <Area id="dp" vertical={60} horizontal={64}></Area>
      <Area id="graph-algorithms" vertical={80} horizontal={8}></Area>
      <Area id="range-queries" vertical={30} horizontal={12}></Area>
      <Area id="trees" vertical={70} horizontal={27}></Area>
      <Area id="math" vertical={50} horizontal={20}></Area>
      <Area id="geometry" vertical={10} horizontal={35}></Area>
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

  .title {
    text-align: center;
    color: white;
    font-size: 48px;
    margin-bottom: 48px;
    font-family: 'Advent Pro', sans-serif;
    margin-top: 45px;
  }

  .map-container {
    display: inline-block;
    position: relative;
  }

  .lootcode-map {
    border-radius: 15px; 
  }

</style>
