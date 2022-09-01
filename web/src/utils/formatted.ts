

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


export const formattedDatePtBR = (date: any) => {

    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',

    }).format(date)
}
