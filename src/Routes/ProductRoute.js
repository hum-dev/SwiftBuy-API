import {getProducts,getProduct, updateProduct,deleteProduct  } from "../Controllers/ProductController.js";

const productRoutes = (app) => {    
    app.route("/products")
    .get(getProducts);

    
    app.route("/product/:product_id")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

}

export default productRoutes;