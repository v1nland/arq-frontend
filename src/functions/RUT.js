// Cleans a RUT string
export function Clean (rut) {
    return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}

// Formats RUT with . and -
export function FormatRUT (rut) {
    rut = Clean(rut)
    var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)

    for (var i = 4; i < rut.length; i += 3)
        result = rut.slice(-3 - i, -i) + '.' + result

    return result
}
