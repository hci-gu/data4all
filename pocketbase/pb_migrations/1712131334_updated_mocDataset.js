/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  collection.name = "dataset"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo")

  collection.name = "mocDataset"

  return dao.saveCollection(collection)
})