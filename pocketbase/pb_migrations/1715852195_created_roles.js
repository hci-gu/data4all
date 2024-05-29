/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8nm4909zywbha9h",
    "created": "2024-05-16 09:36:35.783Z",
    "updated": "2024-05-16 09:36:35.783Z",
    "name": "roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "blsdayxp",
        "name": "type",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("8nm4909zywbha9h");

  return dao.deleteCollection(collection);
})
