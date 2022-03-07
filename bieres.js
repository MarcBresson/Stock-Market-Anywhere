var recreate = true;

if(localStorage.getItem("restaurer_sauvegarde")){
	bieres = JSON.parse(localStorage.getItem("bieres"));
	var indice_courant = localStorage.getItem("indice_courant");
	var krach_en_cours = localStorage.getItem("krach_en_cours");
	var krach_indices = localStorage.getItem("krach_indices");
	if(bieres !== null){
		recreate = false;
	}
}

if(recreate){
	var bieres = {
		"cuv" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "volatilité" : 0.1, "nom_complet":"Cuvée des Trolls "},
		"bar" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Barbar"},
		"cho" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Chouffe"},
		"duv" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Duvel"},
		"trk" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Triple K"},
		"kwk" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Kwak"},
		"gul" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Gulden Draak"},
		"kaa" : {"prix_initial" : 2.0, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Kaastel Triple"},
		"hoe" : {"prix_initial" : 0.8, "prix_krach" : 0.5, "volatilité" : 1, "nom_complet":"Hoegaarden blanche"},
		"pel" : {"prix_initial" : 0.5, "prix_krach" : 0.3, "volatilité" : 1, "nom_complet":"Pelforth"},
		"cht" : {"prix_initial" : 1.0, "prix_krach" : 0.6, "volatilité" : 1, "nom_complet":"Chti"},
		"lef" : {"prix_initial" : 1.0, "prix_krach" : 0.6, "volatilité" : 1, "nom_complet":"Leffe"},
		"des" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Despe"},
		"mor" : {"prix_initial" : 1.0, "prix_krach" : 0.6, "volatilité" : 1, "nom_complet":"Mordue"},
		"pec" : {"prix_initial" : 1.5, "prix_krach" : 1.5, "volatilité" : 1, "nom_complet":"Peche Mel"},
		"cor" : {"prix_initial" : 2.0, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Corona"},
		"pin" : {"prix_initial" : 1.5, "prix_krach" : 1.1, "volatilité" : 1, "nom_complet":"Pinte Sangria"},
		"Pbet" : {"prix_initial" : 3, "prix_krach" : 2.0, "volatilité" : 1, "nom_complet":"Bête (Pinte)"},
		"Ptro" : {"prix_initial" : 3, "prix_krach" : 2.0, "volatilité" : 1, "nom_complet":"Troubadour (Pinte)"},
		"Pkaa" : {"prix_initial" : 3, "prix_krach" : 2.0, "volatilité" : 1, "nom_complet":"Kaastel Rouge (Pinte)"},
		"Pbar" : {"prix_initial" : 3, "prix_krach" : 2.0, "volatilité" : 1, "nom_complet":"Babar (Pinte)"},
	}

	var nombre_bieres = 0

	for(let i in bieres){
		bieres[i]["ventes"] = [0];
		bieres[i]["prix"] = [bieres[i]["prix_initial"]];
		nombre_bieres += 1;
	}

	var compteur = 0
	for(let i in bieres){
		if(!bieres[i]["couleur"]){
			bieres[i]["couleur"] = "hsl(" + Math.ceil(compteur * 360 / (nombre_bieres+1)) + ", 56%, 60%)";
		}
		compteur += 1
	}
}