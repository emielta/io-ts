import * as assert from 'assert'
import * as E from 'fp-ts/lib/Either'
import * as DE from '../src/DecodeError'
import * as D from '../src/Decoder'
import { pipe } from 'fp-ts/lib/pipeable'

describe('Decoder', () => {
  describe('decoder', () => {
    it('map', () => {
      const decoder = pipe(
        D.string,
        D.map(s => s.length)
      )
      assert.deepStrictEqual(decoder.decode('aaa'), E.right(3))
    })

    it('of', () => {
      const decoder = D.decoder.of(1)
      assert.deepStrictEqual(decoder.decode(1), E.right(1))
      assert.deepStrictEqual(decoder.decode('a'), E.right(1))
    })

    it('ap', () => {
      const fab = D.decoder.of((s: string): number => s.length)
      const fa = D.string
      assert.deepStrictEqual(pipe(fab, D.ap(fa)).decode('aaa'), E.right(3))
    })

    it('alt', () => {
      const decoder = pipe(
        D.string,
        D.alt(() => pipe(D.number, D.map(String)))
      )
      assert.deepStrictEqual(decoder.decode('a'), E.right('a'))
      assert.deepStrictEqual(decoder.decode(1), E.right('1'))
    })

    it('zero', () => {
      const decoder = D.decoder.zero()
      assert.deepStrictEqual(decoder.decode(null), E.left(DE.leaf(null, 'never')))
    })
  })

  describe('literal', () => {
    it('should reject an invalid input with the passed id', () => {
      const decoder = D.literal(1, 'myid')
      assert.deepStrictEqual(decoder.decode(null), E.left(DE.leaf(null, 'myid', 'Cannot decode null, expected myid')))
    })
  })

  describe('literals', () => {
    it('should reject an invalid input with the passed id', () => {
      const decoder = D.literals([1], 'myid')
      assert.deepStrictEqual(decoder.decode(null), E.left(DE.leaf(null, 'myid', 'Cannot decode null, expected myid')))
    })
  })

  describe('union', () => {
    it('should decode a valid input', () => {
      const decoder = D.union([D.string, D.number])
      assert.deepStrictEqual(decoder.decode('a'), E.right('a'))
      assert.deepStrictEqual(decoder.decode(1), E.right(1))
    })

    it('should reject an invalid input', () => {
      const decoder = D.union([D.string, D.number])
      assert.deepStrictEqual(
        decoder.decode(true),
        E.left(DE.or(true, [DE.leaf(true, 'string'), DE.leaf(true, 'number')]))
      )
    })
  })
})