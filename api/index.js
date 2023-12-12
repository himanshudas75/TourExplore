if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
