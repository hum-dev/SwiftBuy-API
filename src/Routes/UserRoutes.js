import {getUsers,getUser, updateUser,deleteUser, register, login, loginRequired } from "../Controllers/UserController.js";

const userRoutes = (app) => {
    app.route("/users")
    .get( getUsers);

    
    app.route("/user/:id")
    .get(loginRequired ,getUser)
    .put( loginRequired ,updateUser)
    .delete(loginRequired , deleteUser);


    //auth routes
    app.route("/auth/register")
    .post(register);

    app.route("/auth/login")
    .post(login);
}

export default userRoutes;