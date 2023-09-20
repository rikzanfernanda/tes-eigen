import longestWord from "../src/longest-word"

describe('Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu', () => {
    test('should return EIGEN1', () => {
        const result = longestWord('Saya sangat senang mengerjakan soal algoritma')

        expect(result).toBe('mengerjakan')
    })
})