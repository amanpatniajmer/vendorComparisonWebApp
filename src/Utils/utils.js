import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { utils, writeFile } from 'xlsx-color';

export function filterArray(data, queryInBinary) {
    return data.filter((_val, i) => queryInBinary[i]==='1')
}

export function filterObject(dataObject, queryInBinary) {
    let data = JSON.parse(JSON.stringify(dataObject))
    for (const key in data) {
        data[key] = filterArray(data[key], queryInBinary)
    }
    return data;
}

export function downloadImagePDF(title='table', tableID='table'){
    let element = document.getElementById(tableID);
    html2canvas(element)
        .then((canvas)=>{
            var imgData = canvas.toDataURL();
            const imgWidth = 190;
            const pageHeight = 290;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            const doc = new jsPDF('pt', 'mm');
            let position = 0;
            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight + 25);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25);
                heightLeft -= pageHeight;
            }
            doc.save(`${title}.pdf`);
    })
}

export function downloadTablePDF(tableDivID='tableDiv', title='Table') {
    var table = document.getElementById(tableDivID).innerHTML;

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    var win = window.open('/', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write(`<title>${title}</title>`);
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(table);
    win.document.write('</body></html>');

    win.document.close();
    win.print();
    win.close()
}

function filterData(dataObject={}, headings=[]) {
    let data = JSON.parse(JSON.stringify(dataObject))
    for (let i in data) {
        for (let key in data[i]) {
            if(!headings.includes(key)) 
                delete data[i][key]
        }
    }
    return data;
}

export function filterAndDownloadExcel(rawData, allHeadings, queryInBinary, fileName) {
    let headings = filterArray(allHeadings, queryInBinary);
    let newData = filterData(rawData, headings);
    downloadExcel(newData, fileName)
}

export function downloadAllExcel(dataObjectsArray=[], headings=[]) {
    for (let i in dataObjectsArray) {
        dataObjectsArray[i] = filterData(dataObjectsArray[i], headings)
    }
    let sheetNames = ["Capabilities", "Features", "Activities"]
    downloadExcel(dataObjectsArray, 'data', sheetNames)
}

export function downloadExcel(data, fileName, sheetNames=[fileName]) {
    //console.log(data)
    const wb = utils.book_new();
    if (sheetNames.length > 1){
        for (let i in data) {
            const ws = utils.json_to_sheet(data[i])
            utils.book_append_sheet(wb, ws, sheetNames[i])
        }
    }
    else {
        const ws = utils.json_to_sheet(data);
        //const ws = utils.table_to_sheet(document.getElementById('table'))
        //const ws = rawData
        //colorWorksheet(ws, data, fileName);
        //console.log(ws)
        utils.book_append_sheet(wb, ws, sheetNames[0]);
    }
    writeFile(wb, `${fileName}.xlsx`);
}

function colorWorksheet(ws, data, fileName){
    if (fileName === "Activities Assessment") {
        for (let i in data){
            for (let x=65; x<78; x++) {
                let col = String.fromCharCode(x)
                let row = Number.parseInt(i) + 2
                let cell = col + row
                if(ws[cell] === undefined) ws[cell] = {'t':'s','v':''}
                if(data[i]['S.No'] % 1 === 0) addBackgrounColor(ws[cell], "ECDBF4")
                if (col !=="A" || col !== "B") {
                    if (ws[cell]['v'] === "Y") addFontColor(ws[cell], "00FF00")
                    if (ws[cell]['v'] === "N") addFontColor(ws[cell], "FF0000")
                }
            }
        }
    }
    else if (fileName === "Features Assessment") {
        for (let i in data) {
            for (let x=65; x<78; x++) {
                let col = String.fromCharCode(x)
                let row = Number.parseInt(i) + 2
                let cell = col + row
                if(ws[cell] === undefined) ws[cell] = {'t':'s','v':''}
                if (col !=="A" || col !== "B") {
                    if (ws[cell]['v'] === "0") addBackgrounColor(ws[cell], "F0F4DC")
                    if (ws[cell]['v'] === "1") addBackgrounColor(ws[cell], "E8ECEC")
                    if (ws[cell]['v'] === "2") addBackgrounColor(ws[cell], "DFECF4")
                    if (ws[cell]['v'] === "3") addBackgrounColor(ws[cell], "F0DCE4")
                    if (ws[cell]['v'] === "4") addBackgrounColor(ws[cell], "FFCCCC")
                }
            }
        }
    }
}

function addBackgrounColor(cell, color){
    if (cell['s'] === undefined) cell['s'] = {}
    cell['s']['fill'] = {fgColor: { rgb: color }}
}

function addFontColor(cell, color){
    if (cell['s'] === undefined) cell['s'] = {}
    cell['s']['font'] = {"color": { "rgb": color }}
}


export function getAllHeadings(data) {
    let headings = new Set();
    for (let i in data) {
        for (let key in data[i]) {
            headings.add(key)
        }
    }
    return Array.from(headings);
}

export function equalizeQueryString(queryInBinary, length) {
    let newQuery = queryInBinary;
    if (length - queryInBinary.length > 0) {
        let trail = '0'.repeat(length - queryInBinary.length);
        newQuery += trail;
    }
    else {
        newQuery = newQuery.substring(0, length); 
    }
    return newQuery;
}

export function downloadCanvasAsImage(query, filename='canvas'){
    var link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = document.querySelector(query).toDataURL()
    link.click();
}