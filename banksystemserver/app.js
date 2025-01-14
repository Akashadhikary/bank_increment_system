const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

mongoose.connect('mongo_url', {
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/customers', customerRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
