const reverseAlphabet = (word: string): string => {
    let result: string = ''
    let letters: string[] = []

    for (let i: number = word.length - 1; i >= 0; i--) {
        letters.push(word[i])
    }

    for (let i: number = 1; i < letters.length; i++) {
        result += letters[i]
    }

    result += letters[0]

    return result
}

export default reverseAlphabet
