const diagonalMatrix = (matrix: number[][]): number => {
    let diagonal_1: number = 0
    let diagonal_2: number = 0

    for (let i: number = 0; i < matrix.length; i++) {
        diagonal_1 += matrix[i][i]
    }

    let temp = matrix.length
    for (let i: number = 0; i < matrix.length; i++) {
        temp--
        diagonal_2 += matrix[i][temp]
    }

    return diagonal_1 - diagonal_2
}

export default diagonalMatrix