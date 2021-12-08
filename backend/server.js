const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

var corsOptions = {
    origin: ['http://localhost:3000']
};

app.use(cors(corsOptions));
app.use('/api', require('./routes'));

const PORT = 8000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));


