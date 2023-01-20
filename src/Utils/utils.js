import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import exportFromJSON from 'export-from-json'  

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

function convertFeaturesToRawForm(dataObject, headings, queryInBinary) {
    let data = JSON.parse(JSON.stringify(dataObject))
    for (let key in data) {
        data[key] = filterObject(data[key], queryInBinary)
    }
    headings = filterArray(headings, queryInBinary)
    let newData = []
    for (let capability in data) {
        let first=true;
        for (let feature in data[capability]) {
            let newRow = {}
            if (first) {
                newRow["Capability"] = capability;
                first=!first
            }
            else newRow["Capability"] = "";
            newRow["Features"] = feature
            for (let i in data[capability][feature]) {
                newRow[headings[i]] = data[capability][feature][i]
            }
            newData.push(newRow)
        }
    }
    console.log(newData)
    return newData
}

function convertActivitiesToRawForm(dataObject, headings, queryInBinary) {
    let data = JSON.parse(JSON.stringify(dataObject))
    for (let key in data) {
        data[key] = filterArray(data[key], "11"+queryInBinary)
    }
    headings = filterArray(headings, "11"+queryInBinary)
    headings.unshift("S.No", "Activities")
    let newData = []

    for (let i in data) {
        let newRow= {};
        for (let j in data[i]) {
            newRow[headings[j]] = data[i][j]
        }
        newData.push(newRow)
        newRow = {}
    }
    return newData;
}

export function downloadFeaturesCSV(dataObject, headings, queryInBinary) {
    let newData = convertFeaturesToRawForm(dataObject, headings, queryInBinary)
    const fileName = 'features'  
    const exportType = 'csv'
    exportFromJSON({data: newData, fileName, exportType}) 
}

export function downloadActivitiesCSV(dataObject, headings, queryInBinary) {
    let newData = convertActivitiesToRawForm(dataObject, headings, queryInBinary)
    const fileName = 'activities'  
    const exportType = 'csv'
    exportFromJSON({data: newData, fileName, exportType}) 
}

export function downloadCapabilitiesCSV(dataObject, headings, queryInBinary) {
    let newData = convertFeaturesToRawForm(dataObject, headings, queryInBinary)
    const fileName = 'capabilities'  
    const exportType = 'csv'
    exportFromJSON({data: newData, fileName, exportType}) 
}