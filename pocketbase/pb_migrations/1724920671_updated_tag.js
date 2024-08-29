/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgj749tbz9a41vm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s94pklzc",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pgj749tbz9a41vm")

  // remove
  collection.schema.removeField("s94pklzc")

  return dao.saveCollection(collection)
})
