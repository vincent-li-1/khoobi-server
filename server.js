import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import servicesRoutes from './routes/services.js';

const { expressjwt } = jwt;

const app = express();


 
// app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const __dirname = import.meta.dirname;

// Makes sure that if the user refreshes they are directed to index.html which then directs to the correct route
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    }
});


app.use(express.static(path.join(__dirname, 'frontend', 'build')));

const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-63hr7r7kvgzuiqbp/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer
    audience: `https://https://khoobiwellness.com/post`,
    issuer: `https://dev-63hr7r7kvgzuiqbp/`,
    algorithms: ['RS256']
});

// app.use(checkJwt);

app.use('/services', servicesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

