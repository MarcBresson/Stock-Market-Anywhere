var default_prices = {
    "cuv" : {"prix_initial" : 1.5, "prix_krach" : 0.7, "nom_complet":"Cuvée des Trolls "},
    "bar" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "nom_complet":"Barbar"},
    "cho" : {"prix_initial" : 2.0, "prix_krach" : 1.12, "nom_complet":"Chouffe"},
    "duv" : {"prix_initial" : 1.5, "prix_krach" : 0.8, "nom_complet":"Duvel"},
    "trk" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "nom_complet":"Triple K"},
    "kwk" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "nom_complet":"Kwak"},
    "gul" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "nom_complet":"Gulden Draak"},
    "kaa" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "nom_complet":"Kaastel Triple"},
    "hoe" : {"prix_initial" : 0.8, "prix_krach" : 0.2, "nom_complet":"Hoegaarden blanche"},
    "pel" : {"prix_initial" : 0.5, "prix_krach" : 0.2, "nom_complet":"Pelforth"},
    "cht" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "nom_complet":"Chti"},
    "lef" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "nom_complet":"Leffe"},
    "des" : {"prix_initial" : 1.5, "prix_krach" : 0.7, "nom_complet":"Despe"},
    "mor" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "nom_complet":"Mordue"},
    "pec" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "nom_complet":"Peche Mel"},
    "cor" : {"prix_initial" : 2.0, "prix_krach" : 0.7, "nom_complet":"Corona"},
    "pin" : {"prix_initial" : 1.5, "prix_krach" : 0.8, "nom_complet":"Pinte Sangria"},
    "Pbet" : {"prix_initial" : 3, "prix_krach" : 1.4, "nom_complet":"Bête (Pinte)"},
}

compteur = 0
number_of_drinks =  Object.keys(default_prices).length
for(let i in default_prices){
    if(!default_prices[i]["colour"]){
        default_prices[i]["colour"] = "hsl(" + Math.ceil(compteur * 360 / (number_of_drinks+1)) + ", 90%, 60%)";
    }
    compteur += 1
}
