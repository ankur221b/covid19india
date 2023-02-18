function plot(plotdata) {
	var ctx = document.getElementById('myChart').getContext('2d');

	plotdata = {
		datasets: [
			{
				data: [1, 2, 3, 2],
				backgroundColor: ['rgba(22,22,37, 0.8)'],
				borderColor: ['rgba(233,8,56, 0.8)'],
			},
		],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: ['active', 'deceased', 'recovered', 'nhi bataa'],
	};

	var myPieChart = new Chart(ctx, {
		type: 'line',
		data: plotdata,
		options: {
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

//update the data for chart
function addData(data) {
	myPieChart.data.datasets[0].data = data;
	myPieChart.update();
}
