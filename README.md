<div align="center">
    <h1>Stock Market Anywhere</h1>
    <img src="images/SMA%20logo.png" style="max-width:500px"/>
    <h2>Developed by Marc Bresson</h2>
    <p align="center">
        <a href="https://linkedin.com/in/marc--bresson"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555"/></a>
    </p>
</div>

Personnal project of a web app that reproduce the stock market on anything, with a price variation depending on the sale volume. This web app is entirely local, and requires no installation.

# Let the party begin !

![Countdown : let the party begin !](images/countdown.png)

You will need two screens for this app. One for the administration panel, where you register sales, and the other one for the public dashboard with prices, chart etc.

![administration panel](images/admin.png)

![administration interface](images/dashboard_normal_1.png)

## Initialisation

Edit your goods and prices in `parameters > default_prices.js`. You have to follow this structure :

```js
{
    "tgr" : { // the trigram of the good
        "full_name": "Trigram", // the full name of the good
        "initial_price": 1.0, // the start price
        "krach_price": 0.5, // the price of the good during the krach periods
        "min_price": 0.4 // OPTIONAL : the minimum price. If not specified, the good will not have any limit, and will be regulated by the market
    }
}
```

Open admin.html in Chrome or Edge (unfortunately, it doesn't work on Firefox, see #18), and follow the instructions. You will be prompted to either `Schedule the party`, or `Start now`.

![hello you](images/hello_you.png)

### Going with `Schedule the party`

![hello you](images/schedule_the_party.png)

You will be asked at what time to start the party, and for a message for the countdown. Once you click on `validate`, another window will pop-up with the displayed countdown. It is intended for the public. When the countdown hits 0, it will automatically switch to the dashboard.

### Going with `Start now`

This will immediately open the dashboard in another window. Place this window on your second public screen, and keep the admin panel for your team and yourself.

## During the party

### Make a sale

![Cart'naval](images/cartnaval.png)

By clicking on the buttons, you can register a new sale. You have a few information on every button :
- At the top in bold, you have the trigram followed by the full name
- At the bottom left in bold, you have the current price
- In green at the bottom, you have the variation between the initial price and the current price
- Just above the variation, you have the initial price
- In black on a colourful background, you have the number of sales during the current interval

### Make a krach

Using the light red button on the top right corner, you can immediatly start a krach period. During a krach, all prices drop down to what you defined in `default_prices.js`.

Prices after the krach will return to their pre-krach level.

![Dashboard krach](images/dashboard_krach.png)

### Change interval time or price variation amplification

If you want to change the default interval time (60s) or the default price variation amplification (100, see the wiki on how are new prices calculated), you can use the parameters button at the top of the administration panel.

Here, you can change parametres, and validate them by clicking the `validate` button.

![Parametres](images/parametres.png)

## Stop the party

There is no mecanism to stop the party. You can close the admin tab, or reload it. By doing so, the public dashboard will no longer be updated.

If you choose to reload it, you will be able to download your party data in CSV format.

![Download](images/party_going.png)

# License

This license lets you remix, adapt, and build upon this work non-commercially, as long as you credit me and license your new creations under the identical terms.

If you want to use it commercialy, do not hesitate to contact me, I will be glad to help.

![license CC BY-NC-SA](images/license.png)
