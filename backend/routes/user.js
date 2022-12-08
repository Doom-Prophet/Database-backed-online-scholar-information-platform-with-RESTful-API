// const express = require("express");
// const router = express.Router();

const user_controller = require("../controllers/UserController");

module.exports = function(router){
    // GET request for list of all users.
    router.get("/users", user_controller.user_list);

    // GET request for one user.
    router.get("/user/:id", user_controller.user_detail);

    // POST request for creating user.
    router.post("/user/create", user_controller.user_create);

    // GET request to delete user.
    router.get("/user/:id/delete", user_controller.user_delete_get);

    // POST request to delete user.
    router.post("/user/:id/delete", user_controller.user_delete_post);

    // GET request to update user.
    // router.get("/user/:id/update", user_controller.user_update_get);

    // POST request to update user.
    // router.post("/user/:id/update", user_controller.user_update_post);





    return router;
}
