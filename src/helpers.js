const getRandom = (coins) => {
    const randomIndex = Math.floor(Math.random() * coins.length)
    return coins[randomIndex]
}

export {getRandom}