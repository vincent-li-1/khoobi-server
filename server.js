import express from 'express';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
const app = express();

import homeRoutes from './src/routes/home.js';
// const recipesRoutes = require('./routes/recipes');
// const commentsRoutes = require('./routes/comments');
 
// app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const dirname = import.meta.dirname;
app.use('/', homeRoutes);
app.use(express.static(path.join(dirname)));
app.get('/', (req, res) => res.sendFile(path.join(dirname, '/index.html')));
// app.use('/recipes', recipesRoutes);
// app.use('/comments', commentsRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

