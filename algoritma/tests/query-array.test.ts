import queryArray from "../src/query-array"

describe('Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT', () => {
    test('should return [1, 0, 2]', () => {
        const result = queryArray(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz'])

        expect(result).toEqual([1, 0, 2])
    })
})