#!/usr/bin/env node
const fs = require('fs')
const readline = require('readline')

const inputStream = readline.createInterface(fs.createReadStream('./parsed.txt'), {})
const outputStream = fs.createWriteStream('./analysed.txt')

const analyse = (accumulated, parseTree) => {
  if (Array.isArray(parseTree)) {
    const ruleName = parseTree[0];

    switch (ruleName) {
      case 'UI_clause':
        accumulated = analyseOi(accumulated, parseTree)
        break
      default:
        for (const subtree of parseTree) {
          accumulated = analyse(accumulated, subtree)
        }
    }
  } else {
    switch (parseTree) {
      case 'le':
      case 'lo':
        accumulated.set(parseTree, (accumulated.get(parseTree) || 0) + 1)
        break
      default:
        break
    }
  }

  return accumulated
}

const analyseOi = (accumulated, parseTree) => {
  const [_, pre, post] = parseTree

  accumulated.set('UI', (accumulated.get('UI') || 0) + 1)

  if (pre[0][1] === 'oi') {
    try {
      if (post[1][0][1][0][1][1][0][1] !== 'nai') {
        accumulated.set('oi', (accumulated.get('oi') || 0) + 1)
      }
    } catch (e) {
      accumulated.set('oi', (accumulated.get('oi') || 0) + 1)
    }
  }

  return analyse(accumulated, post)
}

let accumulatedPerYear = new Map()

inputStream.on('line', line => {
  const [year, parseTreeJson] = line.split('\t')
  const parseTree = JSON.parse(parseTreeJson)

  accumulatedPerYear.set(year, analyse(accumulatedPerYear.get(year) || new Map(), parseTree))
})

inputStream.on('close', () => {
  for (const [year, accumulated] of accumulatedPerYear) {
    const loPerLe = accumulated.get('lo') / accumulated.get('le')
    const oiPerUI = accumulated.get('oi') / accumulated.get('UI')

    outputStream.write(`${year}\t${loPerLe}\t${oiPerUI}\n`)
  }
})
