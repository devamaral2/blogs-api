const express = require('express');
const Routes = require('./routers');

// ...

const app = express();

app.use(express.json());

app.use('/login', Routes.loginRoutes);
app.use('/categories', Routes.categoriesRoutes);
app.use('/post', Routes.postRoutes);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
