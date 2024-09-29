<script lang="ts">
	import { page } from "$app/stores";
	import { REGIONS } from "$lib/regions";
	import "@fontsource/advent-pro";
	import ProblemButton from "./ProblemButton.svelte";
	import BackButton from "$lib/components/BackButton.svelte";

	export let data: {
		regionData: (typeof REGIONS)[string];
		solvedProblems?: number[];
		problems: {
			id: number;
			name: string;
			x: number;
			y: number;
			outedges: number[];
		}[];
	};

	let regionId: string;
	$: regionId = $page.params.region;

	let problems = data.problems;

	let isLocked: Map<number, boolean>;
	let isSolved: Map<number, boolean>;
	$: {
		isLocked = new Map<number, boolean>();
		isSolved = new Map<number, boolean>();
		for (const problem of problems) {
			isLocked.set(problem.id, data.solvedProblems ? !data.solvedProblems.find(x => x === problem.id) : true);
			isSolved.set(problem.id, data.solvedProblems ? !!data.solvedProblems.find(x => x === problem.id) : false);
		}

		const nextProblems = new Set<number>();
		for (const problem of problems) {
			const prereqs = problems.filter(x => x.outedges.find(y => y === problem.id)).map(x => x.id);
			const allPrereqsUnlocked = prereqs.every(x => !isLocked.get(x) || !problems.find(y => y.id));
			if (allPrereqsUnlocked && data.solvedProblems) {
				nextProblems.add(problem.id);
			}
		}

		for (const p of nextProblems) {
			isLocked.set(p, false);
		}
	}

	let canvas: HTMLCanvasElement;

	$: if (canvas) {
		const ctx = canvas.getContext("2d")!;

		ctx.lineWidth = 4;
		ctx.clearRect(0, 0, 1024, 1024);

		const drawArrow = (x1: number, y1: number, x2: number, y2: number) => {
			x1 *= 10.24;
			y1 *= 10.24;
			x2 *= 10.24;
			y2 *= 10.24;

			const len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
			const normX = (x2 - x1) / len;
			const normY = (y2 - y1) / len;

			ctx.beginPath();
			ctx.moveTo(x1 + normX * 25, y1 + normY * 25);
			ctx.lineTo(x2 - normX * 25, y2 - normY * 25);

			ctx.moveTo(x2 - normX * 40 + normY * 15, y2 - normY * 40 - normX * 15);
			ctx.lineTo(x2 - normX * 25, y2 - normY * 25);
			ctx.lineTo(x2 - normX * 40 - normY * 15, y2 - normY * 40 + normX * 15);
			ctx.stroke();
		};

		for (const problem of problems) {
			for (const out of problem.outedges) {
				const outp = problems.find(x => x.id === out)!;
				if (!outp) continue;
				if (!isLocked.get(outp.id))
					ctx.strokeStyle = "#000";
				else
					ctx.strokeStyle = "#0004";
				drawArrow(
					problem.x, problem.y,
					outp.x, outp.y,
				);
			}
		}
	}

	function onDragover(e: DragEvent) {
		e.preventDefault();
	}

	function onDrop(e: DragEvent) {
		if (!(e.target as HTMLElement).classList.contains("problem-go-container"))
			return;
		const splits = e.dataTransfer?.getData("text/uri-list").split("/")!;
		const id = parseInt(splits[splits.length - 1]);
		const rect = canvas.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width * 100;
		const y = (e.clientY - rect.top) / rect.height * 100;
		const newProblems = [...problems];
		for (let i = 0; i < newProblems.length; ++i) {
			if (newProblems[i].id === id) {
				newProblems[i] = {
					...newProblems[i],
					x, y,
				};
			}
		}
		problems = newProblems;
		// console.log(id, x, y);
	}

	function onDropProb(toId: number) {
		return (e: DragEvent) => {
			const splits = e.dataTransfer?.getData("text/uri-list").split("/")!;
			const id = parseInt(splits[splits.length - 1]);
			const newProblems = [...problems];
			for (let i = 0; i < newProblems.length; ++i) {
				if (newProblems[i].id === id) {
					newProblems[i] = {
						...newProblems[i],
						outedges: [...newProblems[i].outedges, toId],
					};
				}
			}
			problems = newProblems;
			// console.log(id, x, y);
		};
	}

	function codeIt() {
		console.log(JSON.stringify(problems, undefined, "\t"));
	}

</script>

<div class="main">
	<div class="title">Lootcode 10</div>
	<div class="subtitle"><BackButton backUrl="/" />{data.regionData.title}</div>
	<div class="content">
		<!-- <button on:click={codeIt}>code it</button> -->
		<div class="map-container">
			<img src="/bkg.png" alt="Lootcode Map" class="lootcode-map" />
			<canvas width={1024} height={1024} bind:this={canvas}></canvas>
			<!-- on:drop={onDrop} on:dragover={onDragover} role="grid" tabindex={-1} -->
			<div class="problem-go-container">
				{#each problems as problem}
						<!-- onDrop={onDropProb(problem.id)}
						onDoubleClick={() => {
							problems = problems.filter(x => x.id !== problem.id);
						}} -->
					<ProblemButton
						solved={isSolved.get(problem.id)}
						locked={isLocked.get(problem.id)}
						regionId={regionId}
						problemId={problem.id}
						message={problem.name}
						vertical={problem.y}
						horizontal={problem.x}
					/>
				{/each}
			</div>
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
	}

	.subtitle {
		display: flex;
		align-items: center;
		gap: 8px;
		text-align: center;
		color: white;
		font-size: 36px;
		margin-top: -36px;
		margin-bottom: 48px;
		font-family: 'Advent Pro', sans-serif;
	}

	.map-container {
		position: relative;
		display: inline-block;
	}

	.lootcode-map {
		border-radius: 15px; 
	}

	.map-container > :not(:first-child) {
		position: absolute;
		left: 0;
		top: 0;
		width: 1024px;
		height: 1024px;
	}

</style>
