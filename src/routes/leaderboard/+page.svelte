<script lang="ts">
	export let data: {
		leaderboard: {
			username: string;
			numSolved: number;
		}[];
	};
</script>

{JSON.stringify(data, undefined, "\t")}
