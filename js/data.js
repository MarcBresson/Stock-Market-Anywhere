// only transfer new prices

function transfert_informations(){
	localStorage.setItem("indice_courant", indice_courant);
	localStorage.setItem("krach_indices", JSON.stringify(krach_indices));
	localStorage.setItem("krach_en_cours", krach_en_cours);
	localStorage.setItem("nombre_boissons", nombre_boissons);
	localStorage.setItem("boissons", JSON.stringify(boissons));
}

// display only x minutes of data
// display price evolution on x minutes
function get_information(){
    
}

function has_data(){
	return true
}
