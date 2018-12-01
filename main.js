const fs = require('fs')

const positiveWords = fs.readFileSync('positive-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)
const negativeWords = fs.readFileSync('negative-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)

const apiUrl = `https://glosbe.com/gapi/translate?from=en&dest=ka&format=json&phrase=`
