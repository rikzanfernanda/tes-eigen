const longestWord = (sentence: string): string => {
    const words = sentence.split(' ')
    let longestWord = words[0]

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word
        }
    }

    return longestWord
}

export default longestWord