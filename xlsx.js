const xlsx = require('xlsx-color')
const fs = require('fs')


let workbook = xlsx.readFile("Activities Assessment- Shashwat's copy.xlsx", {cellStyles:true})
fs.writeFileSync('./src/data.json', JSON.stringify(workbook) , 'utf-8')
