/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('i4w0fcmgytxfkwo')

        // add
        collection.schema.addField(
            new SchemaField({
                system: false,
                id: 'ficynuo2',
                name: 'tag',
                type: 'relation',
                required: false,
                presentable: false,
                unique: false,
                options: {
                    collectionId: 'i4w0fcmgytxfkwo',
                    cascadeDelete: false,
                    minSelect: null,
                    maxSelect: 1,
                    displayFields: null,
                },
            })
        )

        return dao.saveCollection(collection)
    },
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('i4w0fcmgytxfkwo')

        // remove
        collection.schema.removeField('ficynuo2')

        return dao.saveCollection(collection)
    }
)
