import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Country } from './models/index.js';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "..", 'views'));
app.use(express.static('public'));

// Frontend Routes - EJS Templates
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  res.render('users');
});

app.get('/countries', (req, res) => {
  res.render('countries');
});

// API Routes - Users
app.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Country });
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Country });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/users', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const users = await User.bulkCreate(data);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes - Countries
app.get('/countries', async (req, res) => {
  const countries = await Country.findAll();
  res.json(countries);
});

app.get('/countries/:id', async (req, res) => {
  const country = await Country.findByPk(req.params.id);
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  res.json(country);
});

app.post('/countries', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const countries = await Country.bulkCreate(data);
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/countries/:id', async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    await country.update(req.body);
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/countries/:id', async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    await country.destroy();
    res.json({ message: 'Country deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => console.log('🚀 Server running on port 3000'));