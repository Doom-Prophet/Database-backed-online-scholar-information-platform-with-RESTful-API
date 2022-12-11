// const express = require("express");
// const router = express.Router();

const paper_controller = require("../controllers/PaperController");

module.exports = function(router){
    // POST request for creating paper.
    router.post("/paper/create", paper_controller.paper_create);

    // DELETE request to delete paper.
    router.delete("/paper/:id", paper_controller.paper_delete);

    // GET request for one paper.
    router.get("/paper/:id", paper_controller.paper_detail);

    // GET request for list of all paper items.
    router.get("/papers", paper_controller.paper_list);

return router;
}

