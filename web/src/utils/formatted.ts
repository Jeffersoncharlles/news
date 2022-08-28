

export const formattedPriceUSD = (price: number | null) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price! / 100)
}

export const formattedPriceBR = (price: number | null) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price! / 100)
}
