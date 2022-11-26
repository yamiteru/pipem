/*
  Maps input of type I into output of type O

  @example
  ```ts
  // returns "2"
  map((v: number) => `${v*2}`)(1);
  ```
*/
export const map = <I, O = I>(f: (data: I) => O) => f;

export const ifElse =
  <T, O1, O2>(
    p: (data: T) => boolean,
    o1: (data: T) => O1,
    o2: (data: T) => O2,
  ) =>
  (data: T) =>
    p(data) ? o1(data) : o2(data);

export const filter = <T>(p: (data: T) => boolean) =>
  ifElse(
    p,
    (v) => v,
    () => undefined,
  );

export const at = (i: number) => (v: unknown[]) => v.at(i);

export const toString = (v: unknown) => `${v}`;

export const toNumber = (v: string) => +v;

export const toInt = (v: string) => parseInt(v);

export const toFloat = (v: string) => parseFloat(v);

export const tap = <T>(f: (data: T) => void) =>
  map<T, T>((v) => {
    f(v);
    return v;
  });

export const multiply = (n: number) => map<number, number>((v) => v * n);

export const divide = (n: number) => map<number, number>((v) => v / n);

export const plus = (n: number) => map<number, number>((v) => v + n);

export const increment = plus(1);

export const minus = (n: number) => map<number, number>((v) => v - n);

export const decrement = minus(1);

export const gte = (n: number) => filter<number>((v) => v >= n);

export const gt = (n: number) => filter<number>((v) => v > n);

export const lte = (n: number) => filter<number>((v) => v <= n);

export const lt = (n: number) => filter<number>((v) => v < n);

export const eq = (n: number) => filter<number>((v) => v === n);

export const neq = (n: number) => filter<number>((v) => v !== n);

export const call =
  <T>(method: string, ...props: unknown[]) =>
  (value: T) =>
    value[method](...props);
