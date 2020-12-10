const { deepStrictEqual, throws } = require('assert')

    ;
(async () => {
    const Heroes = require('./heroes')
    const heroes = new Heroes()
    heroes.add("Erick", "Wendel")
    heroes.add("Xuxa", "da Silva")

    // console.log('heroes', heroes)
    // // console.log('heroes.toString()', heroes.toString())
    // console.log('heroes * 1', heroes * 1)
    // console.log('[...heroes]', [...heroes])

    deepStrictEqual(heroes.toString(), '\nErick Wendel\nXuxa da Silva')
    deepStrictEqual(String(heroes), '\nErick Wendel\nXuxa da Silva')
    throws(() => heroes * 1, { name: "TypeError", message: "invalid convertion!" })

    const expectedItems = [
        { firstName: "Erick", lastName: "Wendel" },
        { firstName: "Xuxa", lastName: "da Silva" },
    ]

    // .iterator
    deepStrictEqual([...heroes], expectedItems)
    deepStrictEqual(Array.from(heroes), expectedItems)

    {
        const items = []
        for (const item of heroes) { items.push(item) }
        deepStrictEqual(items, expectedItems)
    }

    // .asyncIterator
    {
        const items = []
        for await (const hero of heroes) { items.push(hero) }
        const expectedKeys = ['id', 'firstName', 'lastName']

        deepStrictEqual(items.filter(({ id }) => id > 0).length, 2)
        deepStrictEqual(Object.keys(items[0]), expectedKeys)
    }
})()