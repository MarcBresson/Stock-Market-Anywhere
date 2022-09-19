var minuterie_display_new_curve = new Minuterie(20, display_new_curve)
var prices_listener = new ChangeListener("prices")
prices_listener.check()
init()

var prices_history
var indexes
function init(){
    prices_history = prices_listener.value["prices_history"]
    indexes = data_get_information("indexes")

    let nbr_points = nbr_of_point_to_display()
    let i = Math.max(0, indexes.party_index.length - nbr_points - 1)
    while(i < indexes.party_index.length - 1){
        chart.addAxisLabel(indexes.party_index[i][0])
        i ++
    }
    chart.update()
}

setInterval(() => {
    minuterie_display_new_curve.check()
    if(prices_listener.check()){
        prices_history = prices_listener.value["prices_history"]
        indexes = data_get_information("indexes")

        add_new_prices_to_chart()
    }
}, 1000)

function display_new_curve(){
    let trigram = trigram_to_display()
	let last_prices = prices_history[trigram].slice(- nbr_of_point_to_display())
    let full_name = default_prices[trigram]["nom_complet"]
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
    let last_prices = get_new_prices()

    for(index in chart.trigram_displayed){
        trigram = chart.trigram_displayed[index]
        chart.addDataPoint(trigram, last_prices[trigram])
    }

    chart.addAxisLabel(indexes.party_index.at(-2)[0])

    let minutes_since_oldest_datapoint = (Date.now() - chart.OldestDataPoint()) / 1000 / 60
    if(minutes_since_oldest_datapoint > minutes_for_points_history){
        chart.removeOldestDatapoints()
    }
    chart.update()
}

function get_new_prices(){
    let last_prices = {}
    for(trigram in prices_history){
        last_prices[trigram] = prices_history[trigram].at(-1)
    }

    return last_prices
}
