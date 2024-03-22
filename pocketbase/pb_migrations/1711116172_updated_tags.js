/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgj749tbz9a41vm")

  // remove
  collection.schema.removeField("kqjmrsj5")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgj749tbz9a41vm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqjmrsj5",
    "name": "dataset",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i4w0fcmgytxfkwo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
