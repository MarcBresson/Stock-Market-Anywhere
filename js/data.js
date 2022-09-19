var last_updates = {}

function data_upload(variable_name, variable_value){
	if(typeof variable_value == 'object'){
		variable_value = JSON.stringify(variable_value)
	}

	last_updates[variable_name] = Date.now()
	localStorage.setItem("last_updates", last_updates)

	localStorage.setItem(variable_name, variable_value)
}

function data_get_information(variable_name){
    return localStorage.getItem(variable_name)
}

function has_data(){
	return false
}
