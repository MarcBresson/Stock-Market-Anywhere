// default_prices is "imported" from the admin.html file
// Sales is "imported" from the admin.html file

class Prices{
    price_history = {}
    // price_history structure :
    // {
    //      "tor": [3.2, 4, 5],
    //      "bar": [1.5, 1.34, 1.7],
    //      "plo": [0.62, 0.45, 0.2],
    // }
    coef_multiplicator = 100

    append(prices_dict){
        for(let drink in this.price_history){
            if(drink in prices_dict){
                this.price_history[drink].push(prices_dict[drink])
            }
        }

        return this
    }

    default(){
        let default_normal_prices = {}
        for(let drink in default_prices){
            default_normal_prices[drink] = default_prices[drink]["prix_initial"]
        }

        return default_normal_prices
    }

    set_default(){
        let default_normal_prices = this.default()

        for(let drink in default_normal_prices){
            this.price_history[drink] = [default_normal_prices[drink]]
        }
        this.number_of_drinks = Object.keys(default_normal_prices).length
    }

    krach(){
        let krach_prices = {}
        for(let drink in default_prices){
            krach_prices[drink] = default_prices[drink]["prix_krach"]
        }

        return krach_prices
    }

    price_variation(new_sales, former_prices, milliseconds_since_last_update){
        // compte le nombre total de boissons vendues sur l'intervalle de temps.
        let total_sales = new_sales.length
    
        let sales_per_drink = new Sales().cumulative_sales(new_sales)
        for(let drink in former_prices){
            if(!(drink in sales_per_drink)){
                sales_per_drink[drink] = 0
            }
        }
    
        let average_sales = total_sales / this.number_of_drinks
        let maximum = Math.max(...Object.values(sales_per_drink));
        let centered_sales = this.center_sales(sales_per_drink, average_sales, maximum)
    
        // tend to coef_multiplicator's value when total_sales goes to infinity
        // those points are then shared between the drinks
        let max_var_per_minute = (Math.atan(total_sales/10) / (Math.PI/2) * this.coef_multiplicator)
        let max_var = max_var_per_minute * milliseconds_since_last_update / 1000 / 60
        for(let drink in centered_sales){
            centered_sales[drink] = centered_sales[drink] * max_var
        }
    
        return centered_sales
    }
    
    center_sales(sales_per_drink, average, max){
        max = Math.max(max, 1);
    
        let centered_sales = {}
        for(let drink in sales_per_drink){
            centered_sales[drink] = (sales_per_drink[drink] - average) / max
        }
    
        return centered_sales
    }

    last_non_krach(indexes){
        let number_of_completed_indexes = indexes.party_index.length - 1
        let last_non_krach_index = indexes.last_non_krach_index()

        let last_non_krach = {}
        for(let drink in this.price_history){
            if(this.price_history[drink].length == number_of_completed_indexes){ // take only drinks that are still updated
                last_non_krach[drink] = this.price_history[drink][last_non_krach_index]
            }
        }

        return last_non_krach
    }

    last(indexes){
        let number_of_indexes = indexes.party_index.length

        let last_prices = {}
        for(let drink in this.price_history){
            if(this.price_history[drink].length == number_of_indexes){ // take only drinks that are still updated
                last_prices[drink] = this.price_history[drink][number_of_indexes - 1]
            }
        }

        return last_prices
    }
    
    compute_new_prices(new_sales, indexes){
        let last_non_krach_party_index = indexes.last_non_krach_party_index()
        let milliseconds_since_last_update = Date.now() - last_non_krach_party_index[0]
        
        let former_prices = this.last_non_krach(indexes)

        let price_var = this.price_variation(new_sales, former_prices, milliseconds_since_last_update)
    
        let new_prices = {}
        for(let drink in this.price_history){
            new_prices[drink] = (former_prices[drink]
                                * (1 + price_var[drink] / 100))
        }
    
        return new_prices
    }
}