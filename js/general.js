var prices = new Prices()
var indexes = new Indexes()
var sales = new Sales()

// check if data exists => resume, download, reset
function resume(){

}

// check if it is before the party => program a start / starts now
function starts(){
    indexes.new(false)
    prices.set_default()
}

refresh_seconds = 10
x = setInterval(() => {
    if(indexes.last()[0] + refresh_seconds * 1000 < Date.now()){
        new_interval()
    }
}, (1000));

function new_interval(set_krach = null){
    indexes.end()
    indexes.new(set_krach)

    if(indexes.is_krach()){
        krach_prices = prices.krach()
        prices.append(krach_prices)
    } else {
        new_sales_start = indexes.last_non_krach_party_index()[0]
        new_sales = sales.since(new_sales_start)
    
        new_prices = prices.compute_new_prices(new_sales, indexes)
        prices.append(new_prices)
    }

    update_sales(prices.last(indexes))
}
