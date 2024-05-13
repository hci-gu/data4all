/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // remove
  collection.schema.removeField("8xhi1xip")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ezvdljv",
    "name": "dataset",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i4w0fcmgytxfkwo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8xhi1xip",
    "name": "dataset",
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
  collection.schema.removeField("3ezvdljv")

  return dao.saveCollection(collection)
})
