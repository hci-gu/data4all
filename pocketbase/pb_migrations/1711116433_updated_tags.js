/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('pgj749tbz9a41vm')

        collection.name = 'tag'

        return dao.saveCollection(collection)
    },
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('pgj749tbz9a41vm')

        collection.name = 'tags'

        return dao.saveCollection(collection)
    }
)
