const { promisify } = require('util')
const crypto = require('crypto')

// converter o crypto.randomInt para Promise (de callback para promise)
// randomInt só tem da v14.10 para frente!
const randomInt = promisify(crypto.randomInt)



const kItems = Symbol("kItems")
const kFormatName = Symbol("kFormatName")
const kIdKeySize = Symbol("kIdKeySize")
class Heroes {
    constructor() {
        this[kItems] = []
        this[kIdKeySize] = 10
    }

    add(firstName, lastName) {
        this[kItems].push({ firstName, lastName })
    }
    [kFormatName](firstName, lastName) {
        return `${firstName} ${lastName}`
    }
    toString() {
        const result = this[kItems]
            .map(item => this[kFormatName](item.firstName, item.lastName))
            .join('\n')

        return '\n'.concat(result)
    }

    // chamado no String(obj), obj + ''
    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") throw new TypeError("invalid convertion!")

        return this.toString()
    }
    // chamado no [...obj], Array.from(obj) ou for(const item of obj) {}
    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }
    async *[Symbol.asyncIterator]() {
        for (const item of this[kItems]) {
            const id = await randomInt(this[kIdKeySize])
            yield { id, ...item }
        }
    }
}

module.exports = Heroes