import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { utils, writeFileXLSX } from 'xlsx';

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
        utils.book_append_sheet(wb, ws, sheetNames[0]);
    }
    writeFileXLSX(wb, `${fileName}.xlsx`);
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