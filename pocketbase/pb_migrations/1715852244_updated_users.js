/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = []

  // remove
  collection.schema.removeField("gwilshbx")

  // remove
  collection.schema.removeField("py9cxf4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8mjkumd2",
    "name": "role",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8nm4909zywbha9h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_mkNvUmN` ON `users` (`slug`)",
    "CREATE UNIQUE INDEX `idx_TNzY95e` ON `users` (`name`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwilshbx",
    "name": "role",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "User",
        "Admin"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "py9cxf4j",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("8mjkumd2")

  return dao.saveCollection(collection)
})
