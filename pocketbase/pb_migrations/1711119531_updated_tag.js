/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('pgj749tbz9a41vm')

        collection.listRule = ''
        collection.viewRule = ''
        collection.createRule = ''

        return dao.saveCollection(collection)
    },
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('pgj749tbz9a41vm')

        collection.listRule = null
        collection.viewRule = null
        collection.createRule = null

        return dao.saveCollection(collection)
    }
)
