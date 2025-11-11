const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'in-progress' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'in-progress' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'in-progress' }
];

// Get all users
app.get('/api/users', (req, res) => {
  setTimeout(() => {
    res.json(users);
  }, 500); // Simulate network delay
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  setTimeout(() => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }, 300);
});

// Complete user (update status - now accepts status in body)
app.patch('/api/users/:id/complete', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  const requestedStatus = req.body && req.body.status ? String(req.body.status) : 'completed';
  const allowedStatuses = ['in-progress', 'completed'];
  
  setTimeout(() => {
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!allowedStatuses.includes(requestedStatus)) {
      return res.status(400).json({ error: 'Invalid status', allowedStatuses });
    }

    try {
      users[userIndex].status = requestedStatus;
      res.json(users[userIndex]);
      console.log(`User ${userId} status updated to ${requestedStatus}`);
    } catch (e) {
      res.status(500).json({ error: 'Failed to update status' });
    }
  }, 800); // Simulate slower network for update
});

// Reset all users to in-progress (for testing)
app.post('/api/users/reset', (req, res) => {
  users = users.map(u => ({ ...u, status: 'in-progress' }));
  res.json({ message: 'All users reset to in-progress', users });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/users');
  console.log('  GET    /api/users/:id');
  console.log('  PATCH  /api/users/:id/complete');
  console.log('  POST   /api/users/reset');
});


