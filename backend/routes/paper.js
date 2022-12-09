// const express = require("express");
// const router = express.Router();

const paper_controller = require("../controllers/PaperController");

module.exports = function(router){
    // POST request for creating paper.
    router.post("/paper/create", paper_controller.paper_create);

    // GET request to delete paper.
    router.get("/paper/:id/delete", paper_controller.paper_delete_get);

    // POST request to delete paper.
    router.post("/paper/:id/delete", paper_controller.paper_delete_post);

    // GET request to update paper.
    // router.get("/paper/:id/update", paper_controller.paper_update_get);

    // POST request to update paper.
    // router.post("/paper/:id/update", paper_controller.paper_update_post);

    // GET request for one paper.
    router.get("/paper/:id", paper_controller.paper_detail);

    // GET request for list of all paper items.
    router.get("/papers", paper_controller.paper_list);

return router;
}

