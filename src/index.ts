// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login endpoint
app.post('/login', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  // Validate username and password
  if (username === 'admin' && password === 'password') {
    // Generate a token
    const token = 'Login successful';
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// API endpoint to consume
app.get('/api/data', (req: express.Request, res: express.Response) => {
  const token = req.headers['x-access-token'];
  if (token) {
    // Validate token
    if (token === 'ome-token') {
      // Return API data
      res.json({ data: 'Some API data' });
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});