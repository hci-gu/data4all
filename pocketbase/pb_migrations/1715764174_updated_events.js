/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jr0frkt0",
    "name": "types",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "comment",
        "ownerReq",
        "ownerAccept",
        "ownerDecline",
        "OwnerPublished"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrb2mseythst5ev")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jr0frkt0",
    "name": "types",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "comment",
        "ownerReq",
        "ownerAccept",
        "OwnerPublished"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
