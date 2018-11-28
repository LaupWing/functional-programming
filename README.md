# Functional Programming
Tijdens dit vak gaan we een datavisualisatie maken van de data van de oba api. De datavisualisatie moet gemaakt worden door de D3 package of via Observable.


## Inhoudsopgave
0. [Herkansing](#herkansing)
1. [Onderzoeksvragen](#onderzoeksvragen)
2. [Huidige Onderzoeksvraag](#huidig)
3. [Data van Oba](#dataOba)
4. [Schetsen](#schetsen)
5. [Proces](#proces)
6. [Resultaat/conclusie](#resultaat)
7. [Honerable Mentions](#honerable)
8. [Bronnelijst](#bronnenlijst)


<a name="herkansing"></a>
## Herkansing

### Feedback
#### Spaghetti code

Mijn index.js heb ik vrijwel niks aan gedaan. Ik ben bang dat als ik het ga herschrijven dat niks het meer doet. Ik heb wel pogingen gewaagd om het wat netter te maken maar ik heb de code in de index.js file vrijwel onveranderd gelaten.

#### Niks of nauwelijks iets veranderd aan Observable chart

Ik heb nu mijn eigen chart gemaakt vanaf een scratch ipv een voorbeeld gepakt in Observable. Link van mijn chart kan je hierboven vinden. In mijn eigen chart heb ik de data kunnen bewerken met d3, een responsive chart, animatie en verschillende representatie's van de data.

<br>

#### Uitleg Files

**De files**

:page_facing_up:**index.js:** Hier word de data opgehaald van de oba api en gefilterd vervolgens opgeslagen in log.json

:page_facing_up:**server.js:** Javascript om de website op een localhost te laten draaien, zodat ik fs kan gebruiken

:file_folder: **SiteComponents:** Hier kan je alle js, html, css en json files vinden. Vooral de frontend files

:page_facing_up:**log.json:** Hier worden de resultaen in opgeslagen uit de data.js bestand

:page_facing_up:**index.html:** Webpagina zelf

:page_facing_up:**style.css:** Css voor alle elementen op de webpagina

:page_facing_up:**script.js:** Javascript vooral om chart aan te maken op d3. Hierin bevat ook enkele events.

:page_facing_up:**events.js:** Hier worden alle javascript event functions opgeslagen

<br>

#### Uitleg code

<br>

**_Data bewerken met d3._**
```js
// events.js
createGraph(sortFunction(data), d3.curveLinear, true)

function sortFunction(data){
return data.sort((x,y)=> d3.descending(x.variatie, y.variatie))
}
```
Code hierboven bevind zich in de events.js file. In de events.js file word er geluisterd naar een klik event en zodra er klik event gestart word dan word de createGraph function gestart(functie bevind zich in de script.js file). Als parameter word de function sortFunction met daarin data gegeven, waardoor de gesorteerde versie van de data word gestuurd naar de createGraph function.

<br>

**_Responsive en resize._**
```js
// script.js
let width = window.innerWidth*0.65;
let height = window.innerHeight*0.42;

// events.js
window.addEventListener("resize", ()=>{
  setTimeout(()=>{
    location.reload();
  },1000)
})
}
```
In mijn script.js file word er alleen maar window.innerWidth en window.innerHeight gebruikt om de elementen correct te plaatsen op de webpagina. Dit zorgt ervoor dat de chart met de schermgrootte meegaat.

In mijn event.js heb ik een event listener die luistert naar een resize van de window. Als dat zo is word er 1 seconden de pagina gereload. Hierdoor veranderd de chart grootte en past het precies in het scherm zelfs als je het resized.
NOTE: Ik weet dat dit een goedkope oplossing is om de chart mee te laten gaan als je de browser resize, maar tijd is schaars!!!!

<br>

**_animatie en verschillende representatie's van de data._**

In de webapp kan je kiezen tussen veschillende stylen line charts. Dit word gedaan door middel van de checkboxjes boven de chart.
```js
// script.js
createGraph(data, d3.curveLinear, true)

d3.selectAll(".lines").on("change", drawGraph)
function drawGraph(){
  if(d3.select(this).property("checked")){
    createGraph(data, checkValueAdd(this), false)
  }else{
    d3.select(`.${this.value}`).remove()
  }
}
function checkValueAdd(d){
  if(d.value == "step"){
    return d3.curveStep
  }else if(d.value == "linear"){
    return d3.curveLinear
  }else if(d.value == "cardinal"){
    return d3.curveCardinal
  }
}

```
 Bij het aanroepen van de createGraph function dien je 3 parameters mee tegeven. 1 is de data, 2e is de style van de line en derde is of ook de axis en circles en labels bij moeten door true of false mee te geven.

 Bij het starten van een change event word de drawGraph function gestart. In de draw graph function word er eerst gekeken of de checkbox gechecked staat. zo ja dan word de createGraph function gestart met als parameter data, en de function checkValueAdd. In deze function word er gekeken wat de value is van de checkbox en geeft aan de hand van de value het juiste lijn stijl mee als parameter voor de createGraph. Als checkbox niet gechecked staat word de class met de value verwijderd. Class heeft namelijke exact hetzelfde waarde als value van de checkbox daarom is dit mogelijk.

#### Onleesbare readme

Readme heb ik wat ruimtes gecreeërd voor overzichtelijkeheid. Verschillende headings toegevoegd.




<br>

<a name="onderzoeksvragen"></a>
## Onderzoeksvragen

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

<br>


<a name="huidig"></a>
## Uiteindelijke Onderzoeksvraag:

Is de variatie in formaten(niet de afmetingen, maar fysieke formaat zoals cd, dvd etc) de afgelopen jaren afgenomen?

**Hypothese**
De variatie is langzamerhand steeds minder geworden, omdat cd formaten tegenwoordig niet meer gebruikt worden en vervangen zijn door de eboeken en fysieke boeken.


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

<br>


<a name="dataOba"></a>
## Data van de oba
Hieronder zie je de oba api structuur van title en author van een boek. Maar het structuur is min of meer overal hetzelfde.
```
{ titles:
     { title:
        { translation: 'Titel',
          'search-method': 'title',
          'search-term':
           "'Het geweten der natie' : de voormalige illegaliteit in het bevrijde Zuiden, september 1944-mei 1945 / door Henk Termeer",
          'search-type': 'fuzzy',
          '$t':
           "Het geweten der natie : de voormalige illegaliteit in het bevrijde Zuiden, september 1944-mei 1945 / door Henk Termeer" },
       'short-title':
        { translation: 'Korte titel',
          '$t':
           "'Het geweten der natie' : de voormalige illegaliteit in het bevrijde Zuiden, september 1944-mei 1945" } },
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


<a name="schetsen"></a>
## Schetsen
Omdat mijn onderzoeksvraag vooral bestaat twee factoren namelijk  jaren en variatie in een bepaalde jaar. Daarom heb ik schetsen gemaakt van een simpele bar chart en lijn diagram. Dit zijn simpele diagrammen om mee te beginnen in D3. Ik begin liever zo simpel mogelijk om de basis te begrijpen en als ik dat begrijp ga ik wat moeilijker diagrammen proberen te maken.

<img src="Images/BarDiagram.jpg" alt="drawing" width="250" style="transform: rotate(270deg)"/>
<img src="Images/LineDiagram.jpg" alt="drawing" width="250" style="transform: rotate(270deg)"/>


<a name="proces"></a>
## Het Proces
In dit hoofdstuk kan je het proces zien van het project. In "Mijn proces verhaal" kan je de grote lijnen vinden van het proces in één groot verhaal. In "Dagelijkse proces" kan je het proces vinden per dag beschreven en in meer detail en meer technische details.

### Mijn proces verhaal
Net zoals alle andere technische vakken dat ik op de opleiding CMD heb gehad was dat er in het begin heel veel frustratie was. Ik begreep praktische niks, maar door middel van veel vragen aan medestudenten werd ik steeds wijzer tot het punt dat ik andere mensen kon helpen. Persoonlijk vind ik het jammer dat ik in het begin vaak naar mensen moet afstappen om voor hulp te vragen. Daarom vraag ik actief naar mensen of ze mij hulp nodig hebben, omdat ik weet hoe naar het kan zijn om niet verder te kunnen gaan vanwege gebrek aan kennis. Na het opdoen van veel kennis had ik meer vertrouwen om het zelf te doen en begon ik zelf functie's te schrijven en zelf ook errors op te lossen. Mijn waardevolste ontdekking is dat ik veel moet console.loggen om erachter te komen waar mijn code foutgaat. Uiteindelijk is het mij na veel errors oplossen en syntaxen uitproberen is het mij gelukt om schone data te krijgen met een object met daarin de property's jaartal en variatie(de variatie in presentatie van content zoals boek, cd etc)

**Waar had ik het meest moeite mee**<br>
Het lastigste vond ik wel dat de database van de oba uit verschillende lagen bestaat. Het was heel lastig voor mij om te ontdekken hoe ik door de verschillende lagen kan gaan om de echte uiteindelijke data te krijgen. Sommige data hadden zelfs nog een array in verwerkt.

**Wat vond ik het leukste om te doen**<br>
De eerste 3 a 4 dagen vond ik niks leuk. Dit kwam omdat ik er qua kennis nog te weinig wist om echt te gaan beginnen. Na wat moed op te sparen en aan mensen vragen hoe sommige dingen werken begreep ik er meer van en begon ik langzamerhand coderen leuker te vinden. Wat specifieker vond ik het toepassen van de verschillende array methods interessant. Het was voor mij een kunst om te weten welke array method ik moet gebruiken voor een bepaalde probleem. Door meer te lezen op MDN en het meteen toepassen van de array methods begreep ik er steeds meer van!. Het is echt fijn om nieuwe syntaxen te leren en vervolgens meteen toepassen en te zien dat het daadwerkelijk werkt. Natuurlijk werkt het niet altijd, maar dan is het oplossen ook weer leuk omdat je daardoor ook weer leert waarom het niet werkt.

**Maar het leukste:** Maar wat ik het allerleukst vind om te doen is om andere mensen te helpen. Ik weet namelijk hoe frustrerend het kan zijn om iets niet te begrijpen en dat je niet verder komt puur omdat je iets niet begrijp. Vooral op technische gebieden is het niet begrijpen van iets een motivatie killer. Wanneer ik mensen ga helpen begrijpen ze het meer en krijgen ze ook meer hoop en dat vind ik wel fijn. Nogmaals ik ben ook iemand die dit zovaak had en heb meegemaakt. Naast dat durven mensen ook niet vaak te vragen aan andere mensen en het is gewoon jammer dat ze daardoor niet verder kunnen komen. **_Studenten moeten elkaars rug hebben en elkaar helpen met coderen en motiveren!!_**




### Dagelijkse proces
Hieronder kan je het dagelijkse proces vinden. Per dag beschrijf ik wat ik geleerd heb en waar ik tegen aanliep er word ook een opsomming gemaakt van de dingen dat ik(vaak samen met ander studenten) heb ondekt

#### Day 1: Dinsdag 29 oktober 2018
In dag 1 heb ik de documentatie van de aquabrowser gelezen. Naast dat heb ik niet veel kunnen bereiken behalve de api draained kunnen krijgen op mijn terminial.

**Ontdekkingen**
* node index.js om de script te runnen via node

#### Day 2: Dinsdag 30 oktober 2018
**Ontdekkingen**
* De database werkt in lagen in lagen dus als je bij een titel wilt komen moet je naar titles > title gaan en vervolgens
nog $t om de daadwerkelijke titel te vinden.
* Door middel van facet etc. kan ik voordat er uberhaupt gezocht word al gaan filteren door de database.


#### Day 3: Woensdag 31 oktober 2018
Dankzij Joost kon ik de undefined error catchen door middel van if statement. Want bij een undefined categorie kregen we steeds
een error waardoor het helemaal niet meer werkte. Het probleem was dat sommige resultaten bepaalde categoriën niet hadden waardoor het
een error gaf en daardoor werkte alles niet meer.

```js
  title: book.titles.title.$t,
  taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
  jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
  author: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t,
  format: (typeof book.formats === "undefined" || typeof book.formats.format === "undefined") ? "Formaat onbekend" : book.formats.format.$t
```

**Ontdekkingen**
* Undefined error catchen
* Sommige resultaten hebben bepaalde categoriën niet
* In de property van een object kan je een if statement declareren door de nieuwe ternary declaratie
* Typeof is een methods om de type van een variabele te bekijken


#### Day 4: Donderdag 1 november 2018
Vandaag heb ik de functions aangemaakt om bepaalde resultaten te krijgen op basis van bepaalde conditie's.
```js
let fromYear = filterByYear(array);

function filterByYear(booklist) {
  const result = booklist.filter(function(book) {
    if (book.jaartal > 2008) {
      return book
    }
  })
  return result;
}
```
**Ontdekkingen**
* Een variabele kan een function bevatten
* Als er een function in de variable zit is hetgeen wat de function returned wat in de variable zich bevind. Als de function een array terugstuurd zit er in de variabele een array

#### Day 5: Vrijdag 2 november 2018
Tijdens het testen naar een andere zoekterm liet mijn terminal alweer een undefined errror zien. Na lang zoeken waar het probleem lag kwam ik erachter dat sommige formats van boeken meerder formats beschikken die in een array zitten. Maar tegen de tijd dat ik dit gevonden had was het al tijd om naar huis te gaan

**Ontdekkingen**
* Sommige categoriën hebbenn meerdere waardes die weer in een array zitten

#### Day 6: Maandag 5 november 2018
Na de ontdekking van afgelopen vrijdag probeerde ik op maandag 5 november dit probleem op te lossen. Dit heb ik gedaan door aan de object property format een function aan te koppelen die meerdere if statements heeft om de array te laten zien.
```js
function makeBookObject(book) {
  bookObject = {
    // Credits aan Joost
    title: (typeof book.titles === "undefined" || typeof book.titles.title === "undefined") ? 'Titel is onbekend' : book.titles.title.$t,
    taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
    jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
    author: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t,
    format: checkFormat(book)
  }
  array.push(bookObject)
}

function checkFormat(book) {
  if (book.formats) {
    if (book.formats.format.$t) {
      return book.formats.format.$t
    } else {
      let formats = [];
      book.formats.format.forEach(format => {
        formats.push(format.$t);
      });
      return formats;
    }
  } else {
    return "Formaat is onbekend"
  }
}
```
**Ontdekkingen**
* Het is mogelijk om een function aan een object property te hangen.
* In een if-stament kan je nog een if-statment zetten om te kijken naar de verschillende lagen.

#### Day 7 & Day 8: Dinsdag 6 november 2018, Woensdag 7 november
Deze dagen heb ik nauwelijks iets kunnen doen vanwege een griep. Ik heb wat functie's geschreven om ervoor te zorgen dat de data gefilterd word en voor de rest heb ik mijn readme ge update

**Ontdekkingen**
* Griep ondekt

#### Day 9: Donderdag 8 november
Laatste dag voor de beoordeling heb ik met veel stress mijn data zo opgeschoond dat het meteen bruikbaar was voor Observable. Vandaag was voor mij een hele warrige dag, omdat ik zoveel te doen had wou ik alles tegelijk doen. Ik heb vandaag beetje d3 kennis kunnen opdoen en uiteindelijk een schone dataset kunnen krijgen door gebruik van veel functie's. En vooral aan de readem gewerkt.

**Ontdekkingen**
* wat d3 kennis
* er staat in de criteria dat je data moet bewerken in D3... damn kwam ik net te laat achter, dan had ik minder tijd in gestoken om in mijn index.js data op te schone :sadface



<a name="resultaat"></a>
## Resultaat/Conclusie (Observable)
Observable Linkje = [Klik hieroooo](https://beta.observablehq.com/@laupwing/d3-bar-chart)<br>
In de chart in Observable kan je zien dat er in het begin veel variatie te vinden en dat steeds weer afneemt. Op het eind van de diagram kan je ook weer zien dat het juist weer toeneemt. Dit bewijst het tegendeel van mijn hypothese dat het geleidelijk afneemt. Maar dit is verreweg een echte conclusie, omdat dit het resultaat is van maar slechts 1000 boeken op de letter h gezocht. Om de onderzoeksvraag goed te kunnen beantwoorden dien ik meer resultaten te hebben en zonder te filteren op een zoekterm.

<a name="honerable"></a>
## Honerable Mentions
**Wouter:**
Wouter heeft mij geholpen met vele functie's schrijven. Zonder hem zou ik nog dagenlang vastzitten met hetzelfde probleem. Hij heeft de function jaartalFormatObject geschreven voor mij en de module geschreven waardoor ik meerdere items kon laten zien dan 20 in de terminal. Naast dat heeft hij ook sommige array methods in detail uitgelegt hoe ze werken. Wat een ware held.

```js
// Credits naar mijn man Wouter
// De obaMaanWrapperDing is ook van wouter
function jaartalFormatObject(booklist) {
  // Stopt array find in een item zodat je makkelijker bij het object kan komen
  let array = [];
  booklist.forEach(object => {
    let item = array.find(item => item.jaartal === object.jaartal);
    if (!item) {
      item = {
        jaartal: object.jaartal,
        format: []
      };
      array.push(item);
    }
    var merged = [].concat(object.format);
    item.format = item.format.concat(object.format);
  });

  return array
}
```

**Joost:** Danzkij Joost kon ik de undefined errors catchen met een functie die hij heeft geschreven. Naast dat heeft hij mij ook haarfijn uitgelegt hoe de database werkte en dat er meerdere lagen waren. Hierdoor gaf hij mij meer hoop om door te gaan met coderen.
```js
// Credits naar mijn man Joost
function makeBookObject(book) {
  bookObject = {
    // Credits aan Joost
    title: (typeof book.titles === "undefined" || typeof book.titles.title === "undefined") ? 'Titel is onbekend' : book.titles.title.$t,
    taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
    jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
    // jaartal: checkJaartal(book),
    author: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t,
    // format: (typeof book.formats === "undefined" || typeof book.formats.format === "undefined") ? "Formaat onbekend" : book.formats.format.$t
    format: checkFormat(book)
  }
  array.push(bookObject)
}
```

<a name="bronnenlijst"></a>
## Bronnenlijst
Array Methods Syntaxes = [Klik hieroooo](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array)<br>
D3 Tutorial = [Klik hieroooo](https://www.lynda.com/D3-js-tutorials)<br>
D3 Data modifen met nesting() =[Klik hieroooo](http://learnjsdata.com/group_data.html)<br>
Zijn er sowieso meer dan 3 maar ben te lui op dit moment om ze allemaal in te lijsten!
