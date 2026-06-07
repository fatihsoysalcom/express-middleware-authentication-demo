const express = require('express');
const app = express();
const port = 3000;

// Middleware to simulate authentication logic.
// This is an example of a common component that a MERN authentication template
// would provide pre-configured, saving development time.
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // In a real application, this token would be validated (e.g., JWT verification).
        // Here, we simulate a valid token check.
        if (token === 'mysecrettoken123') { 
            req.user = { id: 'user123', username: 'demoUser' }; // Attach user info to request
            next(); // User is authenticated, proceed to the next handler
        } else {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }
    } else {
        return res.status(401).json({ message: 'Authentication token required' });
    }
};

// Public route - accessible without any authentication
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Authentication Template Demo! Try /protected with a valid token.');
});

// Another public route
app.get('/public-data', (req, res) => {
    res.json({ data: 'This is public data, no authentication needed.' });
});

// Protected route - requires the 'authenticateUser' middleware to pass
app.get('/protected', authenticateUser, (req, res) => {
    // If this point is reached, the user has been authenticated by the middleware.
    res.json({ message: `Hello ${req.user.username}, you have accessed a protected resource!`, user: req.user });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('\n--- Test Instructions ---');
    console.log('1. Access public route: http://localhost:3000');
    console.log('2. Access another public route: http://localhost:3000/public-data');
    console.log('3. Test protected route (will fail without token):');
    console.log('   curl http://localhost:3000/protected');
    console.log('4. Test protected route (with valid token):');
    console.log('   curl -H "Authorization: Bearer mysecrettoken123" http://localhost:3000/protected');
});
