const isInteger = num => {
    return Math.floor(num) === num
}

const toInteger = floatNum => {
    let ret = { times: 1, num: 0 };
    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret
    }
    let strfi = floatNum + '';
    let dotPos = strfi.indexOf('.');
    let len = strfi.substr(dotPos + 1).length;
    let times = Math.pow(10, len);
    let intNum = parseInt(floatNum * times + 0.5, 10);
    ret.times = times;
    ret.num = intNum;
    return ret
}

const operation = (a, b, op) => {
    let o1 = toInteger(a);
    let o2 = toInteger(b);
    let n1 = o1.num;
    let n2 = o2.num;
    let t1 = o1.times;
    let t2 = o2.times;
    let max = t1 > t2 ? t1 : t2;
    let result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) {
                result = n1 + n2
            } else if (t1 > t2) {
                result = n1 + n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) + n2
            }
            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2);
            return result;
        case 'divide':
            result = (n1 / n2) * (t2 / t1);
            return result
    }
}

export default {
    add: (a, b) => {
        return operation(a, b, 'add')
    },
    subtract: (a, b) => {
        return operation(a, b, 'subtract')
    },
    multiply: (a, b) => {
        return operation(a, b, 'multiply')
    },
    divide: (a, b) => {
        return operation(a, b, 'divide')
    }
}
