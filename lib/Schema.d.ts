/**
 * @since 3.0.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT';
import * as S from './Schemable';
/**
 * @since 3.0.0
 */
export interface Schema<A> {
    <S extends URIS>(S: S.Schemable<S> & S.WithUnion<S>): Kind<S, A>;
}
/**
 * @since 3.0.0
 */
export declare type TypeOf<S> = S extends Schema<infer A> ? A : never;
/**
 * @since 3.0.0
 */
export declare function make<A>(f: Schema<A>): Schema<A>;