const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => res.send('User service is running'));
app.use('/api/users', require('./routes/users.routes'));

app.listen(PORT, () => console.log(`Users Service running on port ${PORT}`));
