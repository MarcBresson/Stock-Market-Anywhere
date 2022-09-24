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
			y: {
				position: 'right',
				ticks: {
					color: '#fff',
					callback: function(value) {
                        return round(value, 1) + " €";
                    }
				},
				grid: {
					borderColor: '#fff',
					color: 'rgba(255,255,255,0.4)',
					borderDash:[5, 5] ,
				}
			},
			x: {
                type: 'time',
                time: {
                    unit: 'minute'
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
	}

	removeOldestDatapoints() {
		this.chart.data.labels.splice(0,1);
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
		if(this.chart.data.labels.length == 0 || this.chart.data.labels.at(-1) < start_index){
			this.chart.data.labels.push(start_index);
			return true
		}

		return false
	}

	OldestDataPoint(){
		return this.chart.data.labels[0]
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

var chart = new ChartExtension(ctx, config)

function init_chart(){
    let nbr_points = nbr_of_point_to_display()
    let i = Math.max(0, indexes.party_index.length - nbr_points)
    while(i < indexes.party_index.length){
        chart.addAxisLabel(indexes.party_index[i][0])
        i ++
    }
    chart.update()
}

function display_new_curve(){
    let trigram = trigram_to_display()
	let last_prices = prices_history[trigram].slice(- nbr_of_point_to_display())
    let full_name = default_prices[trigram]["full_name"]
    let color = default_prices[trigram]["colour"]

	chart.addNewCurve(trigram, full_name, color, last_prices)
    
    if(chart.getNbrCurveMissing() > 1){
        display_new_curve()
    }
    chart.update()
}

function nbr_of_point_to_display(){
    return (minutes_for_points_history * 60) / indexes.refresh_period
}

var next_index_to_display = 0
function trigram_to_display(){
    let available_trigrams = Object.keys(prices_history)
    next_index_to_display = (next_index_to_display + 1) % available_trigrams.length
    return available_trigrams[next_index_to_display]
}

function add_new_prices_to_chart(){
    let last_prices = get_last_prices()

    let need_update = chart.addAxisLabel(indexes.party_index.at(-1)[0])

	if(need_update){
		for(index in chart.trigram_displayed){
			trigram = chart.trigram_displayed[index]
			chart.addDataPoint(trigram, last_prices[trigram])
		}
	}
    
    let minutes_since_oldest_datapoint = (Date.now() - chart.OldestDataPoint()) / 1000 / 60
    while(minutes_since_oldest_datapoint > minutes_for_points_history){
		minutes_since_oldest_datapoint = (Date.now() - chart.OldestDataPoint()) / 1000 / 60
        chart.removeOldestDatapoints()
    }
    chart.update()
}
