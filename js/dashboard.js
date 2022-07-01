var quantite_courbes_a_afficher = 10
var nombre_prix_a_afficher = 25

function removeData(chart) {
	chart.data.labels.splice(0,1);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.splice(0,1);
	});
}

function addData(chart, indice, data) {
	chart.data.datasets[indice].data.push(data)
}

function addDataset(chart, legend, data, couleur) {
	chart.data.datasets.push({
		type: 'line',
		label : legend,
		data: data,
		fill: false,
		borderColor: couleur,
		tension : 0.3,
	  });
	chart.update();
}

function removeDataset(chart) {
	chart.data.datasets.splice(0,1)
}

var indice_courant = 0
var indice_precedent = 0
var krach_en_cours = 0
var boissons = {}
var boissons_affichees = []
var nom_boissons = []
var nombre_boissons = 0


setInterval(function(){
	indice_courant = parseInt(localStorage.getItem("indice_courant"))
	if (indice_courant > indice_precedent){
		nombre_boissons = parseInt(localStorage.getItem("nombre_boissons"));
		krach_en_cours = localStorage.getItem("krach_en_cours");
		boissons = JSON.parse(localStorage.getItem("boissons"))

		//si on vient d'afficher le dashboard
		if(boissons_affichees.length == 0){
			console.log("initialisation ...")
			nom_boissons = Object.keys(boissons);
			generer_affichage_prix();
			myChart.data.labels = Array(Math.min(indice_courant,nombre_prix_a_afficher)).fill("") //gère les labels sur l'axe x
			afficher_boissons();


			indice_precedent = indice_courant;
		}
		//si c est une mise a jour du dashboard
		else {
			ajout_data_boissons();
			maj_affichage_prix();
			indice_precedent += 1;
		}

		maj_affichage_moins_chere();
		
		if(krach_en_cours == 'true'){
			document.querySelector("body").classList.toggle("red", true)
			document.querySelector("body").classList.toggle("dark", false)
		} else {
			document.querySelector("body").classList.toggle("dark", true)
			document.querySelector("body").classList.toggle("red", false)
		}
	}
}, 400)

//on fait tourner les boissons affichées toutes les 15s
setInterval(function(){
	afficher_boissons()
}, 15000)

var indice_boisson_a_ajouter = 0
function afficher_boissons(){
	if(boissons_affichees.length >= quantite_courbes_a_afficher){
		removeDataset(myChart)
		boissons_affichees.splice(0,1)
	}

	while(boissons_affichees.length < quantite_courbes_a_afficher){
		afficher_boisson(nom_boissons[indice_boisson_a_ajouter])
		indice_boisson_a_ajouter = (indice_boisson_a_ajouter + 1) % nombre_boissons
	}
}

function afficher_boisson(nom_boisson){
	
	let derniers_prix = boissons[nom_boisson]["prix"].slice(-nombre_prix_a_afficher)
	addDataset(myChart, boissons[nom_boisson]["nom_complet"], derniers_prix, boissons[nom_boisson]["couleur"])
	boissons_affichees.push(nom_boisson)
}

function ajout_data_boissons(){
	if(myChart.data.labels.length>=nombre_prix_a_afficher){
		removeData(myChart);
		myChart.data.labels.slice(0,1);
	}
	let options = {hour: "2-digit", minute: "2-digit"};
	let maintenant = new Date();
	myChart.data.labels.push(maintenant.toLocaleTimeString("fr-FR", options));

	for(let boisson in boissons){
		let indice = boissons_affichees.indexOf(boisson)
		if(indice>-1){
			addData(myChart, indice, boissons[boisson]["prix"].at(-1))
		}
	}
	myChart.update();
}

function generer_affichage_prix(){
	let tableau = document.querySelector('#afficheur_prix tbody');
	for(let boisson in boissons){
		tableau.innerHTML += 
			"<tr class='prix_" + boisson + "'>" +
				"<td style='color:" + boissons[boisson]["couleur"] + "'>&#11044;</td>" +
				"<td>" + boissons[boisson]["nom_complet"] + "</td>" +
				"<td class='indice'>" + boisson + "</td>" +
				"<td class='prix'>" + boissons[boisson]["prix"].at(-1) + " &euro;</td>" +
				"<td class='croissance'>0 %</td>" +
			"</tr>"
	}
}

function maj_affichage_prix(){
	for(let boisson in boissons){
		let el =  document.querySelector('#afficheur_prix .prix_' + boisson);
		let el_prix = el.querySelector('.prix');
		el_prix.innerHTML = boissons[boisson]["prix"].at(-1) + " &euro;"

		let el_croissance = el.querySelector('.croissance');
		let croissance = Math.round(boissons[boisson]["prix"].at(-1)/boissons[boisson]["prix"].at(-2) * 100) - 100;
		el_croissance.innerHTML = (croissance>0 ? "+" : "") + croissance + ' %';

		if(croissance == 0){el_class = ""}
		else if(croissance > 0){el_class = "positive"}
		else {el_class = "negative"}
		el.setAttribute("croissance", el_class)
	}
}

function maj_affichage_moins_chere(){
	var derniers_prix = []
	for(let boisson in boissons){
		let prix = boissons[boisson]["prix"].at(-1)
		derniers_prix.push([boissons[boisson]["nom_complet"], prix])
	}
	
	derniers_prix.sort(function(first, second) {
		return first[1] - second[1];
	});
	derniers_prix = derniers_prix.splice(0,3)
	for(let i=0; i < 3; i++){
		document.querySelector("#moins_chere .indice#numero_" + (i+1)).innerHTML = derniers_prix[i][0];
	}
}
