var minuterie_display_new_curve = new Minuterie(20, display_new_curve)
var prices_listener = new ChangeListener("prices")
prices_listener.check()
init()
var prices_history
var indexes
var is_krach

function init(){
    prices_history = prices_listener.value["prices_history"]
    indexes = data_get_information("indexes")

    init_chart()
    update_cheapest()
    generate_price_display()
}

setInterval(() => {
    minuterie_display_new_curve.check()

    if(prices_listener.check()){
        prices_history = prices_listener.value["prices_history"]
        indexes = data_get_information("indexes")
        is_krach = data_get_information("is_krach")

        add_new_prices_to_chart()
        update_cheapest()
        update_prices_table()
        krach_style()
    }
}, 500)

function get_last_prices(index = -1){
    let last_prices = {}
    for(trigram in prices_history){
        last_prices[trigram] = prices_history[trigram].at(index)
    }

    return last_prices
}

function get_variation(){
    let variation = {}

    let last_prices = get_last_prices()
    let last_last_prices = get_last_prices(-2)
    for(trigram in prices_history){
        variation[trigram] = last_prices[trigram] / last_last_prices[trigram]
        variation[trigram] = round((variation[trigram] - 1) * 100, 2)
    }

    return variation
}

function update_cheapest(){
    let last_prices = get_last_prices()
	var cheapest = Object.keys(last_prices).map(function(key) {
        return [key, last_prices[key]];
    });

    cheapest.sort(function(first, second) {
        return first[1] - second[1];
    });
      
	cheapest = cheapest.splice(0,3)
	for(let i=0; i < 3; i++){
		document.querySelector("#cheapest .indice#numero_" + (i+1)).innerHTML = cheapest[i][0];
	}
}

function generate_price_display(){
    let last_prices = get_last_prices()
	let tableau = document.querySelector('#afficheur_prix tbody');

	for(let trigram in default_prices){
		tableau.innerHTML += 
			"<tr class='prix_" + trigram + "'>" +
				"<td style='color:" + default_prices[trigram]["colour"] + "'>&#11044;</td>" +
				"<td>" + default_prices[trigram]["nom_complet"] + "</td>" +
				"<td class='indice'>" + trigram + "</td>" +
				"<td class='prix'>" + last_prices[trigram] + " &euro;</td>" +
				"<td class='croissance'>0 %</td>" +
			"</tr>"
	}
}

function update_prices_table(){
    let last_prices = get_last_prices()
    let variation = get_variation()

	for(let trigram in default_prices){
		let trigram_el =  document.querySelector('#afficheur_prix .prix_' + trigram);
		let trigram_el_price = trigram_el.querySelector('.prix');
		let trigram_el_variation = trigram_el.querySelector('.croissance');

		trigram_el_price.innerText = last_prices[trigram] + " €"

        let variation_sign
        variation[trigram] > 0 ? variation_sign = "+" : variation_sign = ""
        trigram_el_variation.innerText = variation_sign + variation[trigram] + "%"

        variation[trigram] > 0 ? variation_sign = "positive" : variation_sign = "neutral"
        variation[trigram] < 0 ? variation_sign = "negative" : ""
        trigram_el.setAttribute("growth", variation_sign)
	}
}

function krach_style(){
    if(is_krach === true){
        document.querySelector("html").classList.add("active_krach")
    } else {
        document.querySelector("html").classList.remove("active_krach")
    }
}

function round(x, n_digit){
    return Math.round(x * 10**n_digit) / 10**n_digit
}
