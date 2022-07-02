var ventes_totales = 0;
var dernieres_ventes = {};
for(let boisson in boissons){
	dernieres_ventes[boisson] = 0;
}


if(localStorage.getItem("restaurer_sauvegarde")=="true"){
	var indice_courant = localStorage.getItem("indice_courant");
	var krach_en_cours = localStorage.getItem("krach_en_cours");
	var krach_indices = JSON.parse(localStorage.getItem("krach_indices"));
} else { //s'il n'y a aucune sauvegarde
	console.log("nouvelle soirée")
	var indice_courant = 0;
	var krach_en_cours = false;
	var krach_indices = [];
}

// ========= gestion du temps ===========
// affiche le temps restant et lorsque la soirée débute, cette partie gère
// les exécutions des différentes fonctions à intervalle de temps régulier.
var avant_soiree = true;
setInterval(function(){
	// si la soirée n'a pas encore commencé, on affiche un décompte avant
	// son début.
	if(avant_soiree){
		let minutes_avant_debut = Math.round((debut_soiree - Date.now())/1000/60)
		document.getElementById('temps_restant_soiree').innerHTML = minutes_avant_debut + " min"
		if (minutes_avant_debut<0){
			avant_soiree = false
			document.getElementById('texte_temps_restant').innerHTML = "temps avant la fin de la soirée : "
		}
	}
	else {
		temps_restant = (fin_soiree - Date.now())/1000

		// affiche le temps restant avant la fin de la soirée.
		let minutes_avant_fin = Math.round(temps_restant/60)
		document.getElementById('temps_restant_soiree').innerHTML = minutes_avant_fin + " min"

		// affiche le temps avant le prochain recalcule des prix.
		let secondes_avant_refresh = Math.round(temps_restant)%interval_temps
		document.getElementById('temps_restant_interval').innerHTML = secondes_avant_refresh + " s"
	

		// execute toutes les fonctions pour le recalcule des prix.
		if(secondes_avant_refresh == 0){
			calcul_ventes();

			if(krach_en_cours){
				krach_indices.push(indice_courant);
			}

			// c est une boucle pour avoir la première clé du dictionnaire.
			for(let boisson in boissons){
				indice_courant = boissons[boisson]["prix"].length;
				console.log("indice courant : " + indice_courant)
				break;
			}

			transfert_informations();
			
			affichage_prix();
			reset_ventes();
		}
	}
}, 1*1000);


function calcul_ventes(){
	// compte le nombre total de boissons vendues sur l'intervalle de temps.
	const reducer = (previousValue, currentValue) => previousValue + currentValue;
	let ventes_totales_interval = Object.values(dernieres_ventes).reduce(reducer)
	var ventes_moyennes = ventes_totales_interval/nombre_boissons;

	// gère la variation max en fonction du nombre de ventes totales.
	// tend vers 80% quand le nombre de ventes tend vers +inf.
	// 10 ventes toutes boissons confondues vont faire une variation de 40%.
	// Cette variation sera ensuite répartie entre toutes les boissons.
	let variation_max = Math.atan(ventes_totales_interval/10);
	variation_max = variation_max / (Math.PI/2) * 80;

	let maximum = Math.max(...Object.values(dernieres_ventes));
	let extremum = Math.max(maximum, 1); //on evite la division par 0

	var ventes_centre = {} //ventes recentrées en 0

	for(let boisson in dernieres_ventes){
		ventes_centre[boisson] = (dernieres_ventes[boisson] - ventes_moyennes) / extremum * variation_max;
	}

	calcul_prix(ventes_centre);
}

function calcul_prix(ventes_centre){
	// Répartit la variation des prix. Si une boisson a moins été vendu que
	// la moyenne, son prix diminuera. Si elle a plus été vendue, son
	// prix augmentera.
	for(let boisson in ventes_centre){
		let nombre_prix_a_prendre_en_compte = Math.floor(1/boissons[boisson]["volatilité"]);

		if(krach_en_cours){
			nouveau_prix = boissons[boisson]["prix_krach"];
		}
		else {
			var cumule_prix = 0;
			var decalage = 0;
			let compteur = 0;
			// gère la volatilite des prix. Si on veut qu'une boisson ait son prix
			// lissé sur plusieurs intervalles, on peut lui définir une volatilité
			// dans le fichier de configuration.
			for(var ii=nombre_prix_a_prendre_en_compte; ii>0; ii--){

				while(krach_indices.includes(indice_courant - ii - decalage)){ //on compte pas les prix pendant le krach
					decalage += 1;
				}

				var prix_historique = (100 + ventes_centre[boisson])/100 * boissons[boisson]["prix"].at(indice_courant - ii - decalage);
				// prix_historique peut ne pas exister (si indice_courant - ii - decalage < 0).
				// cette condition protège du undefined.
				if(prix_historique){
					cumule_prix += prix_historique
					compteur += 1
				}
			}
			nouveau_prix = Math.round(cumule_prix/compteur*100)/100;
		}

		boissons[boisson]["prix"].push(nouveau_prix);
	}
}

function affichage_prix(){
	for(let i in boissons){
		let DOM_boisson_prix = document.querySelector('[nom_boisson="' + i + '"] .prix');
		DOM_boisson_prix.innerText = boissons[i]["prix"].at(-1);
	}
}

function reset_ventes(){
	boutons_ventes_boissons.forEach(function(bouton_vente) {
		let DOM_nbr_vente = bouton_vente.querySelector(".nbr_ventes");
		DOM_nbr_vente.innerText = 0;
	});
	for(let boisson in boissons){
		dernieres_ventes[boisson] = 0;
	}
}

// pour faire communiquer deux fenêtre d'un navigateur, on passe par le local storage.
function transfert_informations(){
	localStorage.setItem("indice_courant", indice_courant);
	localStorage.setItem("krach_indices", JSON.stringify(krach_indices));
	localStorage.setItem("krach_en_cours", krach_en_cours);
	localStorage.setItem("nombre_boissons", nombre_boissons);
	localStorage.setItem("boissons", JSON.stringify(boissons));
}
