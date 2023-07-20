import {getCategories,getCategory,createCategory,updateCategory,deleteCategory  } from "../Controllers/CategoryController.js";

const categoryRoutes = (app) => {
    app.route("/categories")
    .get(getCategories);

    
    app.route("/category/:category_id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

    app.route("/category")
    .post(createCategory);
    

}

export default categoryRoutes;