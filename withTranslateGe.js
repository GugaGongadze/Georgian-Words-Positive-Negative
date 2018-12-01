const fs = require('fs')
const axios = require('axios')

const positiveWords = fs.readFileSync('positive-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)
const negativeWords = fs.readFileSync('negative-words.txt', 'utf8').split('\n').filter(word => !word.includes(';') && word.length > 0)

const apiUrl = `http://translate.ge/api/`
const notGeorgian = /[^\u10A0-\u10FF ]/gi

async function translateAndAppend(engWord, sentiment) {
  try {
    const { data: { rows } } = await axios(`${apiUrl}${engWord}`)
    rows.forEach(el => {
      if (el.key === engWord) {
        const translatedText = el.value.Text.split(',')
        const cleanedText = translatedText.map(word => word.replace(notGeorgian, '').trim())
          
        cleanedText
          .forEach(word => fs.appendFileSync(
            `${sentiment === 'pos' ? 'პოზიტიური-სიტყვები-translateGE.txt' : 'ნეგატიური-სიტყვები-translateGE.txt'}`,
            `${word}\n`,
            'UTF-8',
            { 'flags': 'a' }
          ))
        
      }
    })
  
  } catch (error) {
    console.log(error)
  }
}

positiveWords.forEach(word => translateAndAppend(word, 'pos'))
negativeWords.forEach(word => translateAndAppend(word, 'neg'))

const uniq = a => [...new Set(a)]

const positiveWordsGEO = fs.readFileSync('პოზიტიური-სიტყვები-translateGE.txt', 'utf8').split(/\s+/g).filter(word => word.length > 0)
const negativeWordsGEO = fs.readFileSync('ნეგატიური-სიტყვები-translateGE.txt', 'utf8').split(/\s+/g).filter(word => word.length > 0)

const uniqueAndSortedPositiveWordsGEO = uniq(positiveWordsGEO).sort()
const uniqueAndSortedNegativeWordsGEO = uniq(negativeWordsGEO).sort()

uniqueAndSortedPositiveWordsGEO.forEach(word => fs.appendFileSync(
  'პოზიტიური.txt',
  `${word}\n`,
  'UTF-8',
  { 'flags': 'a' }
))

uniqueAndSortedNegativeWordsGEO.forEach(word => fs.appendFileSync(
  'ნეგატიური.txt',
  `${word}\n`,
  'UTF-8',
  { 'flags': 'a' }
))
