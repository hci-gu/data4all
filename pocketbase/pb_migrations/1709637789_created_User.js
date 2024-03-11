/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'a4wwhzms7ubbbz1',
            created: '2024-03-05 11:23:09.171Z',
            updated: '2024-03-05 11:23:09.171Z',
            name: 'User',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: 'ieriihgp',
                    name: 'UserId',
                    type: 'relation',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        collectionId: '_pb_users_auth_',
                        cascadeDelete: false,
                        minSelect: null,
                        maxSelect: 1,
                        displayFields: null,
                    },
                },
                {
                    system: false,
                    id: '1mr7brnl',
                    name: 'Role',
                    type: 'text',
                    required: true,
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
        const collection = dao.findCollectionByNameOrId('a4wwhzms7ubbbz1')

        return dao.deleteCollection(collection)
    }
)
