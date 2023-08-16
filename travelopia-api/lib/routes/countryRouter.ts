const express = require('express');
const router = express.Router();
const { pool } = require('../database/mysql'); // Adjust the path accordingly

// POST - Insert a new country
router.post('/insert', async (req, res) => {
  try {
    const { country_name, country_image_url, description } = req.body;
    const query = 'INSERT INTO country (country_name, country_image_url, description) VALUES (?, ?, ?)';
    await pool.query(query, [country_name, country_image_url, description]);
    res.status(201).json({ message: 'Country inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT - Update country by ID
router.put('/update/:id', async (req, res) => {
  try {
    const country_id = req.params.id;
    const { country_name, country_image_url, description } = req.body;
    const query = 'UPDATE country SET country_name = ?, country_image_url = ?, description = ? WHERE id = ?';
    await pool.query(query, [country_name, country_image_url, description, country_id]);
    res.json({ message: 'Country updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Fetch all countries
router.get('/fetch', async (req, res) => {
  try {
    const query = 'SELECT * FROM country';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
