"use strict";

const exp = require('express');
const morgan = require('morgan');
const app = exp();
const cors = require('cors');

//----------------middleware
app.use(morgan('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());
app.use(cors());

app.use(require ('./routes/index'));

//----------------iniciando el servidor
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2)

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

