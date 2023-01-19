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