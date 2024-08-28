/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "askn75cm",
    "name": "entryscape",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgtpnw3u",
    "name": "published",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  // remove
  collection.schema.removeField("askn75cm")

  // remove
  collection.schema.removeField("sgtpnw3u")

  return dao.saveCollection(collection)
})
