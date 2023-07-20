import {getOrders,getOrder,createOrder,updateOrder,deleteOrder  } from "../Controllers/OrderController.js";

const orderRoutes = (app) => {
    app.route("/orders")
    .get(getOrders);

    
    app.route("/order/:order_id")
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

    app.route("/order")
    .post(createOrder);
    

}

export default orderRoutes;