const fs = require('fs')

const filePath = 'textForRead.txt'
let totalWords = 0

const readStream = fs.createReadStream(filePath, { encoding: 'latin1' })

readStream.on('data', (chunk) => {
    const chunkString = chunk.toString('utf8')
    const cleanChunk = stripAnsi(chunkString)
    const lines = cleanChunk.split('\n')
    
    lines.forEach((line) => {
        console.log(line)
        totalWords += countWords(line)
    })
})

readStream.on('end', () => {
    console.log(`Total words: ${totalWords}`)
})

function countWords(line) {
    const wordRegex = /\b\w+\b/g
    return (line.match(wordRegex) || []).length
}

function stripAnsi(text) {
    const ansiRegex = /\x1B\[[0-?]*[ -/]*[@-~]/g
    return text.replace(ansiRegex, '')
}