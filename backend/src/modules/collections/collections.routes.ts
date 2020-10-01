import * as express from "express";

import CollectionCtrl from "./collections.ctrl";

const CollectionRoutes = express.Router();
CollectionRoutes.get("/", CollectionCtrl.getAll);
CollectionRoutes.get("/icons/:slug", CollectionCtrl.getIcons);
CollectionRoutes.get("/:id", CollectionCtrl.getById);
CollectionRoutes.post("/", CollectionCtrl.save);
CollectionRoutes.put("/:id", CollectionCtrl.update);
CollectionRoutes.delete("/:id", CollectionCtrl.delete);

export default CollectionRoutes;
