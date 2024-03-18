import express from 'express';
import 'dotenv/config';
const app = express();

import homeRoutes from './src/routes/home.js';
// const recipesRoutes = require('./routes/recipes');
// const commentsRoutes = require('./routes/comments');


// app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', homeRoutes);
// app.use('/recipes', recipesRoutes);
// app.use('/comments', commentsRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

