# Functional Programming
Tijdens dit vak gaan we een datavisualisatie maken van de data van de oba api.

**Onderzoeksvragen**

* Na de opkomst van de Smartphones zijn er meer E-boeken bijgekomen dan fysieke boeken
  * In welke jaar was de opkomst van Smarthphones
  * Hoeveel boeken zijn er elke jaar bijgekomen
  * Hoeveel EBoeken zijn er elke jaar bijgekomen
  * Wat is het verschil tussen de bijkomen boeken vs de EBoeken

* Eboeken zijn de afgelopen jaren vaker geleent tov fysieke boeken
  * Aantal uitgeleende boeken in de afgelopen jaren
  * Aantal geleende eboeken in de afgelopen jaren

* Nieuwe schrijvers na 2010 hebben vaker letter a in hun naam
  * Hoeveel schrijvers zijn er na 2010 bijgekomen
  * Hoeveel schrijers hebben de letter a in hun naam

* Fysieke afmetingen van de kaft van boeken zijn steeds kleiner vanaf 2010
  * Fysieke afmetingen van kaft in 2010
  * Fysieke afmetingen van kaft in 2011 t/m 2018

* CD varianten van boeken zijn sinds 2013 tot heden geleidelijk afgenomen
  * CD varianten in 2013 t/m 2018
  * Afgenomen varianten per jaar vanaf 2013

**Uiteindelijke Onderzoeksvraag:**

De variatie in formaten(niet de afmetingen, maar fysieke formaat zoals cd, dvd etc) zijn de afgelopen jaren geleidelijk afgenonomen.

**Deelvragen**
* Hoeveel type formaten zijn er?
* Hoeveel formaten zijn er uitgekomen per jaar?

**Onderzoeks properties**
* Jaartal(publication)
* Verschillende types(cd, boek, etc)
* De types in de onderverdeeld in de verschillende jaren

**Nodige methods(welke functions moet ik schrijven?)**
* Optellen van fysieke boeken van elke jaar na opkomst van Smartphones
* Optellen van de verschillende formaten die de afgelopen 10 jaar zijn uitgekomen
* De formaten optellen per jaar.
* Jaren sorteren
* De jaren clusteren (ervoor zorgen dat de jaren uniniek worden)

# Data van de oba
Hieronder zie je de oba api structuur van title en author van een boek. Maar het structuur is min of meer overal hetzelfde.
```
{ titles:
     { title:
        { translation: 'Titel',
          'search-method': 'title',
          'search-term':
           "'Het geweten der natie' : de voormalige illegaliteit in het bevrijde
 Zuiden, september 1944-mei 1945 / door Henk Termeer",
          'search-type': 'fuzzy',
          '$t':
           "'Het geweten der natie' : de voormalige illegaliteit in het bevrijde
 Zuiden, september 1944-mei 1945 / door Henk Termeer" },
       'short-title':
        { translation: 'Korte titel',
          '$t':
           "'Het geweten der natie' : de voormalige illegaliteit in het bevrijde
 Zuiden, september 1944-mei 1945" } },
    authors:
     { 'main-author':
        { 'search-method': 'author',
          'search-term': 'H.J.C. Termeer',
          'search-type': 'searcher',
          translation: 'Auteur (hoofd)',
          firstname: 'H.J.C.',
          lastname: 'Termeer',
          creatortype: 'person',
          main: 'true',
          '$t': 'Termeer, H.J.C.' } }
```
**Structuur:** Hierboven is een kleine stukje van de oba api beschreven. De code hierboven bestaat alleen maar uit de autor en de titel van een bepaalde boek, maar laat wel het algemene strucuur zien van de api. Elk categorie van een boek heeft meerdere lagen. Om bijvoorbeeld bij de titel te komen van een boek, moet je eerst naar titles > title > $t. Dus het de title van een boek kan je pas vinden in de $t property van het object.

# Het Proces
In dit hoofdstuk kan je het proces zien van het project. Hierin worden vooral de technische vooruitgang beschreven. Wat ik geleerd heb staat dan per dag beschreven.

### Day 1: Dinsdag 29 oktober 2018
In dag 1 heb ik de documentatie van de aquabrowser gelezen. Naast dat heb ik niet veel kunnen bereiken behalve de api draained kunnen krijgen op mijn terminial.
**Ontdekkingen**
* node index.js om de script te runnen via node

### Day 2: Dinsdag 30 oktober 2018
**Ontdekkingen**
* De database werkt in lagen in lagen dus als je bij een titel wilt komen moet je naar titles > title gaan en vervolgens
nog $t om de daadwerkelijke titel te vinden.
* Door middel van facet etc. kan ik voordat er uberhaupt gezocht word al gaan filteren door de database.


### Day 3: Woensdag 31 oktober 2018
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

# Honerable Mentions
**Wouter:**
Wouter heeft mij geholpen met vele functie's schrijven. Zonder hem zou ik nog dagenlang vastzitten met hetzelfde probleem. Hij heeft de function jaartalFormatObject geschreven voor mij en de module geschreven waardoor ik meerdere items kon laten zien dan 20 in de terminal. Naast dat heeft hij ook sommige array methods in detail uitgelegt hoe ze werken. Wat een ware held.<br>
**Joost:** Danzkij Joost kon ik de undefined errors catchen met een functie die hij heeft geschreven. Naast dat heeft hij mij ook haarfijn uitgelegt hoe de database werkte en dat er meerdere lagen waren. Hierdoor gaf hij mij meer hoop om door te gaan met coderen.
