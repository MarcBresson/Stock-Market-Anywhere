var prices = new Prices()
refresh_period = 60
var indexes = new Indexes(refresh_period)
var sales = new Sales()


function start_from_nothing(){
    indexes.new(false)
    prices.set_default()

    init()
}

function reload(){
    indexes.load(data_get_information("indexes"))
    prices.load(data_get_information("prices"))
    sales.load(data_get_information("sales"))
}

function init(){
    for(let trigram in sale_buttons){
        sale_buttons[trigram].dom.removeAttribute("disabled")
    }

    x = setInterval(() => {
        if(indexes.is_time_for_next()){
            new_interval()
        }

        update_countdown_new_price()
    }, (1000));

    data_upload("indexes", indexes)
    data_upload("prices", prices)
    data_upload("is_krach", false)
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

    data_upload("sales", sales)
    data_upload("indexes", indexes)
    data_upload("prices", prices)
    data_upload("is_krach", indexes.is_krach())
    update_sales(prices.last(indexes))
}

function update_sales(new_price){
	for(let drink in new_price){
		sale_buttons[drink].update_dom(new_price[drink])
	}
}

// build up the admin interface
let el_drinks = document.getElementById("drinks");
var sale_buttons = {}
for(let trigram in default_prices){
	let fullname = default_prices[trigram]["full_name"]
	let initial_price = default_prices[trigram]["initial_price"]
	let colour = default_prices[trigram]["colour"]

	let bouton = new SaleButton(trigram, fullname, initial_price, colour)
	sale_buttons[trigram] = bouton

	el_drinks.appendChild(bouton.html())
}

for(let trigram in sale_buttons){
    sale_buttons[trigram].dom.addEventListener('click', function() {
        let actual_price = sale_buttons[trigram].actual_price
		sales.new(trigram, actual_price)

        new_sale_animation(default_prices[trigram]["colour"], actual_price)
        sale_buttons[trigram].add_counter(trigram)
        data_upload("new_sale", [default_prices[trigram]["colour"], actual_price])
	})
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
