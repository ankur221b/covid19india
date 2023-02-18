// plot the graph
export function plot(data, ctx, date, color) {
	var plotdata = {
		datasets: [
			{
				data: data,
				backgroundColor: ['rgba(22,22,37, 0.8)'],
				borderColor: [color],
				borderWidth: 2,
			},
		],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: date,
	};

	var myPieChart = new Chart(ctx, {
		type: 'line',
		data: plotdata,
		options: {
			animation: {
				duration: 2000,
			},
			legend: {
				position: 'left',
				align: 'center',
				display: false,
				labels: {
					fontSize: 20,
				},
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							display: false,
						},
						ticks: {
							fontSize: 15,
							display: false,
							fontColor: 'lightgrey',
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							display: false,
						},
						ticks: {
							display: false,
							fontSize: 15,
							fontColor: 'lightgrey',
						},
					},
				],
			},
		},
	});
}
export default function plotGraph(confirm, active, deceased, recovered, date) {
	let element = document.querySelector('.myChart1').getContext('2d');
	let color = document.querySelector('.myChart1').parentElement.dataset.color;
	plot(confirm, element, date, color);

	element = document.querySelector('.myChart2').getContext('2d');
	color = document.querySelector('.myChart2').parentElement.dataset.color;
	plot(active, element, date, color);

	element = document.querySelector('.myChart3').getContext('2d');
	color = document.querySelector('.myChart3').parentElement.dataset.color;
	plot(recovered, element, date, color);

	element = document.querySelector('.myChart4').getContext('2d');
	color = document.querySelector('.myChart4').parentElement.dataset.color;
	plot(deceased, element, date, color);
}
