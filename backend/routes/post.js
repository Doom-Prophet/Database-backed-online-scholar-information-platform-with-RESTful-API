// const express = require("express");
// const router = express.Router();

const post_controller = require("../controllers/PostController");

module.exports = function(router){
    // POST request for creating post.
    router.post("/post/create", post_controller.post_create);

    // GET request to delete post.
    router.get("/post/:id/delete", post_controller.post_delete_get);

    // POST request to delete post.
    router.post("/post/:id/delete", post_controller.post_delete_post);

    // GET request to update post.
    // router.get("/post/:id/update", post_controller.post_update_get);

    // POST request to update post.
    // router.post("/post/:id/update", post_controller.post_update_post);

    // GET request for one post.
    router.get("/post/:id", post_controller.post_detail);

    // GET request for list of all post items.
    router.get("/posts", post_controller.post_list);

    return router;
}

