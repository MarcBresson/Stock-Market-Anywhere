class SaleButton{
    constructor(trigram, fullname, initial_price, colour){
        this.trigram = trigram
        this.fullname = fullname
        this.initial_price = initial_price
        this.actual_price = initial_price
        this.colour = colour
    }

    html(){
        bouton = document.createElement('div');
		bouton.id = this.trigram;
		bouton.className = "drink";
		bouton.setAttribute("trigram", trigram)

		bouton.innerHTML = 
			"<div class='name'><span class='trigram'>" + this.trigram + "</span> - <span class='full_name'>" + this.fullname + "</span></div>" +
			"<div class='infos'><div class='prices'>" +
			"<span class='actual_price'>" + this.actual_price + "€</span>" +
				"<div>" +
				"<div class='initial_price'>" + this.initial_price + "€</div>" +
				"<div class='variation'>0%</div>" +
			"</div></div>" +
			"<div class='add_sale' style='background-color:" + this.colour + "'>+1</div>" +
			"</div>"

        return bouton
    }

    update_dom(new_price){
        this.actual_price = new_price

        let el = document.getElementById(this.trigram)
        el.querySelector('.actual_price').innerHTML = round(new_price, 2) + "€"

        let variation = round((new_price / this.initial_price - 1) * 100, 1)
        let variation_sign
        variation > 0 ? variation_sign = "+" : variation_sign = ""
        el.querySelector('.variation').innerHTML = variation_sign + variation + "%"

        variation > 0 ? variation_sign = "positive" : variation_sign = "neutral"
        variation < 0 ? variation_sign = "negative" : ""
        el.querySelector('.variation').setAttribute("sign", variation_sign)
    }
}

function round(x, n_digit){
    return Math.round(x * 10**n_digit) / 10**n_digit
}