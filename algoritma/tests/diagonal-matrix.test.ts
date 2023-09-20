import diagonalMatrix from "../src/diagonal-matrix"

describe('Cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN', () => {
    test('should return 3', () => {
        const result = diagonalMatrix([[1, 2, 0], [4, 5, 6], [7, 8, 9]])

        expect(result).toEqual(3)
    })
})