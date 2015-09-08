# select

Le composant select a besoin par défaut d'une liste de valeur de la forme 
```javascript
[{code: 1, label: 'Code 1'}, {code: 2, label: 'Code 2'}, {code: 3, label: 'Code 3'}]
```
On peut l'appeller au sein d'un formulaire:
```javascript
this.selectFor('property', 'refName')
```
Il est possible de changer les valeurs de lecture des valeurs de code et label via les propriétés suivantes:
`labelKey` et `valueKey`.
Exemple:
```javascript
this.selectFor('property', 'refName', {labelKey: 'MyLabelkey', valueKey: 'MyValueKey')
```
