const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adminDB:AntojitosMexicanos@cluster0.rws6l.mongodb.net/AntojitosMexicanos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(database => {
    console.log('Base de datos conectada');
}).catch(err => {
    console.log(err);
});

// credenciales
// adminDB
// AntojitosMexicanos
