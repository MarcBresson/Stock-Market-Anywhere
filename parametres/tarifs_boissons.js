var recreate = true;

if(localStorage.getItem("restaurer_sauvegarde")=="true"){
	boissons = JSON.parse(localStorage.getItem("boissons"));
	var nombre_boissons = parseInt(localStorage.getItem("nombre_boissons"));
	if(boissons !== null){
		recreate = false;
	}
}

if(recreate){
	var boissons = {
		"cuv" : {"prix_initial" : 1.5, "prix_krach" : 0.7, "volatilité" : 1, "nom_complet":"Cuvée des Trolls "},
		"bar" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Barbar"},
		"cho" : {"prix_initial" : 2.0, "prix_krach" : 1.12, "volatilité" : 1, "nom_complet":"Chouffe"},
		"duv" : {"prix_initial" : 1.5, "prix_krach" : 0.8, "volatilité" : 1, "nom_complet":"Duvel"},
		"trk" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Triple K"},
		"kwk" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Kwak"},
		"gul" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Gulden Draak"},
		"kaa" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Kaastel Triple"},
		"hoe" : {"prix_initial" : 0.8, "prix_krach" : 0.2, "volatilité" : 1, "nom_complet":"Hoegaarden blanche"},
		"pel" : {"prix_initial" : 0.5, "prix_krach" : 0.2, "volatilité" : 1, "nom_complet":"Pelforth"},
		"cht" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "volatilité" : 1, "nom_complet":"Chti"},
		"lef" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "volatilité" : 1, "nom_complet":"Leffe"},
		"des" : {"prix_initial" : 1.5, "prix_krach" : 0.7, "volatilité" : 1, "nom_complet":"Despe"},
		"mor" : {"prix_initial" : 1.0, "prix_krach" : 0.3, "volatilité" : 1, "nom_complet":"Mordue"},
		"pec" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Peche Mel"},
		"cor" : {"prix_initial" : 2.0, "prix_krach" : 0.7, "volatilité" : 1, "nom_complet":"Corona"},
		"pin" : {"prix_initial" : 1.5, "prix_krach" : 0.8, "volatilité" : 1, "nom_complet":"Pinte Sangria"},
		"Pbet" : {"prix_initial" : 3, "prix_krach" : 1.4, "volatilité" : 1, "nom_complet":"Bête (Pinte)"},
	}

	var nombre_boissons = 0

	for(let i in boissons){
		boissons[i]["ventes"] = [0];
		boissons[i]["prix"] = [boissons[i]["prix_initial"]];
		nombre_boissons += 1;
	}

	var compteur = 0
	for(let i in boissons){
		if(!boissons[i]["couleur"]){
			boissons[i]["couleur"] = "hsl(" + Math.ceil(compteur * 360 / (nombre_boissons+1)) + ", 56%, 60%)";
		}
		compteur += 1
	}
}
