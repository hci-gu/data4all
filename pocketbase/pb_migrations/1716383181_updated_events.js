/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // remove
  collection.schema.removeField("pyebmd6d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hbmgkwus",
    "name": "content",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pyebmd6d",
    "name": "content",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("hbmgkwus")

  return dao.saveCollection(collection)
})
