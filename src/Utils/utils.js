export function filterArray(data, queryInBinary) {
    return data.filter((_val, i) => queryInBinary[i]==='1')
}

export function filterObject(data, queryInBinary) {
    for (const key in data) {
        data[key] = filterArray(data[key], queryInBinary)
    }
    return data;
}