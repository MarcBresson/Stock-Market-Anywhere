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
var bieres = {}
var bieres_affichees = []
var nom_bieres = []
var nombre_bieres = 0
setInterval(function(){
	indice_courant = parseInt(localStorage.getItem("indice_courant"))
	if (indice_courant > indice_precedent){
		nombre_bieres = parseInt(localStorage.getItem("nombre_bieres"));
		krach_en_cours = localStorage.getItem("krach_en_cours");
		bieres = JSON.parse(localStorage.getItem("bieres"))

		if(bieres_affichees.length == 0){
			console.log("initialisation ...")
			nom_bieres = Object.keys(bieres);
			myChart.data.labels = Array(Math.min(indice_courant-1,nombre_prix_a_afficher)).fill("")
			afficher_bieres();

			generer_affichage_prix();

			indice_precedent = indice_courant;
		} else {
			ajout_data_bieres();
			maj_affichage_prix();
			indice_precedent += 1;
		}
		maj_affichage_moins_chere();
	}
}, 100)

setInterval(function(){
	afficher_bieres()
}, 15000)

var indice_biere_a_ajouter = 0
function afficher_bieres(){
	if(bieres_affichees.length >= quantite_courbes_a_afficher){
		removeDataset(myChart)
		bieres_affichees.splice(0,1)
	}

	while(bieres_affichees.length < quantite_courbes_a_afficher){
		afficher_biere(nom_bieres[indice_biere_a_ajouter])
		indice_biere_a_ajouter = (indice_biere_a_ajouter + 1) % nombre_bieres
	}
}

function afficher_biere(nom_biere){
	bieres_affichees.push(nom_biere)
	
	// console.log("nouvelle courbe affichee : " + nom_biere)
	let derniers_prix = bieres[nom_biere]["prix"].slice(-nombre_prix_a_afficher-1, -1)
	addDataset(myChart, bieres[nom_biere]["nom_complet"], derniers_prix, bieres[nom_biere]["couleur"])
}

function ajout_data_bieres(){
	if(myChart.data.labels.length>=nombre_prix_a_afficher){
		removeData(myChart);
		myChart.data.labels.slice(0,1);
	}
	let options = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
	let maintenant = new Date();
	myChart.data.labels.push(maintenant.toLocaleTimeString("fr-FR", options));

	for(let biere in bieres){
		let indice = bieres_affichees.indexOf(biere)
		if(indice>-1){
			addData(myChart, indice, bieres[biere]["prix"].at(-1))
		}
	}
	myChart.update();
}

function generer_affichage_prix(){
	let tableau = document.querySelector('#afficheur_prix tbody');
	for(let biere in bieres){
		tableau.innerHTML += 
			"<tr class='prix_" + biere + "'>" +
				"<td style='color:" + bieres[biere]["couleur"] + "'>&#11044;</td>" +
				"<td>" + bieres[biere]["nom_complet"] + "</td>" +
				"<td class='indice'>" + biere + "</td>" +
				"<td class='prix'>" + bieres[biere]["prix"].at(-1) + " &euro;</td>" +
				"<td class='croissance'>0 %</td>" +
			"</tr>"
	}
}

function maj_affichage_prix(){
	for(let biere in bieres){
		let el =  document.querySelector('#afficheur_prix .prix_' + biere);
		let el_prix = el.querySelector('.prix');
		el_prix.innerHTML = bieres[biere]["prix"].at(-1) + " &euro;"

		let el_croissance = el.querySelector('.croissance');
		let croissance = Math.round(bieres[biere]["prix"].at(-1)/bieres[biere]["prix"].at(-2) * 100) - 100;
		el_croissance.innerHTML = (croissance>0 ? "+" : "") + croissance + ' %';

		el.setAttribute("croissance", croissance>=0 ? "positive" : "negative")
	}
}

function maj_affichage_moins_chere(){
	var derniers_prix = []
	for(let biere in bieres){
		let prix = bieres[biere]["prix"].at(-1)
		derniers_prix.push([bieres[biere]["nom_complet"], prix])
	}
	
	derniers_prix.sort(function(first, second) {
		return first[1] - second[1];
	});
	derniers_prix = derniers_prix.splice(0,3)
	for(let i=0; i < 3; i++){
		document.querySelector("#moins_chere .indice#numero_" + (i+1)).innerHTML = derniers_prix[i][0];
	}
}