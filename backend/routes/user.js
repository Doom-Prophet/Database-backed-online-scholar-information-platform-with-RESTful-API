// const express = require("express");
// const router = express.Router();

const user_controller = require("../controllers/UserController");

module.exports = function(router){
    // GET request for list of all users.
    router.get("/users", user_controller.user_list);

    // GET request for one user.
    router.get("/user", user_controller.user_detail);

    // POST request for creating user.
    router.post("/user/create", user_controller.user_create);

    // DELETE request to delete user.
    router.delete("/user/:id", user_controller.user_delete);;

    // PUT request to update user.
    router.put("/user/:id", user_controller.user_update);

    return router;
}
