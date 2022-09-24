class Sales{
    sales = []
    // sales = [
    //     ["tor", datetime, price],
    //     ["bar", datetime, price],
    //     ["plo", datetime, price],
    //     ["tor", datetime, price],
    //     ["tor", datetime, price],
    // ]
    most_sold = {}

    new(drink_trigram, price){
        this.sales.push([drink_trigram, Date.now(), price])

        if(drink_trigram in this.most_sold){
            this.most_sold[drink_trigram] ++
        } else {
            this.most_sold[drink_trigram] = 1
        }
    }

    load(json_object){
        this.sales = json_object.sales
        this.most_sold = json_object.most_sold
    }

    toCSV(){
        let str_csv = "trigram,sales timestamp,price\n"
        str_csv += this.sales.map(arr => (arr.join(","))).join("\n")

        return str_csv
    }

    between(start, end){
        if(this.sales.length == 0){return []}

        let i_start = 0
        while(this.sales[i_start][1] < start){i_start++}

        let i_end = i_start
        while(this.sales[i_end][1] < end){i_end++}

        return this.sales.slice(i_start, i_end)
    }

    since(since){
        if(this.sales.length == 0){return []}

        let i = this.sales.length
        while(i > 1 && this.sales[i-1][1] > since){i --}

        return this.sales.slice(i)
    }

    cumulative_sales(sales_extract){
        let sales_per_drink = {}
        for(let sale in sales_extract){
            let drink_trigram = sales_extract[sale][0]
    
            if(drink_trigram in sales_per_drink){
                sales_per_drink[drink_trigram] += 1
            } else {
                sales_per_drink[drink_trigram] = 1
            }
        }

        // sales_per_drink = {
        //     "tor": 3,
        //     "bar": 1,
        //     "plo": 1
        // }
        return sales_per_drink
    }
}
