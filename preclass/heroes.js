const { promisify } = require('util')
const crypto = require('crypto')

// Added in: v14.10.0, v12.19.0
const randomInt = promisify(crypto.randomInt)

const kItems = Symbol('items')
const kFormatName = Symbol('formatName')
const kIdKeySize = Symbol('idKeySize')

class Heroes {
    constructor() {
        // membro privado
        this[kItems] = []
        this[kIdKeySize] = 10
    }

    add(firstName, lastName) {
        this[kItems].push({ firstName, lastName })
    }
    // funcao privada
    [kFormatName](firstName, lastName) {
        return `${firstName} ${lastName}`
    }
    
    // quando .toString()
    toString() {
        const r = this[kItems]
            .map(item => this[kFormatName](item.firstName, item.lastName))
            .join('\n')

        return '\n'.concat(r)
    }

    // para quando String(item) ou item + ''
    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw TypeError('invalid convertion!')
        return this.toString()
    }
    
    // para for (item of []) ou Array.from()
    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }
    
    // para for await (item of []) 
    async *[Symbol.asyncIterator]() {
        for (const item of this[kItems]) {
            const id = await randomInt(this[kIdKeySize])

            yield { id, ...item, }
        }
    }

}

module.exports = Heroes