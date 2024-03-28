/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('i4w0fcmgytxfkwo')

        // update
        collection.schema.addField(
            new SchemaField({
                system: false,
                id: 'logwd0tr',
                name: 'tag',
                type: 'relation',
                required: false,
                presentable: false,
                unique: false,
                options: {
                    collectionId: 'pgj749tbz9a41vm',
                    cascadeDelete: false,
                    minSelect: null,
                    maxSelect: null,
                    displayFields: null,
                },
            })
        )

        return dao.saveCollection(collection)
    },
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('i4w0fcmgytxfkwo')

        // update
        collection.schema.addField(
            new SchemaField({
                system: false,
                id: 'logwd0tr',
                name: 'tag',
                type: 'relation',
                required: false,
                presentable: false,
                unique: false,
                options: {
                    collectionId: 'pgj749tbz9a41vm',
                    cascadeDelete: false,
                    minSelect: null,
                    maxSelect: 1,
                    displayFields: null,
                },
            })
        )

        return dao.saveCollection(collection)
    }
)
