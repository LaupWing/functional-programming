const OBA = require('./modules/obaMaanWrapperDing');
const fs = require('fs');
require('dotenv').config()


const client = new OBA({
  public: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY
});



client.get('search', {
    q: 'h',
    // facet: 'type(book)',
    sort: 'title',
    refine: true,
    librarian: true,
    count: 1000,
    log: true
  })
  .then(results => {
    // Van de results die we krijgen na de search.
    results.forEach(function(book) {
      testArray.push(book)
      makeBookObject(book);
    })
  })
  .then(function() {
    // let formatArray = formats(array)
    // let objectMap = objectByMapping(array);
    let fromYear = filterByYear(array);
    let yearFormat = yearAndFormat(fromYear);
    let jaartalObject = jaartalFormatObject(yearFormat);
    let uniqueFormat = objectUniqueFormats(jaartalObject);
    let sorteerJaar  = uniqueFormat.sort(sorteerOpjaar);
    let aantalFormaat = aantalFormaten(sorteerJaar);
    // processLog(aantalFormaat)
    console.log(aantalFormaat)
    // console.log(testArray)

    fs.writeFile('log.json', JSON.stringify(aantalFormaat), 'utf8', function() {})
  })
  .catch(err => console.log(err))
let array = [];
let testArray = [];

// function processLog(booklist){
//   booklist.forEach(function(book){
//     fs.writeFile('log.json', JSON.stringify(book), 'utf8', function() {})
//   })
// }




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

// Dit returned alle titles van de boeken en stopt ze in een object met als
// property titel
function objectByMapping(booklist) {
  let mapBookObject = {
    title: booklist.map(function(book) {
      if (book.title) {
        return book.title
      }
    }),
    jaartal: booklist.map(function(book) {
      if (book.jaartal) {
        return book.jaartal
      }
    }),
    formaat: booklist.map(function(book) {
      if (book.format) {
        return book.format
      }
    })
  }
  return mapBookObject
}

// Credits naar mijn man Wouter
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

function checkTitle(book) {
  if (book.titles.title) {
    if (book.titles.title.$t) {
      return book.titles.title.$t
    } else {
      return book.titles.title[0, 1]
    }
  } else {
    return "Titel onbekend"
  }
}

function yearAndFormat(booklist) {
  let result = booklist.map(function(book) {
    return {
      jaartal: book.jaartal,
      format: book.format
    }
  })
  return result
}

function checkJaartal(book) {
  if (book.publication) {
    if (book.publication.year.$t) {
      return book.publication.year.$t
    } else {
      return book.publication.year[0]
    }
  } else {
    return "Publicatie onbekend"
  }
}

function checkFormat(book) {
  if (book.formats) {
    if (book.formats.format.$t) {
      return book.formats.format.$t
    } else {
      let formats = [];
      // return book.formats.format
      // for (var i = 0; i < book.formats.format.length; i++) {
      //   format += book.formats.format[i].$t +", "
      // }
      book.formats.format.forEach(format => {
        formats.push(format.$t);
      });
      return formats;
    }
  } else {
    return "Formaat is onbekend"
  }
}

function filterByYear(booklist) {
  const result = booklist.filter(function(book) {
    if (book.jaartal > 2008) {
      return book
    }
  })
  return result;
}

function countBooks(books) {
  console.log(books.length)
}

function formats(books) {
  let formatsArray = []
  books.forEach(function(book) {
    formatsArray.push(book.format)
  })
  return formatsArray;
}

function objectUniqueFormats(booklist){
  let array = booklist.map(function(book){
    return {
      jaartal: book.jaartal,
      bookformat: book.format.filter(onlyUnique)
      }
  })
 return array
}

function sorteerOpjaar(a, b){
  if (a.jaartal < b.jaartal)
    return -1;
  if (a.jaartal > b.jaartal)
    return 1;
  return 0;
}

function aantalFormaten(booklist){
  let array = booklist.map(function(book){
    return{
      jaartal: book.jaartal,
      variatie: book.bookformat.length
    }
  })
  return array
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
