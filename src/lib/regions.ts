export const REGIONS: { [x: string]: {
	title: string;
	problems?: {
		id: number;
		name: string;
		x: number;
		y: number;
		outedges: number[];
	}[];
} } = {
	"sorting-searching": {
		title: "Sorting/Searching",
		problems: [
			{
				"id": 1084,
				"name": "Apartments",
				"x": 19.265949726104736,
				"y": 11.42578125,
				"outedges": [
					1076
				]
			},
			{
				"id": 2183,
				"name": "Missing Coin Sum",
				"x": 81.86360597610474,
				"y": 12.890625,
				"outedges": [
					1164,
					1085
				]
			},
			{
				"id": 1163,
				"name": "Traffic Lights",
				"x": 48.465168476104736,
				"y": 46.2890625,
				"outedges": [
					2168,
					1641
				]
			},
			{
				"id": 2162,
				"name": "Josephus Problem I",
				"x": 19.656574726104736,
				"y": 70.60546875,
				"outedges": []
			},
			{
				"id": 2168,
				"name": "Nested Ranges Check",
				"x": 50.222980976104736,
				"y": 72.65625,
				"outedges": [
					2162
				]
			},
			{
				"id": 1164,
				"name": "Room Allocation",
				"x": 82.74251222610474,
				"y": 73.33984375,
				"outedges": [
					2168
				]
			},
			{
				"id": 1641,
				"name": "Sum of Three Values",
				"x": 18.777668476104736,
				"y": 45.3125,
				"outedges": [
					1662
				]
			},
			{
				"id": 1662,
				"name": "Subarray Divisibility",
				"x": 18.777668476104736,
				"y": 56.93359375,
				"outedges": [
					2162
				]
			},
			{
				"id": 1085,
				"name": "Array Division",
				"x": 48.269855976104736,
				"y": 13.18359375,
				"outedges": [
					1163,
					1084
				]
			},
			{
				"id": 1076,
				"name": "Sliding Window Median",
				"x": 19.070637226104736,
				"y": 27.734375,
				"outedges": [
					1641
				]
			}
		],
	},
	"strings": {
		title: "Strings",
		problems: [
			{
				"id": 1110,
				"name": "Minimal Rotation",
				"x": 47.195637226104736,
				"y": 16.015625,
				"outedges": [
					2420
				]
			},
			{
				"id": 1111,
				"name": "Longest Palindrome",
				"x": 61.062824726104736,
				"y": 68.65234375,
				"outedges": [
					2110
				]
			},
			{
				"id": 2420,
				"name": "Palindrome Queries",
				"x": 77.76204347610474,
				"y": 27.5390625,
				"outedges": [
					2420,
					2105
				]
			},
			{
				"id": 2102,
				"name": "Finding Patterns",
				"x": 24.832355976104736,
				"y": 33.7890625,
				"outedges": [
					2103
				]
			},
			{
				"id": 2103,
				"name": "Counting Patterns",
				"x": 16.531574726104736,
				"y": 49.8046875,
				"outedges": [
					2104
				]
			},
			{
				"id": 2104,
				"name": "Pattern Positions",
				"x": 18.484699726104736,
				"y": 66.015625,
				"outedges": [
					1111
				]
			},
			{
				"id": 2105,
				"name": "Distinct Substrings",
				"x": 54.129230976104736,
				"y": 40.72265625,
				"outedges": [
					2102
				]
			},
			{
				"id": 2110,
				"name": "Substring Distribution",
				"x": 51.297199726104736,
				"y": 85.44921875,
				"outedges": []
			}
		],
	},
	"dp": {
		title: "DP",
		problems: [
			{
				"id": 1633,
				"name": "Dice Combinations",
				"x": 47.293293476104736,
				"y": 47.55859375,
				"outedges": [
					1633,
					2413
				]
			},
			{
				"id": 1634,
				"name": "Minimizing Coins",
				"x": 46.316730976104736,
				"y": 9.86328125,
				"outedges": [
					1635,
					1636,
					1639
				]
			},
			{
				"id": 1635,
				"name": "Coin Combinations I",
				"x": 33.914387226104736,
				"y": 21.484375,
				"outedges": [
					1745,
					1746
				]
			},
			{
				"id": 1636,
				"name": "Coin Combinations II",
				"x": 61.648762226104736,
				"y": 21.19140625,
				"outedges": [
					1745,
					1638
				]
			},
			{
				"id": 1638,
				"name": "Grid Paths",
				"x": 67.80110597610474,
				"y": 43.5546875,
				"outedges": [
					1633,
					2413,
					2220
				]
			},
			{
				"id": 1746,
				"name": "Array Description",
				"x": 25.027668476104736,
				"y": 41.69921875,
				"outedges": [
					1633,
					2181,
					2413
				]
			},
			{
				"id": 2413,
				"name": "Counting Towers",
				"x": 48.562824726104736,
				"y": 62.59765625,
				"outedges": [
					1653
				]
			},
			{
				"id": 1639,
				"name": "Edit Distance",
				"x": 88.40657472610474,
				"y": 30.6640625,
				"outedges": [
					1145
				]
			},
			{
				"id": 1745,
				"name": "Money Sums",
				"x": 46.414387226104736,
				"y": 31.93359375,
				"outedges": [
					1633
				]
			},
			{
				"id": 1145,
				"name": "Increasing Subsequence",
				"x": 86.45344972610474,
				"y": 73.33984375,
				"outedges": [
					1653
				]
			},
			{
				"id": 1653,
				"name": "Elevator Rides",
				"x": 48.562824726104736,
				"y": 77.34375,
				"outedges": []
			},
			{
				"id": 2181,
				"name": "Counting Tilings",
				"x": 24.246418476104736,
				"y": 62.59765625,
				"outedges": [
					2181,
					1653
				]
			},
			{
				"id": 2220,
				"name": "Counting Numbers",
				"x": 74.63704347610474,
				"y": 62.890625,
				"outedges": [
					2220,
					1653
				]
			}
		],
	},
	"graph-algorithms": {
		title: "Graph Algorithms",
		problems: [
			{
				"id": 1192,
				"name": "Counting Rooms",
				"x": 49.441730976104736,
				"y": 19.072265923023224,
				"outedges": [
					1711
				]
			},
			{
				"id": 1666,
				"name": "Building Roads",
				"x": 24.441730976104736,
				"y": 72.19726592302322,
				"outedges": [
					1673
				]
			},
			{
				"id": 1668,
				"name": "Building Teams",
				"x": 25.418293476104736,
				"y": 55.009765923023224,
				"outedges": [
					1666,
					1673,
					1669
				]
			},
			{
				"id": 1669,
				"name": "Round Trip",
				"x": 50.125324726104736,
				"y": 55.107422173023224,
				"outedges": [
					1673
				]
			},
			{
				"id": 1672,
				"name": "Shortest Routes II",
				"x": 79.42219972610474,
				"y": 55.693359673023224,
				"outedges": [
					1669,
					1673
				]
			},
			{
				"id": 1673,
				"name": "High Score",
				"x": 49.734699726104736,
				"y": 71.70898467302322,
				"outedges": [
					1696
				]
			},
			{
				"id": 1679,
				"name": "Course Schedule",
				"x": 24.539387226104736,
				"y": 37.333984673023224,
				"outedges": [
					1668,
					1711,
					1669
				]
			},
			{
				"id": 1681,
				"name": "Game Routes",
				"x": 24.344074726104736,
				"y": 19.365234673023224,
				"outedges": [
					1192,
					1679
				]
			},
			{
				"id": 1751,
				"name": "Planets Cycles",
				"x": 77.85969972610474,
				"y": 19.072265923023224,
				"outedges": [
					1192,
					1675
				]
			},
			{
				"id": 1675,
				"name": "Road Reparation",
				"x": 78.83626222610474,
				"y": 38.603515923023224,
				"outedges": [
					1672
				]
			},
			{
				"id": 1696,
				"name": "School Dance",
				"x": 77.76204347610474,
				"y": 72.68554717302322,
				"outedges": []
			},
			{
				"id": 1711,
				"name": "Distinct Routes",
				"x": 49.832355976104736,
				"y": 38.212890923023224,
				"outedges": [
					1675
				]
			}
		],
	},
	"range-queries": {
		title: "Range Queries",
		problems: [
			{
				"id": 1646,
				"name": "Static Range Sum Queries",
				"x": 81.08235597610474,
				"y": 44.04296875,
				"outedges": [
					1735
				]
			},
			{
				"id": 1647,
				"name": "Static Range Minimum Queries",
				"x": 82.25423097610474,
				"y": 61.81640625,
				"outedges": [
					1736
				]
			},
			{
				"id": 1648,
				"name": "Dynamic Range Sum Queries",
				"x": 81.66829347610474,
				"y": 53.3203125,
				"outedges": [
					1736
				]
			},
			{
				"id": 1649,
				"name": "Dynamic Range Minimum Queries",
				"x": 81.37532472610474,
				"y": 34.08203125,
				"outedges": [
					1735
				]
			},
			{
				"id": 1650,
				"name": "Range Xor Queries",
				"x": 50.613605976104736,
				"y": 27.05078125,
				"outedges": [
					2206
				]
			},
			{
				"id": 1652,
				"name": "Forest Queries",
				"x": 12.527668476104736,
				"y": 48.73046875,
				"outedges": []
			},
			{
				"id": 1143,
				"name": "Hotel Queries",
				"x": 29.812824726104736,
				"y": 65.91796875,
				"outedges": [
					1652
				]
			},
			{
				"id": 2206,
				"name": "Pizzeria Queries",
				"x": 30.496418476104736,
				"y": 33.984375,
				"outedges": [
					1652
				]
			},
			{
				"id": 1190,
				"name": "Subarray Sum Queries",
				"x": 82.25423097610474,
				"y": 81.15234375,
				"outedges": [
					1737
				]
			},
			{
				"id": 1734,
				"name": "Distinct Values Queries",
				"x": 82.84016847610474,
				"y": 71.484375,
				"outedges": [
					1737
				]
			},
			{
				"id": 2416,
				"name": "Increasing Array Queries",
				"x": 81.76594972610474,
				"y": 25.09765625,
				"outedges": [
					1650
				]
			},
			{
				"id": 1735,
				"name": "Range Updates and Sums",
				"x": 49.637043476104736,
				"y": 39.453125,
				"outedges": [
					2206
				]
			},
			{
				"id": 1736,
				"name": "Polynomial Queries",
				"x": 49.930012226104736,
				"y": 58.10546875,
				"outedges": [
					1143
				]
			},
			{
				"id": 1737,
				"name": "Range Queries and Copies",
				"x": 50.027668476104736,
				"y": 73.33984375,
				"outedges": [
					1143
				]
			}
		],
	},
	"trees": {
		title: "Trees",
		problems: [
			{
				"id": 1130,
				"name": "Tree Matching",
				"x": 33.133137226104736,
				"y": 6.4453125,
				"outedges": []
			},
			{
				"id": 1131,
				"name": "Tree Diameter",
				"x": 10.476887226104736,
				"y": 13.28125,
				"outedges": [
					1130
				]
			},
			{
				"id": 1132,
				"name": "Tree Distances I",
				"x": 63.308918476104736,
				"y": 66.89453125,
				"outedges": [
					1133
				]
			},
			{
				"id": 1133,
				"name": "Tree Distances II",
				"x": 40.359699726104736,
				"y": 85.3515625,
				"outedges": []
			},
			{
				"id": 1135,
				"name": "Distance Queries",
				"x": 41.336262226104736,
				"y": 21.19140625,
				"outedges": [
					1139
				]
			},
			{
				"id": 1136,
				"name": "Counting Paths",
				"x": 68.87532472610474,
				"y": 13.0859375,
				"outedges": [
					1137,
					1135
				]
			},
			{
				"id": 1137,
				"name": "Subtree Queries",
				"x": 82.05891847610474,
				"y": 23.2421875,
				"outedges": []
			},
			{
				"id": 1138,
				"name": "Path Queries",
				"x": 38.992512226104736,
				"y": 51.171875,
				"outedges": [
					2134
				]
			},
			{
				"id": 2134,
				"name": "Path Queries II",
				"x": 24.344074726104736,
				"y": 60.3515625,
				"outedges": []
			},
			{
				"id": 1139,
				"name": "Distinct Colors",
				"x": 19.070637226104736,
				"y": 34.5703125,
				"outedges": [
					1131
				]
			},
			{
				"id": 2079,
				"name": "Finding a Centroid",
				"x": 49.539387226104736,
				"y": 31.8359375,
				"outedges": [
					1138,
					2080,
					1132,
					1136
				]
			},
			{
				"id": 2080,
				"name": "Fixed-Length Paths I",
				"x": 66.53157472610474,
				"y": 42.96875,
				"outedges": [
					2081
				]
			},
			{
				"id": 2081,
				"name": "Fixed-Length Paths II",
				"x": 79.81282472610474,
				"y": 57.12890625,
				"outedges": []
			}
		],
	},
	"math": {
		title: "Math",
		problems: [
			{
				"id": 1713,
				"name": "Counting Divisors",
				"x": 16.922199726104736,
				"y": 45.703125,
				"outedges": [
					2209
				]
			},
			{
				"id": 1081,
				"name": "Common Divisors",
				"x": 61.258137226104736,
				"y": 10.15625,
				"outedges": []
			},
			{
				"id": 2185,
				"name": "Prime Multiples",
				"x": 31.472980976104736,
				"y": 4.98046875,
				"outedges": []
			},
			{
				"id": 1079,
				"name": "Binomial Coefficients",
				"x": 85.96516847610474,
				"y": 16.796875,
				"outedges": []
			},
			{
				"id": 1717,
				"name": "Christmas Party",
				"x": 23.074543476104736,
				"y": 17.67578125,
				"outedges": []
			},
			{
				"id": 2064,
				"name": "Bracket Sequences I",
				"x": 39.090168476104736,
				"y": 39.84375,
				"outedges": [
					2187
				]
			},
			{
				"id": 2187,
				"name": "Bracket Sequences II",
				"x": 50.222980976104736,
				"y": 29.58984375,
				"outedges": []
			},
			{
				"id": 2209,
				"name": "Counting Necklaces",
				"x": 18.484699726104736,
				"y": 32.2265625,
				"outedges": []
			},
			{
				"id": 2210,
				"name": "Counting Grids",
				"x": 26.101887226104736,
				"y": 58.88671875,
				"outedges": [
					1713
				]
			},
			{
				"id": 1722,
				"name": "Fibonacci Numbers",
				"x": 84.10969972610474,
				"y": 39.0625,
				"outedges": []
			},
			{
				"id": 1096,
				"name": "Throwing Dice",
				"x": 69.46126222610474,
				"y": 30.078125,
				"outedges": []
			},
			{
				"id": 1725,
				"name": "Dice Probability",
				"x": 69.36360597610474,
				"y": 56.73828125,
				"outedges": [
					1728
				]
			},
			{
				"id": 1728,
				"name": "Inversion Probability",
				"x": 47.683918476104736,
				"y": 64.55078125,
				"outedges": [
					2210
				]
			},
			{
				"id": 1729,
				"name": "Stick Game",
				"x": 87.13704347610474,
				"y": 54.98046875,
				"outedges": []
			},
			{
				"id": 1730,
				"name": "Nim Game I",
				"x": 17.898762226104736,
				"y": 73.92578125,
				"outedges": [
					1098
				]
			},
			{
				"id": 1098,
				"name": "Nim Game II",
				"x": 34.012043476104736,
				"y": 80.76171875,
				"outedges": [
					1099
				]
			},
			{
				"id": 1099,
				"name": "Stair Game",
				"x": 51.492512226104736,
				"y": 81.54296875,
				"outedges": [
					2207
				]
			},
			{
				"id": 2207,
				"name": "Grundy's Game",
				"x": 68.97298097610474,
				"y": 79.39453125,
				"outedges": [
					2208
				]
			},
			{
				"id": 2208,
				"name": "Another Game",
				"x": 83.42610597610474,
				"y": 69.53125,
				"outedges": [
					1729
				]
			}
		],
	},
	"geometry": {
		title: "Geometry",
		problems: [
			{
				"id": 2189,
				"name": "Point Location Test",
				"x": 30.203449726104736,
				"y": 27.34375,
				"outedges": [
					2190
				]
			},
			{
				"id": 2190,
				"name": "Line Segment Intersection",
				"x": 76.39485597610474,
				"y": 72.65625,
				"outedges": []
			},
			{
				"id": 2191,
				"name": "Polygon Area",
				"x": 70.34016847610474,
				"y": 27.734375,
				"outedges": []
			},
			{
				"id": 2192,
				"name": "Point in Polygon",
				"x": 84.01204347610474,
				"y": 48.828125,
				"outedges": [
					2195
				]
			},
			{
				"id": 2193,
				"name": "Polygon Lattice Points",
				"x": 40.555012226104736,
				"y": 79.19921875,
				"outedges": []
			},
			{
				"id": 2194,
				"name": "Minimum Euclidean Distance",
				"x": 51.004230976104736,
				"y": 12.01171875,
				"outedges": [
					2193
				]
			},
			{
				"id": 2195,
				"name": "Convex Hull",
				"x": 20.340168476104736,
				"y": 55.56640625,
				"outedges": [
					2191
				]
			}
		],
	},
};
