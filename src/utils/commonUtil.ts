export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const toHeadUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
