<div align="center">
    <h1>Bourse de Boissons</h1>
    <h2>Développé par Marc Bresson</h2>
    <p align="center">
        <a href="https://linkedin.com/in/marc--bresson"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555"/></a>
    </p>
</div>

Projet étudiant d'un dashboard local pour émuler les comportements de la bourse sur le prix des boissons.

![interface publique](images/interface_dashboard.png)

![interface administrateur](images/interface_admin.png)

## Fonctionnement

Ce projet utilise deux fenêtres (ou onglets) d'un même navigateur. L'une affiche `admin.html`, et l'autre affiche `dashboard.html`.

## Initialisation

Le prix et le nom des boissons est à configurer dans `boissons.js`. Pour ajouter (supprimer) une boisson, il suffit d'ajouter (de supprimer) une ligne au tableau JSON.

Vous devez rentrer la date et heure de la soirée dans le fichier `parametres_soirees.js`. Une fois fait, vous pouvez ouvrir le panneau admin, puis le dashboard.

## Pendant la soirée

Vous pouvez regler l'intervalle de temps entre chaque calcul à tout moments dans la soirée. Ouvrez les outils de développement de la page admin.html (F12 ou bien clic droit sur la page > inspecter > console) et tapez : `intervalle_temps = ...` avec une valeur en seconde.

De même, il est possible de changer la " puissance " des variations en tapant au même endroit `multiplicateur_variation = coef_multiplicateur (=5 par défaut)`.

/!\ n'actualisez surtout pas la page admin.html, car vos données seront ré-initialisées.

# License

This license lets you remix, adapt, and build upon this work non-commercially, as long as you credit me and license your new creations under the identical terms.

![license CC BY-NC-SA](images/license.png)
