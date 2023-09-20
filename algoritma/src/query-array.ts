const queryArray = (input: string[], query: string[]): number[] => {
    let result: number[] = [];

    query.forEach(item => {
        let temp: number = 0

        for (const i of input) {
            if (item === i) {
                temp += 1
            }
        }

        result.push(temp)
    });
    
    return result
}

export default queryArray