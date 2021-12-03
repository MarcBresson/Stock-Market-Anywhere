var interval_temps = 15; //en secondes

var debut_soiree = Date.parse("2021-12-02T13:53:00"); // format yyyy-mm-ddThh:mm:ss
var fin_soiree = Date.parse("2021-12-09T00:15:00");

var nombre_interval = Math.ceil((fin_soiree-debut_soiree)/1000/interval_temps);

var multiplicateur_variation = 5;