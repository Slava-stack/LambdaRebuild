if (!Array.prototype.all) {
	Array.prototype.all = function <T>(clb: (el: T, index?: number, array?: readonly T[]) => boolean): boolean {
		let result = true;
		try {
			this.forEach((el, index, array: T[]) => {
				if (!(clb(el, index, array))) {
					result = false;
					throw 'Break';
				}
			});
		} catch (e) {
		}
		return result;
	}
}
if (!Array.prototype.any) {
	Array.prototype.any = function <T>(
		clb: (el: T, index?: number, array?: readonly T[]
		) => boolean): boolean {
		let result = false;

		try {
			this.forEach((el: T, index: number, array: T[]) => {
				if (clb(el, index, array)) {
					result = true;
					throw 'Break';
				}
			});
		} catch (e) {
		}
		return result;
	}
}
if (!Array.prototype.associateBy) {
	Array.prototype.associateBy = function <T, K, V>(
		clb1: (el: T, index?: number, array?: readonly T[]) => K,
		clb2?: (el: T, index?: number, array?: readonly T[]) => V
	): Map<K, T | V> {   // Map<K, T> | Map <K, V>  !==  Map<K, T | V>
		const result: Map<K, T | V> = new Map();
		if (clb1 && !clb2) {
			this.forEach((el: T, index?: number, array?: T[]) => {
				result.set(clb1(el, index, array), el);
			});
		}
		if (clb1 && clb2) {
			this.forEach((el: T, index?: number, array?: T[]) => {
				result.set(clb1(el, index, array), clb2(el, index, array));
			});
		}
		return result;
	}
}
if (!Array.prototype.average) {
	Array.prototype.average = function (): number {
		let sum = 0;
		let count = 0;
		this.forEach((el: number) => {
			sum += el
			count++;
		});
		return sum / count;
	}
}
if (!Array.prototype.chunked) {
	Array.prototype.chunked = function <T>(step: number): T[][] {
		const result: T[][] = [];
		for (let i = 0; i < this.length; i += step) {
			result.push(this.slice(i, i + step));
		}
		return result;
	}
}
if (!Array.prototype.distinctBy) {
	Array.prototype.distinctBy = function <T, K>(
		clb: (el: T, index?: number, array?: readonly T[]) => K
	): T[] {
		const result: T[] = [];
		this.forEach((el: T, index: number, array: T[]) => {
			if (!clb(el, index, array)) {
				result.push(el);
			}
		});
		return result;
	}
}
if (!Array.prototype.myFilter) {
	Array.prototype.myFilter = function <T>(
		clb: (el: T, index?: number, array?: readonly T[]) => boolean
	): T[] {
		const result: T[] = [];
		this.forEach((el: T, index, array: T[]) => {
			if (clb(el, index, array)) {
				result.push(el);
			}
		});
		return result;
	}
}
if (!Array.prototype.filterIndexed) {
	Array.prototype.filterIndexed = function <T>(clb: (
		el: T, index?: number, array?: readonly T[]) => boolean
	): T[] {
		const result: T[] = [];
		this.forEach((el: T, index, array: T[]) => {
			if (clb(el, index, array)) {
				result.push(el);
			}
		});
		return result;
	}
}
if (!Array.prototype.filterNot) {
	Array.prototype.filterNot = function <T>(
		clb: (el: T, index?: number, array?: readonly T[]) => boolean
	): T[] {
		const result: T[] = [];
		this.forEach((el: T, index, array: T[]) => {
			if (!clb(el, index, array)) {
				result.push(el);
			}
		});
		return result;
	}
}
if (!Array.prototype.myFind) {
	Array.prototype.myFind = function <T>(
		clb: (el: T, index?: number, array?: readonly T[]) => boolean
	): T | null {
		let result: T | null = null;
		try {
			this.forEach((el: T, index, array: T[]) => {
				if (clb(el, index, array)) {
					result = el;
					throw 'Break';
				}
			})
		} catch (e) {
		}
		return result;
	}
}
if (!Array.prototype.findLast) {
	Array.prototype.findLast = function <T>(
		clb: (el: T, index?: number, array?: readonly T[]
		) => boolean): T | null {
		let result: T | null = null;
		try {
			this.reverse().forEach((el: T, index, array: T[]) => {
				if (clb(el, index, array)) {
					result = el;
					throw 'Break';
				}
			})
		} catch (e) {
		}
		return result;
	}
}
if (!Array.prototype.flatten) {
	Array.prototype.flatten = function <T>(): T[] {
		const result: T[] = [];
		this.forEach((el: T[]) => {
			el.forEach((nestedEl: T) => {
				result.push(nestedEl);
			});
		});
		return result;
	}
}
if (!Array.prototype.fold) {
	Array.prototype.fold = function <T, K>(
		initVal: T, clb: (initVal: T, el: K, index?: number, array?: readonly T[]) => T
	): T {
		this.forEach((el: K, index, array: T[]) => {
			initVal = clb(initVal, el, index, array);
		});
		return initVal;
	}
}
if (!Array.prototype.maxBy) {
	Array.prototype.maxBy = function <T, K>(clb: (el: T, index?: number, array?: readonly T[]) => K): T | null {
		let max: null | T = null;
		this.forEach((el: T, index: number, array: T[]) => {
			if (max !== null) {
				if (clb(max, index, array) < clb(el, index, array)) {
					max = el;
				}
			}
			if (max === null) {
				max = el;
			}
		});
		return max;
	}
}
if (!Array.prototype.minBy) {
	Array.prototype.minBy = function <T, K>(clb: (el: T, index?: number, array?: readonly T[]) => K): T | null {
		let min: T | null = null;
		this.forEach((el, index: number, array: T[]) => {
			if (min !== null) {
				if (clb(min, index, array) > clb(el, index, array)) {
					min = el;
				}
			}
			if (min === null) {
				min = el;
			}
		});
		return min;
	}
}
if (!Array.prototype.count) {
	Array.prototype.count = function <T>(clb: (el: T, index?: number, array?: readonly T[]) => number): number {
		let count = 0;
		this.forEach((el: T, index: number, array: T[]) => {
			count += clb(el, index, array);
		});
		return count;
	}
}
if (!Array.prototype.groupBy) {
	Array.prototype.groupBy = function <T, K>(
		clb: (el: T, index?: number, array?: readonly T[]) => K
	): Map<K, T[]> {
		const result: Map<K, T[]> = new Map();
		this.forEach((el: T, index: number, array: T[]) => {
			const key = clb(el, index, array);
			const value = result.get(key);
			if (value) {
				value.push(el);
			}
			if (!value) {
				result.set(key, [el]);
			}
		});
		return result;
	}
}
if (!Array.prototype.groupBySecond) {
	Array.prototype.groupBySecond = function <T, K, V>(
		clb1: (el: T, index?: number, array?: readonly T[]) => K,
		clb2: (el: T, index?: number, array?: readonly T[]) => V
	): Map<K, V[]> {
		const result: Map<K, V[]> = new Map();
		this.forEach((el: T, index: number, array: T[]) => {
			const key = clb1(el, index, array);
			const value = result.get(key);
			if (value) {
				value.push(clb2(el));
			}
			if (!value) {
				result.set(key, [clb2(el)]);
			}
		});
		return result;
	}
}
