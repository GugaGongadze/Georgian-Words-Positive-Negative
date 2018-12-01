// TODO

const fs = require('fs')
const fetch = require('node-fetch')

const positiveWords = fs.readFileSync('positive-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)
const negativeWords = fs.readFileSync('negative-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)
 
function translate(text) {
  const sourceLang = 'en';
  const targetLang = 'ka';
  
  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(text);
  
  fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}

translate(e)
