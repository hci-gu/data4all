/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'pgj749tbz9a41vm',
            created: '2024-03-22 14:01:14.636Z',
            updated: '2024-03-22 14:01:14.636Z',
            name: 'Tags',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: 'kv1lkymo',
                    name: 'name',
                    type: 'text',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        min: null,
                        max: null,
                        pattern: '',
                    },
                },
                {
                    system: false,
                    id: 'kqjmrsj5',
                    name: 'dataset',
                    type: 'relation',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        collectionId: 'i4w0fcmgytxfkwo',
                        cascadeDelete: false,
                        minSelect: null,
                        maxSelect: null,
                        displayFields: null,
                    },
                },
            ],
            indexes: [],
            listRule: null,
            viewRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            options: {},
        })

        return Dao(db).saveCollection(collection)
    },
    (db) => {
        const dao = new Dao(db)
        const collection = dao.findCollectionByNameOrId('pgj749tbz9a41vm')

        return dao.deleteCollection(collection)
    }
)
