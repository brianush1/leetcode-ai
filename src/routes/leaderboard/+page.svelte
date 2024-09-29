<script lang="ts">
	export let data: {
	  leaderboard: {
		username: string;
		numSolved: number;
	  }[];
	};
  
    import BackButton from "$lib/components/BackButton.svelte";
	import "@fontsource/advent-pro";
  </script>
  
  <BackButton backUrl="/"></BackButton>
  <h1>Leaderboard</h1>
  <ol>
	{#each data.leaderboard as item, index}
	  <li class="item-container" data-position={index + 1}>
		<div class="item">
		  <div class="position-number">
			{index + 1}
		  </div>
		  <div class="user-info">
			<h2>{item.username}</h2>
			<h2>Solved: {item.numSolved}</h2>
		  </div>
		</div>
	  </li>
	{/each}
  </ol>
  
  <style>
	/* Reset default styles */
	* {
	  padding: 0px;
	  margin: 0px;
	}
  
	h1 {
	  text-align: center;
	  margin: 20px 0;
	  font-family: 'Advent Pro', sans-serif;
	  color: white;
	}
  
	h2 {
	  font-family: 'Advent Pro', sans-serif;
	  margin: 0;
	}
  
	ol {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 20px;
	  list-style: none;
	}
  
	.item-container {
	  width: min(400px, 100%);
	}
  
	.item {
	  display: flex;
	  align-items: center;
	  gap: 20px;
	  border-radius: 40px;
	  padding: 20px;
	  background-color: #a137df;
	  position: relative;
	}
  
	/* Keep your gradient backgrounds for top positions */
	.item-container[data-position="1"] .item {
	  background: linear-gradient(45deg, yellow, orange);
	}
  
	.item-container[data-position="2"] .item {
	  background: linear-gradient(45deg, silver, white);
	}
  
	.item-container[data-position="3"] .item {
	  background: linear-gradient(45deg, brown, peru);
	}
  
	/* Styling for the position number */
	.position-number {
	  font-weight: bold;
	  font-size: 1.5rem;
	  width: 50px;
	  height: 50px;
	  background-color: rgba(255, 255, 255, 0.7);
	  color: #333;
	  border-radius: 50%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-shrink: 0;
	}
  
	/* Adjust position number colors for top positions */
	.item-container[data-position="1"] .position-number {
	  background-color: rgba(255, 215, 0, 0.8); /* Gold color */
	  color: black;
	}
  
	.item-container[data-position="2"] .position-number {
	  background-color: rgba(192, 192, 192, 0.8); /* Silver color */
	  color: black;
	}
  
	.item-container[data-position="3"] .position-number {
	  background-color: rgba(205, 127, 50, 0.8); /* Bronze color */
	  color: black;
	}
  
	.user-info {
	  display: flex;
	  flex-direction: column;
	}
  
	/* Responsive adjustments */
	@media (max-width: 400px) {
	  .item {
		flex-direction: column;
		align-items: center;
		text-align: center;
	  }
  
	  .position-number {
		margin-bottom: 10px;
	  }
  
	  .user-info {
		align-items: center;
	  }
	}
  
  </style>
  