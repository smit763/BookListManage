require('dotenv').config();
const express = require('express');
const cors = require("cors")
const connectDB = require('./utils/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.json());


app.use('/api/v1', bookRoutes);
app.use('/api/v1', userRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
