declare global {
	interface Array<T> {
		/**
		 * Returns true if each element of the array satisfies condition of the callback otherwise returns false.
		 * @param clb A function which accepts up to three arguments. The all method calls the callback function
		 * for each element in the array until the callback function returns false or until the end of the array if
		 * all elements satisfy the callback condition.
		 */
		all<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): boolean;

		/**
		 * Returns true if at least one element of the array satisfies condition of the callback otherwise returns false.
		 * @param clb A function which accepts up to three arguments. The any method calls the callback function
		 * for each element in the array until the callback function returns true or until the end of the array if
		 * all elements doesn't satisfy the callback condition.
		 */
		any<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): boolean;

		/**
		 * Returns a map containing elements with a key as a clb1 result value and a value as an element, if only clb1 is passed into.
		 * In case of passing clb1 and clb2 returns a map containing elements with a key as a clb1 result value and a value as a clb2 result value.
		 *
		 * If any two elements had the same key returned by clb1 the last one gets added to the map.
		 *
		 * @param clb1 A function which accepts up to three arguments. The associateBy method calls the callback function
		 * for each element in the array until the end of the array and sets the result as a key of the map afterwards.
		 * @param clb2 A function which accepts up to three arguments. The associateBy method calls the callback function
		 * for each element in the array until the end of the array and sets the result as a value of the map afterwards.
		 */
		associateBy<T, K, V>(
			clb1: (el: T, index?: number, array?: readonly T[]) => K,
			clb2?: (el: T, index?: number, array?: readonly T[]) => V
		): Map<K, V | T>

		/**
		 * Returns an average number value of all number elements of the array.
		 * @example
		 * [1, 2.3, 3, 4, 5, 6.7, 7, 8, 9, 0].average() >> 4.6
		 */
		average(): number;

		/**
		 * Returns an array of arrays with values separated in groups by step parameter from the array.
		 * @example
		 * [0, 1, 'Hi', 3, 4, 5, 6, 7].chucked(3) >> [[0, 1, 'Hi'], [3, 4, 5], [6, 7]]
		 * @param step An integer number which defines the separation step of the values in the array.
		 */
		chunked<T>(step: number): T[][];

		/**
		 * Returns an array consisting of elements which don't satisfy the callback function condition
		 * @param clb A callback function which accepts up to three arguments. The distinctBy method calls the callback function
		 * for each element in the array until the end of the array.
		 */
		distinctBy<T, K>(
			clb: (el: T, index?: number, array?: readonly T[]) => K
		): T[];

		/**
		 * Returns an array consisting of elements which satisfy the callback condition
		 * @param clb A function which accepts up to three arguments. The myFilter method calls the callback function
		 * for each element in the array until the end of the array.
		 */
		myFilter<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): T[];

		/**
		 * Returns an array consisting of elements which satisfy a given callback function
		 * @param clb A function which accepts up to three arguments. The filterIndexed method calls the callback function
		 * for each element in the array until the end of the array.
		 */
		filterIndexed<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): T[];

		/**
		 * Returns an array consisting of elements which don't satisfy the callback condition
		 * @param clb A function which accepts up to three arguments. The filterNot method calls the callback function
		 * for each element in the array until the end of the array.
		 */
		filterNot<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): T[];

		/**
		 * Returns the first element which satisfies the callback condition or null if no such element was found.
		 * Searching starts from the left side and goes to the right side.
		 * @param clb A function which accepts up to three arguments. The myFind method calls the callback function
		 * for each element in the array until finds the first element which satisfies the condition or the end of the array.
		 */
		myFind<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): T | null;

		/**
		 * Returns the first element which satisfies the callback condition or null if no such element was found.
		 * Searching starts from the right side and goes to the left side.
		 * @param clb A function which accepts up to three arguments. The myFind method calls the callback function
		 * for each element in the array until finds the first element which satisfies the condition or the end of the array.
		 */
		findLast<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => boolean
		): T | null;

		/**
		 * Returns an array of values in the exact order of values in nested arrays of the array.
		 * @example
		 * [[1,2,3][3,2][523]].flatten >> [1,2,3,3,2,523]
		 */
		flatten<T>(): T[];

		/**
		 * Accumulates value starting with initial value and applying callback function from left to right to current accumulator value and each element
		 * @param initVal An initial value
		 * @param clb A function which accepts up to four arguments. The fold method calls the callback function
		 * for each element in the array until the end of the array.
		 */
		fold<T, K>(
			initVal: T,
			clb: (initVal: T, el: K, index?: number, array?: readonly T[]) => T
		): T;

		/**
		 * Returns an element from the array which has the greatest value in the callback function output, if there is no values in the array return null.
		 * @param clb A function which accepts up to three arguments. The maxBy method calls the callback function
		 * for each element and element with +1 position in the array until the end of the array.
		 */
		maxBy<T, K>(
			clb: (el: T, index?: number, array?: readonly T[]) => K
		): T | null;

		/**
		 * Returns an element from the array which has the smallest value in the callback function output, if there is no values in the array return null.
		 * @param clb A function which accepts up to three arguments. The minBy method calls the callback function
		 * for each element and element with +1 position in the array until the end of the array.
		 */
		minBy<T, K>(
			clb: (el: T, index?: number, array?: readonly T[]) => K
		): T | null;

		/**
		 * Returns a sum of all callback outputs with each element in the array.
		 * @param clb A function which accepts up to three arguments. The count method calls the callback function
		 * for each element till the end of the array.
		 */
		count<T>(
			clb: (el: T, index?: number, array?: readonly T[]) => number
		): number;

		/**
		 * Returns a map with a key as a callback value and a value as an array of all elements.
		 *
		 * If any two elements had the same key returned by clb1 the last one gets added to the map.
		 *
		 * @param clb A function which accepts up to three arguments. The groupBy method calls the callback function
		 * for each element till the end of the array.
		 */
		groupBy<T, K>(
			clb: (el: T, index?: number, array?: readonly T[]) => K
		): Map<K, T[]>;

		/**
		 * Returns a map with a key as clb1 value and a value as an array of all clb2 values.
		 *
		 * If any two elements had the same key returned by clb1 the last one gets added to the map.
		 *
		 * @param clb1 A function which accepts up to three arguments. The groupBySecond method calls the callback function
		 * for each element till the end of the array.
		 * @param clb2 A function which accepts up to three arguments. The groupBySecond method calls the callback function
		 * for each element till the end of the array.
		 */
		groupBySecond<T, K, V>(
			clb1: (el: T, index?: number, array?: readonly T[]) => K,
			clb2: (el: T, index?: number, array?: readonly T[]) => V
		): Map<K, V[]>
	}
}

export {};
