// const express = require("express");
// const router = express.Router();

const post_controller = require("../controllers/PostController");

module.exports = function(router){
    // POST request for creating post.
    router.post("/post/create", post_controller.post_create);

    // DELETE request to delete post.
    router.delete("/post/:id", post_controller.post_delete);

    // PUT request to update post.
    router.put("/posts", post_controller.post_update);

    // GET request for one post.
    router.get("/post/:id", post_controller.post_detail);

    // GET request for list of all post items.
    router.get("/posts", post_controller.post_list);

    return router;
}

