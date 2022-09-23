var default_prices = {
    "cuv" : {"initial_price" : 1.5, "krach_price" : 0.7, "min_price" : 0.4, "full_name":"Cuvée des Trolls "},
    "bar" : {"initial_price" : 2.0, "krach_price" : 1.1, "min_price" : 1.0, "full_name":"Barbar"},
    "cho" : {"initial_price" : 2.0, "krach_price" : 1.12, "min_price" : 0.8, "full_name":"Chouffe"},
    "duv" : {"initial_price" : 1.5, "krach_price" : 0.8, "min_price" : 0.4, "full_name":"Duvel"},
    "trk" : {"initial_price" : 2.0, "krach_price" : 1.1, "min_price" : 0.9, "full_name":"Triple K"},
    "kwk" : {"initial_price" : 2.0, "krach_price" : 1.1, "full_name":"Kwak"},
    "gul" : {"initial_price" : 2.0, "krach_price" : 1.1, "full_name":"Gulden Draak"},
    "kaa" : {"initial_price" : 2.0, "krach_price" : 1.1, "full_name":"Kaastel Triple"},
    "hoe" : {"initial_price" : 0.8, "krach_price" : 0.2, "full_name":"Hoegaarden blanche"},
    "pel" : {"initial_price" : 0.5, "krach_price" : 0.2, "full_name":"Pelforth"},
    "cht" : {"initial_price" : 1.0, "krach_price" : 0.3, "full_name":"Chti"},
    "lef" : {"initial_price" : 1.0, "krach_price" : 0.3, "full_name":"Leffe"},
    "des" : {"initial_price" : 1.5, "krach_price" : 0.7, "full_name":"Despe"},
    "mor" : {"initial_price" : 1.0, "krach_price" : 0.3, "full_name":"Mordue"},
    "pec" : {"initial_price" : 1.5, "krach_price" : 1.1, "full_name":"Peche Mel"},
    "cor" : {"initial_price" : 2.0, "krach_price" : 0.7, "full_name":"Corona"},
    "pin" : {"initial_price" : 1.5, "krach_price" : 0.8, "full_name":"Pinte Sangria"},
    "Pbet" : {"initial_price" : 3, "krach_price" : 1.4, "full_name":"Bête (Pinte)"},
    "Car" : {"initial_price" : 1.14, "krach_price" : 1.4, "full_name":"Cart'naval"},
}

compteur = 0
number_of_drinks =  Object.keys(default_prices).length
for(let i in default_prices){
    if(!default_prices[i]["colour"]){
        default_prices[i]["colour"] = "hsl(" + Math.ceil(compteur * 360 / (number_of_drinks+1)) + ", 90%, 60%)";
    }
    compteur += 1
}
