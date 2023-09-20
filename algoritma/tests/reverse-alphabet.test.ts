import reverseAlphabet from '../src/reverse-alphabet'

describe('Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"', () => {
    test('should return EIGEN1', () => {
        const result = reverseAlphabet('NEGIE1')

        expect(result).toBe('EIGEN1')
    })
})
