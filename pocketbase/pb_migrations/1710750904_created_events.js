/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'zrb2mseythst5ev',
            created: '2024-03-18 08:35:04.378Z',
            updated: '2024-03-18 08:35:04.378Z',
            name: 'events',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: '8xhi1xip',
                    name: 'dataset',
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
                    id: 'jr0frkt0',
                    name: 'types',
                    type: 'select',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        maxSelect: 1,
                        values: ['comment', 'ownerReq', 'ownerAccept'],
                    },
                },
                {
                    system: false,
                    id: 'rw3fe6fm',
                    name: 'user',
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
                    id: 'pyebmd6d',
                    name: 'content',
                    type: 'editor',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        convertUrls: false,
                    },
                },
                {
                    system: false,
                    id: 'ewies4bw',
                    name: 'subject',
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
        const collection = dao.findCollectionByNameOrId('zrb2mseythst5ev')

        return dao.deleteCollection(collection)
    }
)
