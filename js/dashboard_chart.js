const ctx = document.getElementById('chart').getContext('2d');

const config = {
  type: 'line',
  options: {
		plugins: {
			legend: {
				display: true,
				labels: {
					color: 'rgba(255,255,255,0.7)',
					boxHeight: 1,
				}
			},
			tooltip: {
				intersect: false,
			}
		},
		resizeDelay: 300,
		responsive: false,
		scales: {
			yAxis: {
				position: 'right',
				ticks: {
					color: '#fff',
					callback: function(value, index, values) {
                        return value + " €";
                    }
				},
				grid: {
					borderColor: '#fff',
					color: 'rgba(255,255,255,0.4)',
					borderDash:[5, 5] ,
				}
			}
		},
	}
};

class ChartExtension{
	chart
	trigram_displayed = []

	constructor(ctx, config){
		this.chart = new Chart(ctx, config);
		this.chart.data.labels_timestamp = []
	}

	removeOldestDatapoints() {
		this.chart.data.labels.splice(0,1);
		this.chart.data.labels_timestamp.splice(0,1);
		this.chart.data.datasets.forEach((dataset) => {
			dataset.data.splice(0,1);
		});
	}
	
	addDataPoint(trigram, new_price) {
		let index = this.trigram_displayed.indexOf(trigram)
		if(index >= 0){
			this.chart.data.datasets[index].data.push(new_price)
		}
	}

	addAxisLabel(start_index){
		let options = {hour: "2-digit", minute: "2-digit"};
		let now = new Date(start_index);
		this.chart.data.labels.push(now.toLocaleTimeString("fr-FR", options));
		this.chart.data.labels_timestamp.push(now.getTime());
	}

	OldestDataPoint(){
		return this.chart.data.labels_timestamp[0]
	}

	addNewCurve(trigram, full_name, couleur, data) {
		this.chart.data.datasets.push({
			type: 'line',
			trigram: trigram,
			label : full_name,
			data: data,
			fill: false,
			borderColor: couleur,
			tension : 0.3,
		});
		this.trigram_displayed.push(trigram)

		this.removeExcessiveCurve()
	}

	getNbrCurveMissing(){
		return curves_to_display - this.trigram_displayed.length
	}

	removeExcessiveCurve() {
		if(this.trigram_displayed.length >= curves_to_display){
			this.removeDataset()
		}
	}

	removeDataset() {
		this.chart.data.datasets.splice(0,1)
		this.trigram_displayed.splice(0,1)
	}

	update(){
		this.chart.update();
	}
}

chart = new ChartExtension(ctx, config)
