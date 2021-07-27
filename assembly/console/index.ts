import "wasi";

const hexLookupTable: StaticArray<string> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff']

import { Buffer } from "../buffer";

export function stringify<T>(data: T): string {

    // String
    if (isString(data)) {
        return `${data}`
    }
    // Number/NaN/Infinity
    else if (isFloat(data) || isInteger(data)) {
        return `${data}`
    }
    // Boolean
    else if (isBoolean(data)) {
        return data ? `true` : `false`
    }
    // Map
    else if (data instanceof Map) {
        if (data.size === 0) return 'Map (0) {}'
        let result = 'Map('

        const keys = data.keys()
        const values = data.values()
        const lastKey = keys.pop()
        const lastValue = values.pop()

        result += `${keys.length + 1}) { `

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = values[i]
            result += `'${stringify(key)}' => '${stringify(value)}', `
        }

        result += `'${stringify(lastKey)}' => '${stringify(lastValue)}' }`
    }
    // Buffer
    else if (data instanceof Buffer) {
        let result = '<Buffer '
        for (let i = 0; i < data.length - 1; i++) {
            result += `${hexLookupTable[data[i]]} `
        }
        result += `${hexLookupTable[data[data.length - 1]]}>`
        return result
    }
    // Array/StaticArray/UintArray/IntArray/ArrayLike
    else if (isArray(data) || isArrayLike(data)) {
        if (data.length === 0) return '[]'
        let res = '['
        const lastChunk = data[data.length - 1]
        for (let i = 0; i < data.length - 1; i++) {
            const chunk = data[i]
            if (isString(chunk)) {
                res += `'${stringify(chunk)}', `
            } else {
                res += `${stringify(chunk)}, `
            }
        }
        if (isString(lastChunk)) {
            res += `'${stringify(lastChunk)}']`
        } else {
            res += `${stringify(lastChunk)}]`
        }
        return res
    }
    return 'null'
}

export namespace console {
    export function log<T>(data: T): void {
        process.stdout.write(`${stringify(data)}\n`)
    }
    export function trace<T>(data: T): void {
        process.stdout.write(`Trace: ${stringify(data)}\n`)
    }
    export function warn<T>(data: T): void {
        process.stdout.write(`${stringify(data)}\n`)
    }
    export function error<T>(data: T): void {
        process.stdout.write(`${stringify(data)}\n`)
    }
}