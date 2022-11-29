import {
    all,
  and,
  append,
  at,
  both,
  call,
  decrement,
  divide,
  either,
  entries,
  eq,
  filter,
  flatten,
  flip,
  gt,
  gte,
  has,
  ifElse,
  increment,
  keys,
  lt,
  lte,
  map,
  match,
  minus,
  multiply,
  neq,
  omit,
  or,
  pick,
  plus,
  prepend,
  regex,
  tap,
  toFloat,
  toInt,
  toString,
  values,
} from "../src";

describe("Methods", () => {
  test("map", () => {
    const double = map<number>((v) => v * 2);

    expect(double(1)).toBe(2);
    expect(double(2)).toBe(4);
  });

  test("ifElse", () => {
    const oddOrEven = ifElse(
      (v: number) => !(v % 2),
      () => "even",
      () => "odd",
    );

    expect(oddOrEven(1)).toBe("odd");
    expect(oddOrEven(2)).toBe("even");
  });

  test("filter", () => {
    const evenFilter = filter<number>((v) => !(v % 2));

    expect(evenFilter(1)).toBe(undefined);
    expect(evenFilter(2)).toBe(2);
  });

  test("at", () => {
    const arr = [1, 2];

    expect(at(0)(arr)).toBe(1);
    expect(at(1)(arr)).toBe(2);
  });

  test("toString", () => {
    expect(toString(1)).toBe("1");
    expect(toString([1, 2])).toBe("1,2");
  });

  test("toInt", () => {
    expect(toInt("1")).toBe(1);
    expect(toInt("hello")).toBe(NaN);
  });

  test("toFloat", () => {
    expect(toFloat("0.5")).toBe(0.5);
    expect(toFloat("hello")).toBe(NaN);
  });

  test("tap", () => {
    const fn = jest.fn();
    const effect = tap(fn);

    expect(effect(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("multiply", () => {
    expect(multiply(2)(1)).toBe(2);
  });

  test("divide", () => {
    expect(divide(2)(4)).toBe(2);
  });

  test("plus", () => {
    expect(plus(2)(4)).toBe(6);
  });

  test("increment", () => {
    expect(increment(1)).toBe(2);
  });

  test("minus", () => {
    expect(minus(2)(2)).toBe(0);
  });

  test("decrement", () => {
    expect(decrement(1)).toBe(0);
  });

  test("gte", () => {
    const gte4 = gte(4);

    expect(gte4(2)).toBe(undefined);
    expect(gte4(4)).toBe(4);
    expect(gte4(6)).toBe(6);
  });

  test("gt", () => {
    const gt4 = gt(4);

    expect(gt4(2)).toBe(undefined);
    expect(gt4(4)).toBe(undefined);
    expect(gt4(6)).toBe(6);
  });

  test("lte", () => {
    const lte4 = lte(4);

    expect(lte4(2)).toBe(2);
    expect(lte4(4)).toBe(4);
    expect(lte4(6)).toBe(undefined);
  });

  test("lt", () => {
    const lt4 = lt(4);

    expect(lt4(2)).toBe(2);
    expect(lt4(4)).toBe(undefined);
    expect(lt4(6)).toBe(undefined);
  });

  test("eq", () => {
    const eq4 = eq(4);

    expect(eq4(2)).toBe(undefined);
    expect(eq4(4)).toBe(4);
  });

  test("neq", () => {
    const neq4 = neq(4);

    expect(neq4(2)).toBe(2);
    expect(neq4(4)).toBe(undefined);
  });

  test("call", () => {
    const callAtZero = call("at", 0);

    expect(callAtZero([1, 2, 3])).toBe(1);
  });

  test("has", () => {
    const hasName = has("name");
    const user = { name: "yamiteru" };

    expect(hasName({})).toBe(undefined);
    expect(hasName(user)).toBe(user);
  });

  test("flip", () => {
    expect(flip([1, 2])).toStrictEqual([2, 1]);
  });

  test("flatten", () => {
    expect(flatten([[1, 2], [3]])).toStrictEqual([1, 2, 3]);
  });

  test("prepend", () => {
    expect(prepend(0)([1, 2])).toStrictEqual([0, 1, 2]);
  });

  test("append", () => {
    expect(append(3)([1, 2])).toStrictEqual([1, 2, 3]);
  });

  test("regex", () => {
    const numberRegex = regex(/^[0-9]+$/);

    expect(numberRegex("hello")).toBe(undefined);
    expect(numberRegex("123")).toBe("123");
  });

  test("either", () => {
    const isGoodDrink = either<string>(
      (v) => v === "tea",
      (v) => v === "coffee"
    );

    expect(isGoodDrink("tea")).toBe("tea");
    expect(isGoodDrink("beer")).toBe(undefined);
  });

  test("both", () => {
    const isAlive = both<number>(
      (v) => v >= 0,
      (v) => v <= 150
    );

    expect(isAlive(-10)).toBe(undefined);
    expect(isAlive(25)).toBe(25);
  });

	test("all", () => {
		const isStrongPassword = all<string>(
			(v) => v.length >= 8,
			(v) => v.includes("strong"),
			(v) => v.includes("_"),
			(v) => v.endsWith("123456")
		);

		expect(isStrongPassword("yoyoyoyoyo")).toBe(undefined);
		expect(isStrongPassword("strong_123456")).toBe("strong_123456");
	});

	test("entries", () => {
		expect(entries({
			name: "yamiteru",
			age: 25
		})).toStrictEqual([
			["name", "yamiteru"],
			["age", 25]
		]);
	});

	test("values", () => {
		expect(values({
			one: 1,
			two: 2
		})).toStrictEqual(
			[1, 2]
		);
	});

	test("keys", () => {
		expect(keys({
			function: "add",
			props: [1, 2]
		})).toStrictEqual([
			"function",
			"props"
		]);
	});

	test("pick", () => {
		expect(pick(["a", "b"])({
			a: 1,
			b: 2,
			c: 3
		})).toStrictEqual({
			a: 1,
			b: 2
		});
	});

	test("omit", () => {
		expect(omit(["a", "b"])({
			a: 1,
			b: 2,
			c: 3
		})).toStrictEqual({
			c: 3
		});
	});

	test("add", () => {
		const isAdult = and<number>(
			(v) => v >= 18,
			(v) => v <= 150 
		);
		
		expect(isAdult(7)).toBe(undefined);
		expect(isAdult(25)).toBe(25);
	});

	test("or", () => {
		const isAlive = or<number>(
			(v) => v >= 0,
			(v) => v <= 150
		);

		expect(isAlive(-10)).toBe(undefined);
		expect(isAlive(10)).toBe(undefined);
	});

	test("match", () => {
		const statusMatch = match({
			404: (v) => `${v} - Not found`,
			500: (v) => `${v} - Internal error`,
			_: (v) => `${v} - Unknown error`
		});

		expect(statusMatch(404)).toBe(404);	
		expect(statusMatch(6969)).toBe(undefined);

		// const numberOfCharsMatch = match<number>([
		// 	[(v) => v < 100, () => 2],
		// 	[(v) => v < 1000, () => 3],
		// 	[() => true, () => 4]
		// ]);

		// expect(numberOfCharsMatch(69)).toBe(2);
		// expect(numberOfCharsMatch(42069)).toBe(4);
	});
});
