export function formatIDR(amount) {
    const idFormatter = new Intl.NumberFormat('id-ID')
    return idFormatter.format(amount)
}