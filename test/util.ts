import * as assert from 'assert'
import { intersect } from '../src/util'

describe('intersect', () => {
  it('should concat strings', () => {
    assert.deepStrictEqual(intersect('a', 'b'), 'b')
  })

  it('should concat numbers', () => {
    assert.deepStrictEqual(intersect(1, 2), 2)
  })

  it('should concat booleans', () => {
    assert.deepStrictEqual(intersect(true, false), false)
  })

  it('should concat nulls', () => {
    assert.deepStrictEqual(intersect(null, null), null)
  })

  it('should concat undefineds', () => {
    assert.deepStrictEqual(intersect(undefined, undefined), undefined)
  })

  it('should concat objects', () => {
    assert.deepStrictEqual(intersect({ a: 1 }, { b: 2 }), { a: 1, b: 2 })
  })

  it('should concat a string with an object', () => {
    assert.deepStrictEqual(intersect('a', { a: 1 }), { 0: 'a', a: 1 })
  })

  it('should concat a number with an object', () => {
    assert.deepStrictEqual(intersect(1, { a: 1 }), { a: 1 })
  })

  it('should concat a boolean with an object', () => {
    assert.deepStrictEqual(intersect(true, { a: 1 }), { a: 1 })
  })
})