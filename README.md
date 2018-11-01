# Onderzoeksvraag
Na de opkomst van Smartphones zijn er meer e-boeken uitgekomen dan fysieke boeken

Onderzoeks properties
* Jaartal(publication)
* E-boek of niet
* Fysieke boeken uigebracht(Publication year)

Nodige methods
* Optellen van fysieke boeken van elke jaar na opkomst van Smartphones
* Optellen van E-boeken elke jaar na de opkomst van Smartphones
* Vergelijkingen maken tussen de resultaten van de methods hierboven


## Day 1: Dinsdag 29 oktober 2018


## Day 2: Dinsdag 30 oktober 2018
**Ontdekkingen**
* De database werkt in lagen in lagen dus als je bij een titel wilt komen moet je naar titles > title gaan en vervolgens
nog $t om de daadwerkelijke titel te vinden.
* Door middel van facet etc. kan ik voordat er uberhaupt gezocht word al gaan filteren door de database.


## Day 3: Woensdag 31 oktober 2018
**Ontdekkingen**
* Undefined error catchen
* Sommige resultaten hebben bepaalde categoriën niet

```js
  title: book.titles.title.$t,
  taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
  jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
  author: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t,
  format: (typeof book.formats === "undefined" || typeof book.formats.format === "undefined") ? "Formaat onbekend" : book.formats.format.$t
```

Dankzij Joost kon ik de undefined error catchen door middel van if statement. Want bij een undefined categorie kregen we steeds
een error waardoor het helemaal niet meer werkte. Het probleem was dat sommige resultaten bepaalde categoriën niet hadden waardoor het
een error gaf en daardoor werkte alles niet meer.

## Day 4: Donderdag 1 november 2018
Vandaag heb ik de functions aangemaakt om bepaalde resultaten te krijgen op basis van bepaalde conditie's
