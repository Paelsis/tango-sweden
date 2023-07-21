export const labelSwedish = name => {
    switch (name.toLowerCase()) {
        case 'goteborg':return 'Göteborg'
        case 'malmo':return 'Malmö/Lund'
        case 'jamtland':return 'Jämtland'
        default: return name.toLowerCase()
    }
}
