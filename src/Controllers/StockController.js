import sql from 'mssql'
import config from '../db/Config.js'

//Get all Stock
export const getStocks = async (req, res) => {
  try {
      let pool = await sql.connect(config.sql);
      const result = await pool.request().query("SELECT * FROM Stock");
      res.status(200).json(result.recordset);
  } catch (error) {
      res.status(201).json({ error: 'an error occurred while retrieving Stocks' });
  } finally {
      sql.close();
  }
};

//Get a single Stock
export const getStock = async (req, res) => {
  try {
      const { stock_id } = req.params;
      let pool = await sql.connect(config.sql);
      const result = await pool.request()
          .input("stock_id", sql.Int, stock_id)
          .query("SELECT * FROM Stock WHERE stock_id= @stock_id");
      res.status(200).json(result.recordset[0]);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving a Stock' });
  } finally {
      sql.close();
  }
};

//Create a new Stock
export const createStock = async (req, res) => {
  try {
    const {stock_id,quantity, name} = req.body;
    const pool = await sql.connect(config.sql);
      const result = await pool.request()
      .input('stock_id', sql.Int, stock_id)
        .input('quantity', sql.Int, quantity)
        .input('name', sql.VarChar(50), name)

          .query("INSERT INTO Stock (stock_id, quantity, name) values (@stock_id, @quantity, @name)");
      res.status(200).json({ message: 'Stock created successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating a Stock' });
  } finally {
      sql.close();
  }
};

//Update a Stock
export const updateStock = async (req, res) => {
  try {
      const {stock_id} = req.params;
      const { quantity } = req.body;
      let pool = await sql.connect(config.sql);
      await pool.request()
          .input("stock_id", sql.Int,stock_id)
            .input("quantity", sql.Int, quantity)
          .query("UPDATE Stock SET quantity = @quantity WHERE stock_id = @stock_id;");
      res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating a Stock' });
  } finally {
      sql.close();
  }
};

//Delete a Stock
export const deleteStock = async (req, res) => {
  try {
      const {stock_id } = req.params;
      await sql.connect(config.sql);
      await sql.query`DELETE FROM Stock WHERE stock_id = ${stock_id}`;
      res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting a Stock' });
  } finally {
      sql.close();
  }
};