# MonProjet1_RE

Application mobile React Native de simulation de paiement et de gestion de billets d'accès à des événements.

## Fonctionnalités principales
- Sélection d'un événement parmi une liste variée (concerts, conférences, festivals, etc.)
- Saisie du montant à payer
- Choix du mode de paiement :
  - Orange Money
  - MTN Mobile Money
  - Stripe
  - Carte Bancaire
- Formulaire dynamique selon le mode de paiement (numéro mobile, email, numéro de carte)
- Validation des champs et navigation fluide
- Confirmation du paiement avec message personnalisé
- Génération d'un billet de réservation avec :
  - Nom de l'événement
  - Montant
  - Cota (nombre de places)
  - Numéro de réservation unique
  - Informations selon le mode de paiement
  - Informations supplémentaires
- Option de téléchargement du billet (simulation)
- Retour à la page de paiement après téléchargement

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/YNasaire/MonProjet1_RE.git
   cd MonProjet1_RE
   ```
2. Installer les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Lancer l'application sur un émulateur ou un appareil :
   ```bash
   npx react-native run-android
   # ou
   npx react-native run-ios
   ```

## Structure du projet
- `App.js` : Point d'entrée de l'application
- `screens/PaiementScreen.js` : Formulaire de paiement
- `screens/ConfirmationScreen.js` : Confirmation et billet
- `assets/` : Icônes et images

## Dépendances principales
- react-native
- @react-navigation/native
- @react-navigation/native-stack
- @react-native-picker/picker

## Auteur
Nassaramadji Nasairé

## Licence
MIT
