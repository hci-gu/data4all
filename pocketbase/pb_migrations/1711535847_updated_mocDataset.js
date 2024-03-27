/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8forevq",
    "name": "related_datasets",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  // remove
  collection.schema.removeField("j8forevq")

  return dao.saveCollection(collection)
})
