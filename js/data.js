var last_updates = {}

function data_upload(variable_name, variable_value){
	if(typeof variable_value == 'object'){
		variable_value = JSON.stringify(variable_value)
	}

	last_updates[variable_name] = Date.now()
	localStorage.setItem("last_updates", JSON.stringify(last_updates))

	localStorage.setItem(variable_name, variable_value)
}

function data_get_information(variable_name, type = 'Object'){
	let value = localStorage.getItem(variable_name)

	if(type == 'Object'){
		return JSON.parse(value)
	} else if(type == 'str'){
		return value
	}
}

function get_last_update(variable_name){
	return JSON.parse(localStorage.getItem("last_updates"))[variable_name]
}

function has_data(){
	return false
}

class ChangeListener{
	constructor(variable_name){
		this.variable_name = variable_name
		this.last_update = 0
	}

	check(){
		let last_update = get_last_update(this.variable_name)
		if(last_update > this.last_update){
			this.value = data_get_information(this.variable_name)
			this.last_update = last_update
			return true
		}
		return false
	}
}

function round(x, n_digit){
    return Math.round(x * 10**n_digit) / 10**n_digit
}
