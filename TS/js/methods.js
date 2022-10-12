"use strict";
if (!Array.prototype.all) {
    Array.prototype.all = function (clb) {
        let result = true;
        try {
            this.forEach((el, index, array) => {
                if (!(clb(el, index, array))) {
                    result = false;
                    throw 'Break';
                }
            });
        }
        catch (e) {
        }
        return result;
    };
}
if (!Array.prototype.any) {
    Array.prototype.any = function (clb) {
        let result = false;
        try {
            this.forEach((el, index, array) => {
                if (clb(el, index, array)) {
                    result = true;
                    throw 'Break';
                }
            });
        }
        catch (e) {
        }
        return result;
    };
}
if (!Array.prototype.associateBy) {
    Array.prototype.associateBy = function (clb1, clb2) {
        const result = new Map();
        if (clb1 && !clb2) {
            this.forEach((el, index, array) => {
                result.set(clb1(el, index, array), el);
            });
        }
        if (clb1 && clb2) {
            this.forEach((el, index, array) => {
                result.set(clb1(el, index, array), clb2(el, index, array));
            });
        }
        return result;
    };
}
if (!Array.prototype.average) {
    Array.prototype.average = function () {
        let sum = 0;
        let count = 0;
        this.forEach((el) => {
            sum += el;
            count++;
        });
        return sum / count;
    };
}
if (!Array.prototype.chunked) {
    Array.prototype.chunked = function (step) {
        const result = [];
        for (let i = 0; i < this.length; i += step) {
            result.push(this.slice(i, i + step));
        }
        return result;
    };
}
if (!Array.prototype.distinctBy) {
    Array.prototype.distinctBy = function (clb) {
        const result = [];
        this.forEach((el, index, array) => {
            if (!clb(el, index, array)) {
                result.push(el);
            }
        });
        return result;
    };
}
if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function (clb) {
        const result = [];
        this.forEach((el, index, array) => {
            if (clb(el, index, array)) {
                result.push(el);
            }
        });
        return result;
    };
}
if (!Array.prototype.filterIndexed) {
    Array.prototype.filterIndexed = function (clb) {
        const result = [];
        this.forEach((el, index, array) => {
            if (clb(el, index, array)) {
                result.push(el);
            }
        });
        return result;
    };
}
if (!Array.prototype.filterNot) {
    Array.prototype.filterNot = function (clb) {
        const result = [];
        this.forEach((el, index, array) => {
            if (!clb(el, index, array)) {
                result.push(el);
            }
        });
        return result;
    };
}
if (!Array.prototype.myFind) {
    Array.prototype.myFind = function (clb) {
        let result = null;
        try {
            this.forEach((el, index, array) => {
                if (clb(el, index, array)) {
                    result = el;
                    throw 'Break';
                }
            });
        }
        catch (e) {
        }
        return result;
    };
}
if (!Array.prototype.findLast) {
    Array.prototype.findLast = function (clb) {
        let result = null;
        try {
            this.reverse().forEach((el, index, array) => {
                if (clb(el, index, array)) {
                    result = el;
                    throw 'Break';
                }
            });
        }
        catch (e) {
        }
        return result;
    };
}
if (!Array.prototype.flatten) {
    Array.prototype.flatten = function () {
        const result = [];
        this.forEach((el) => {
            el.forEach((nestedEl) => {
                result.push(nestedEl);
            });
        });
        return result;
    };
}
if (!Array.prototype.fold) {
    Array.prototype.fold = function (initVal, clb) {
        this.forEach((el, index, array) => {
            initVal = clb(initVal, el, index, array);
        });
        return initVal;
    };
}
if (!Array.prototype.maxBy) {
    Array.prototype.maxBy = function (clb) {
        let max = null;
        this.forEach((el, index, array) => {
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
    };
}
if (!Array.prototype.minBy) {
    Array.prototype.minBy = function (clb) {
        let min = null;
        this.forEach((el, index, array) => {
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
    };
}
if (!Array.prototype.count) {
    Array.prototype.count = function (clb) {
        let count = 0;
        if (clb) {
            this.forEach((el, index, array) => {
                count += clb(el, index, array);
            });
        }
        return count;
    };
}
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (clb) {
        const result = new Map();
        this.forEach((el, index, array) => {
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
    };
}
if (!Array.prototype.groupBySecond) {
    Array.prototype.groupBySecond = function (clb1, clb2) {
        const result = new Map();
        this.forEach((el, index, array) => {
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
    };
}
