import sql from 'mssql';
import config from '../db/Config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
      next();
  } else {    
      return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

//get all users
export const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .query('SELECT * FROM Customers');
        res.status(200).json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
};


//get user by id
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM Customers WHERE id = @id");
        const user = result.recordset[0];
        if (user) {
            res.status(200).json(result.recordsets[0]);
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
};



//Update a user
export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email} = req.body; // Assuming the updated details are sent in the request body
  
      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input('id', sql.Int, id)
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .query('UPDATE Users SET username = @username, email = @emailWHERE id = @id');
  
      res.status(200).json({ message: `User with ID ${id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    } finally {
      sql.close();
    }
  };

// Delete a Order
export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      let pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Customers WHERE id = @id');
  
      if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'User not found!' });
      } else {
        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    } finally {
      sql.close();
    }
  };
// Create order

export const Create = async (req, res) => {
    const { order_id, id, quantity,product_id, email, status} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Use asynchronous bcrypt.hash instead of bcrypt.hashSync
  
    try {
      let pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .query(
          'SELECT * FROM Customers WHERE username = @username OR email = @email'
        );
      const user = result.recordset[0];
      if (user) {
        res.status(409).json({ message: 'Username or email already exists!' });
      } else {
        await pool
          .request()
          .input('username', sql.VarChar, username)
          .input('email', sql.VarChar, email)
          .input('password', sql.VarChar, hashedPassword)
        
          .query(
            'INSERT INTO Customers (username, password, email) VALUES (@username, @password, @email)'
          );
        res.status(200).json({ message: 'User created successfully!' });
      }
    } catch (error) {
    //   res.status(500).json({ error: 'Something went wrong!' });
    res.json(error.message)
      console.log(error);
    } finally {
      sql.close();
    }
  
};



