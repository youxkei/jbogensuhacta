#!/usr/bin/env node
const fs = require('fs')
const parser = require('./ilmentufa/camxes-exp.js')
const readline = require('readline')

const inputStream = readline.createInterface(fs.createReadStream('./preprocessed.txt'), {})
const outputStream = fs.createWriteStream('./parsed.txt')
const invalidJufraStream = fs.createWriteStream('./invalid-jufra.txt')

let count = 0;

inputStream.on('line', line => {
  const [year, jufra] = line.split('\t')

  try {
    outputStream.write(`${year}\t${JSON.stringify(parser.parse(jufra))}\n`)
  } catch (e) {
    invalidJufraStream.write(`${jufra}\n`);
  }

  ++count;

  if (count % 1000 === 0) {
    console.log(count);
  }
})
