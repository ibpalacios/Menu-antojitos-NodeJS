const express = require('express');
const app = express();
const cors = require('cors');
require('./database');

app.use(cors());
app.use(express.json());
app.use('/api/category', require('./routes/category'));
app.use('/api/cymbal', require('./routes/cymbal'));


app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});