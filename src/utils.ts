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

export const has = <K extends string>(key: K) =>
  filter<Record<string | K, unknown>>((v) => key in v);

// Flips array order
export const flip = call("reverse");

// Flattens array
export const flatten = call("flat");

// Adds value at the beginning of an array
export const prepend = <T>(value: T) =>
  map<T[]>((v) => [value, ...v]);

// Adds value at the end of an array
export const append = <T>(value: T) =>
  map<T[]>((v) => [...v, value]);

// Matches pattern inside a string
export const regex = (pattern: RegExp) =>
  filter<string>((v) => pattern.test(v));

// Passes if either one of the predicates returns true
export const either = <T>(
  p1: (data: T) => boolean,
  p2: (data: T) => boolean
) => filter<T>((v) => p1(v) || p2(v));

// Passes if both of the predicates return true
export const both = <T>(
  p1: (data: T) => boolean,
  p2: (data: T) => boolean
) => filter<T>((v) => p1(v) && p2(v));

// Passes if all of the predicates return true
export const all = <T>(
	...ps: ((data: T) => boolean)[]
) => filter<T>((v) => {
	for(let i = 0; i < ps.length; ++i) {
		if(ps[i](v) === false) {
			return false;
		}
	}

	return true;
});

// Returns object entries
export const entries = <
	T extends Record<string, unknown>
>(obj: T) => map((v: T) => Object.entries(v))(obj);

// Returns object values
export const values = <
	T extends Record<string, unknown>
>(obj: T) => map((v: T) => Object.values(v))(obj);

// Returns object keys
export const keys = <
	T extends Record<string, unknown>
>(obj: T) => map((v: T) => Object.keys(v))(obj);

// Returns the input object with only the specified keys
export const pick = <
	T extends string[]
>(keys: T) => map((v: Record<string, unknown>) => {
	const res: Record<string, unknown> = {};	

	for(let i = 0; i < keys.length; ++i) {
		const k = keys[i];
		res[k] = v[k];
	}

	return res;
});

// Returns the input objects without the specified keys
export const omit = <
	T extends string[]
>(keys: T) => map((v: Record<string, unknown>) => {
	const res: Record<string, unknown> = {};

	for(const k in v) {
		if(!keys.includes(k)) {
			res[k] = v[k];
		}
	}

	return res;
});

// Returns input value if all predicates return true
export const and = <T>(
	...ps: ((data: T) => boolean)[]
) => filter<T>((v) => {
	for(let i = 0; i < ps.length; ++i) {
		if(!ps[i](v)) return false; 
	}

	return true;
});

// Returns input value if at least one predicate returns true
export const or = <T>(
	...ps: ((data: T) => boolean)[]
) => filter<T>((v) => {
	for(let i = 0; i < ps.length; ++i) {
		if(!ps[i](v)) return false;
	}

	return true;
});

type InferOptionInput<T> = T extends infer Z 
	? Z extends "_" 
		? unknown
		: T
	: never;

type SimpleObject = Record<string | number, unknown>;

type InferOptionObject<
	O extends SimpleObject
> = {
	[K in keyof O]: (data: O[K]) => unknown;
};

type InferOptionOutput<
	O extends SimpleObject,
	K extends Keys<O>
> = O[K] extends (data: unknown) => infer X
	? X
	: never;

type Keys<T extends SimpleObject> = keyof T;

export const match = <
	O extends SimpleObject,
	X extends InferOptionObject<O>
>(options: X) => <
	K extends Keys<X>,
	S extends InferOptionInput<K>,
>(data: S) => {
		return data as unknown as InferOptionOutput<X, K>;
	};

export const match2 = <
	T extends unknown[],
	X = {
		[I in keyof T]: [
			(data: unknown) => boolean, 
			(data: T[I]) => unknown
		]
	}
>(options: O) => (data: unknown) => {

};

// const statusMatch = match({
// 	404: (v) => `${v} - Not found`,
// 	500: (v) => `${v} - Internal error`,
// 	_: (v) => `${v} - Unknown error`
// });
// 
// const res = statusMatch(500);

match2<[404, 500]>({
	404: 0,
	500: 0,
	2: 0
});

const testMatch = match2<[404]>([
	[(v) => v === 404, (v) => `${v} - Not found`]
]);





