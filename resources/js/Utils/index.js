export function formatIDR(amount) {
    const idFormatter = new Intl.NumberFormat('id-ID')
    return idFormatter.format(amount)
}

export function asset(path) {
    return `${window.location.protocol}/image/${path}`
}