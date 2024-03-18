/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i4w0fcmgytxfkwo",
    "created": "2024-03-18 08:26:23.760Z",
    "updated": "2024-03-18 08:26:23.760Z",
    "name": "mocDataset",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oupityko",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wgvdhkgg",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i4w0fcmgytxfkwo");

  return dao.deleteCollection(collection);
})
