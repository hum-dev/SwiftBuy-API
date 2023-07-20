import {getStocks,getStock,createStock,updateStock,deleteStock  } from "../Controllers/StockController.js";

const stockRoutes = (app) => {
    app.route("/stocks")
    .get(getStocks);

    
    app.route("/stock/:stock_id")
    .get(getStock)
    .put(updateStock)
    .delete(deleteStock);

    app.route("/stock")
    .post(createStock);
    

}

export default stockRoutes;