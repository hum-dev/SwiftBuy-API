import sql from 'mssql'
import config from '../db/Config.js'

//Get all categories
export const getCategories = async (req, res) => {
  try {
      let pool = await sql.connect(config.sql);
      const result = await pool.request().query("SELECT * FROM Category");
      res.status(200).json(result.recordset);
  } catch (error) {
      res.status(201).json({ error: 'an error occurred while retrieving Categories' });
  } finally {
      sql.close();
  }
};

//Get a single cartegory
export const getCategory = async (req, res) => {
  try {
      const { category_id } = req.params;
      let pool = await sql.connect(config.sql);
      const result = await pool.request()
          .input("category_id", sql.Int, category_id)
          .query("SELECT * FROM Category WHERE category_id= @category_id");
      res.status(200).json(result.recordset[0]);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving a category' });
  } finally {
      sql.close();
  }
};

//Create a new category
export const createCategory = async (req, res) => {
  try {
    const {category_id,name } = req.body;
    const pool = await sql.connect(config.sql);
      const result = await pool.request()
      .input('category_id', sql.Int, category_id)
        .input('name', sql.VarChar(50), name)
          .query("INSERT INTO Category (category_id, name) values (@category_id, @name)");
      res.status(200).json({ message: 'category created successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating a category' });
  } finally {
      sql.close();
  }
};

//Update a category
export const updateCategory = async (req, res) => {
  try {
      const {category_id} = req.params;
      const { name } = req.body;
      let pool = await sql.connect(config.sql);
      await pool.request()
          .input("category_id", sql.Int,category_id)
          .input("name", sql.VarChar, name)
          .query("UPDATE Category SET name = @name WHERE category_id = @category_id;");
      res.status(200).json({ message: 'category updated successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating a category' });
  } finally {
      sql.close();
  }
};

//Delete a category
export const deleteCategory = async (req, res) => {
  try {
      const {category_id } = req.params;
      await sql.connect(config.sql);
      await sql.query`DELETE FROM Category WHERE category_id = ${category_id}`;
      res.status(200).json({ message: 'category deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting a category' });
  } finally {
      sql.close();
  }
};