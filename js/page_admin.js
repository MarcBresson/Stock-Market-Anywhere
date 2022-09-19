var prices = new Prices()
refresh_period = 15
var indexes = new Indexes(refresh_period)
var sales = new Sales()


function starts(){
    indexes.new(false)
    prices.set_default()

    buttons_sale_drink.forEach(function(button_sale) {
        button_sale.removeAttribute("disabled")
    })

    x = setInterval(() => {
        if(indexes.is_time_for_next()){
            new_interval()
        }

        update_countdown_new_price()
        if(countdown_til_end){
            update_countdown_party_end()
        }
    }, (1000));
}



function new_interval(set_krach = null){
    indexes.end()
    indexes.new(set_krach)

    if(indexes.is_krach()){
        krach_prices = prices.krach()
        prices.append(krach_prices)
    } else {
        new_sales_start = indexes.last_non_krach_party_index()[0]
        new_sales = sales.since(new_sales_start)
    
        new_prices = prices.compute_new_prices(new_sales, indexes, default_prices)
        prices.append(new_prices)
    }

    data_upload("indexes", indexes)
    data_upload("prices", prices)
    update_sales(prices.last(indexes))
}



// build up the admin interface
let el_drinks = document.getElementById("drinks");
let sale_buttons = {}
for(let i in default_prices){
	trigram = i
	fullname = default_prices[i]["nom_complet"]
	initial_price = default_prices[i]["prix_initial"]
	colour = default_prices[i]["colour"]

	bouton = new SaleButton(trigram, fullname, initial_price, colour)
	sale_buttons[trigram] = bouton

	el_drinks.appendChild(bouton.html())
}

let buttons_sale_drink = document.querySelectorAll('.drink')
buttons_sale_drink.forEach(function(button_sale) {
	button_sale.addEventListener('click', function() {
		let trigram = this.getAttribute('trigram')
		sales.new(trigram)
	});
})

function update_sales(new_price){
	for(let drink in new_price){
		sale_buttons[drink].update_dom(new_price[drink])
	}
}

countdown_new_price_el = document.getElementById("remaining_time_til_new_prices")
function update_countdown_new_price(){
    countdown_new_price_el.innerText = indexes.time_until_next()
}



// handles krach
html_el = document.getElementsByTagName("html")[0]
krach_button = document.getElementById("krach")
krach_button.addEventListener('click', () => {
    if(indexes.is_krach()){
        new_interval(false)
        html_el.classList.remove("active_krach")
    } else {
        new_interval(true)
        html_el.classList.add("active_krach")
    }
})
