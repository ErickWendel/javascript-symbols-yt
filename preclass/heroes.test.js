
const Heroes = require('./heroes')

const { deepStrictEqual, throws } = require('assert')


    ;
(async () => {
    const heroes = new Heroes()
    heroes.add('Erick', 'Wendel')
    heroes.add('Xuxa', 'da Silva')
    // console.log('heroes', heroes)

    // .toPrimitive
    // deepStrictEqual(heroes.toString(), "\nErick Wendel\nXuxa da Silva")
    deepStrictEqual(String(heroes), "\nErick Wendel\nXuxa da Silva")
    throws(() => heroes * 1, { name: "TypeError", message: "invalid convertion!" })


    const expectedHeroItems = [{ firstName: 'Erick', lastName: 'Wendel' }, { firstName: 'Xuxa', lastName: "da Silva" }]

    // .iterator
    deepStrictEqual([...heroes], expectedHeroItems)
    deepStrictEqual(Array.from(heroes), expectedHeroItems)

    {
        const items = []
        for (const hero of heroes) { items.push(hero) }
        deepStrictEqual(items, expectedHeroItems)
    }

    // .asyncIterator
    {
        const items = []

        for await (const hero of heroes) { items.push(hero) }
        const expectedKeys = ['id', 'firstName', 'lastName']

        deepStrictEqual(items.filter(id => id > 0).length, 0)
        deepStrictEqual(Object.keys(items[0]), expectedKeys)
    }


})()
