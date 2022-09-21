<div align="center">
    <h1>Stock Market Emulation</h1>
    <h2>Developed par Marc Bresson</h2>
    <p align="center">
        <a href="https://linkedin.com/in/marc--bresson"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555"/></a>
    </p>
</div>

Personnal project of a entierly local web app that requires no installation. This web app emulates the stock market on anything with a price variation depending on the sale volume.

# Let the party begin !

![Countdown : let the party begin !](images/countdown.png)

You will need two screens for this app. One for the administration panel, where you register sales, and the other one for the public dashboard with every prices, curves etc.

![administration panel](images/admin.png)

![interface administrateur](images/dashboard_normal_1.png)

## Initialisation

Edit your prices in `parameters > default_prices.js`. You have to follow this structure :

```json
{
    "tgr" : {
        "initial_price": 1.0, // the start price
        "krach_price": 0.5, // the price of the good during the krach periods
        "full_name": "Trigram", // the full name of the good
        "min_price": 0.4 // OPTIONAL : the minimum price. If not specified, the good will not have any limit, and will be regulated by the market
    }
}
```

Open admin.html in chrome or Edge (doesn't work on Firefox, see #18), and follow the instructions. You will be prompted to either `program the start of the party`, or `start now`.

## Pendant la soirée

Vous pouvez regler l'intervalle de temps entre chaque calcul à tout moments dans la soirée. Ouvrez les outils de développement de la page admin.html (F12 ou bien clic droit sur la page > inspecter > console) et tapez : `intervalle_temps = ...` avec une valeur en seconde.

De même, il est possible de changer la " puissance " des variations en tapant au même endroit `multiplicateur_variation = ... (=5 par défaut)`.

/!\ n'actualisez surtout pas la page admin.html, car vos données seront ré-initialisées.

# License

This license lets you remix, adapt, and build upon this work non-commercially, as long as you credit me and license your new creations under the identical terms.

![license CC BY-NC-SA](images/license.png)
